'use strict'
const aws = require('aws-sdk');

aws.config.update({
  region: process.env.AWS_REGION
});

const docClient = new aws.DynamoDB.DocumentClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (event) => {
 
  const body = JSON.parse(event.body);
  console.log(body);

  const params = {
    TableName: process.env.DYNAMODB_USERS,
    IndexName: process.env.EMAIL_GSI,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ":email": body.email
    }
  }
  const data = await docClient.query(params).promise();
  const user = data.Items[0];
  console.log(data);
  console.log(user);
  if (user) {
    if (bcrypt.compareSync(body.password, user.password)) {
      delete user.password;

      return {
        statusCode: 200,
        body: JSON.stringify({
          token: jwt.sign(user, process.env.JWT_SECRET)
        })
      }
    } 
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'use e password invalid'
      })
    }
  }
  return {
    statusCode: 401,
    body: JSON.stringify({
      message: 'use e password invalid'
    })
  }
};