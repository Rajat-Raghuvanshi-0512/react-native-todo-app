export const handleValidEmail = (val, setEmailValidError) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (val.length === 0) {
    setEmailValidError("Email address can't be empty");
  } else if (reg.test(val) === false) {
    setEmailValidError("Enter valid email address");
  } else if (reg.test(val) === true) {
    setEmailValidError("");
  }
};
