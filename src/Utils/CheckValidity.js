export const checkValiditySignUp = (name, email, password) => {
  // Improved email validity regex
  const emailValidity = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,4}$/g.test(email);

  // Simplified password validity regex (no global or multiline flag needed)
  const passwordValidity = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Name validity remains the same
  const nameValidity = /^[a-zA-Z\s]*$/.test(name);

  // Return appropriate error messages if any validation fails
  if (!nameValidity) return "Name not valid!";
  if (!emailValidity) return "Email not valid!";
  if (!passwordValidity) return "Password not valid!";

  // Return null if no error occurs
  return null;
};

export const checkValiditySignIn = (email, password) => {
  // Use the improved email and password validity regex
  const emailValidity = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,4}$/g.test(email);
  const passwordValidity = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Return appropriate error messages if any validation fails
  if (!emailValidity) return "Email not valid!";
  if (!passwordValidity) return "Password not valid!";

  // Return null if no error occurs
  return null;
};
