const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      //we will get an array of comma seperated emails. So here we split it and put it the email in an object and we trim the email just in case there are accident white spaces in it.
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      //mongo and mongoose provides us with the user id.
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};

/*
When we pass in an array of objects mongoose will automatically create that sub document collection for us for the recipients.
*/
