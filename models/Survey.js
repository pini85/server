const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
  //we assoisiate the user with their survey by getting the objectId of the user which mongoose creates for every user and reference it to the survey.
  //by convention we use _<name of record> to let developers know this is a relationship field
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('surveys', surveySchema);
/*sub document collection
recipients: [recipientSchema]
At the beginning we created recipients: [String]. 
It will be a an array of string emails. But we had a problem what happens if a user clicks yes or no multiple times? We only one to record it once. 
So the solution is to make recipients a subdocument collection that every receipient has an email and a boolean if there already clicked yes or no

the recipient will only ever belong to it's parent survey. 
it is only useful to its parent Survey.
So we usually make use of subdocument collections like this when we want to make some type of ownership very clear.
The reason why we don't put the survey for example as a sub collection of the user collection is because mongo db can only store 4mb of a given record. So if we had many survey records in a user then we would exceed 4mb very quickly.
*/
