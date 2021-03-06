var fs = require('fs');
setCredentials(AWS);

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2013;
var title = "Now You See Me";

// Update the item, unconditionally,

var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
  ExpressionAttributeValues: {
    ":r": 5.5,
    ":p": "Everything happens all at once.",
    ":a": ["Larry", "Moe", "Curly"]
  },
  ReturnValues: "UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
  if (err) {
    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
  }
});