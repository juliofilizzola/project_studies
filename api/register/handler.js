'use strict'

const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});
const dbClient = new AWS.DynamoDB.DocumentClient();

module.exports.register = async (event) => {
  const body = JSON.parse(event.body);
  await dbClient.put({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: uuid.v4(),
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Usuário inserido com sucesso!',
    }),
  };
}