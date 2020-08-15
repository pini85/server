const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validateEmails = (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => !re.test(email));
  console.log('in', invalidEmails);

  if (invalidEmails.length) {
    return `These are invalid:  ${invalidEmails}`;
  } else {
    return;
  }
};

export default validateEmails;
