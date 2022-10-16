const express = require('express');
const Authenticate = require('../Middleware/authentication');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../Database/models/NotesSchema')

//ROUTE 1: Fetching all notes
Router.get("/fetchnote", Authenticate, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.UserId })
        res.json(notes);
    } catch (err) {
        req.status(500).send("Internal Server Error")
    }

})


//ROUTE 2: Adding a note
Router.post("/addnote", [
    //Adding validation
    body('title', 'title is too short').isLength({ min: 3 }),
    body('desc', 'Description is too short').isLength({ min: 5 })
], Authenticate, async (req, res) => {
    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, desc, tag } = req.body;
        const notes = new Note({ title, desc, tag, user: req.UserId })
        await notes.save()
        res.json(notes);
    } catch (error) {
        return req.status(500).send("Internal Server Error")
    }
})


//ROUTE 3: Updating a note
Router.put('/update/:id', [
    //Adding validation
    body('title', 'title is too short').isLength({ min: 3 }),
    body('desc', 'Description is too short').isLength({ min: 5 })
], Authenticate, async (req, res) => {
    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let newNote = {};

        const { title, desc, tag } = req.body;
        if (title) {
            newNote.title = title;
        }
        if (desc) {
            newNote.desc = desc;
        }
        if (tag) {
            newNote.tag = tag;
        }
        let note = await Note.find({ user: req.UserId, _id: req.params.id })
        if (!note) {
            return res.status(400).send("Not Found")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.status(200).json(note);
    } catch (error) {
        return req.status(500).send("Internal Server Error")
    }
})


//ROUTE 4: Deleting a note
Router.delete('/delete/:id', Authenticate, async (req, res) => {
    try {
        let note = await Note.find({ user: req.UserId, _id: req.params.id })
        if (!note) {
            return req.status(400).send("Not Found")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: "Deleted Successful" });
    } catch (error) {
        return req.status(500).send("Internal Server Error")
    }
})


module.exports = Router;