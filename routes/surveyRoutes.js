const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('thanks for voting asshole!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('hello');
    console.log(req.body);
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      //we send back the user modal which consists of -1 credit
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

/*
When we pass in an array of objects mongoose will automatically create that sub document collection for us for the recipients.
*/
