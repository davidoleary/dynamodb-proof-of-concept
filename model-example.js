var AWS = require("aws-sdk");
const setCredentials = require('./setup-credentials');
var dynamoose = require('dynamoose');

setCredentials(AWS);

// Create cat model with default options
var Cat = dynamoose.model('Cat', { 
  id: Number, 
  name: String,
  description: {
    type: String,
    validate: function (v) { 
      console.log('In validate: ', v > 0)
      return v > 0; 
    },
  },
});

console.log('here2', Cat)
// Create a new cat object
var garfield = new Cat({ 
  id: 666, 
  name: 'Tom',
  description: 'sdfas' 
});

// Save to DynamoDB
garfield.save(((err, response) => {
  if (err) {
    console.log('error:', err);
  }
  
  if (err && err.message) {
    console.log('validationError:', err.message);
  }
  console.log(response);
}));

// Lookup in DynamoDB
Cat.get(666)
  .then(function (badCat) {
    console.log('Never trust a smiling cat. - ' + badCat.name);
  });