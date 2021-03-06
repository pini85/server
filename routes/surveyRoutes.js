const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    //we get all of the surveys but we exclude the recepients because it could be 10's of thousands.
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });
  app.get('/api/surveys/:surveyId/:option', (req, res) => {
    res.send('thanks for voting asshole!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _.map(req.body, (event) => {
      const match = p.test(new URL(event.url).pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    uniqueEvents.forEach((event) => {
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            //look inside the recipients and find a record that matches this cirteria.
            $elemMatch: { email: event.email, responded: false },
          },
          //second argument is to update the Survey record
        },
        {
          //$inc is to increment the choice value. The choice could be yes or no
          $inc: { [event.choice]: 1 },
          //$set means to set a property. $.responsded means the $ is getting the $elemMatch index and setting it to true
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
        //.exec means to execute this query
      ).exec();
    });

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
