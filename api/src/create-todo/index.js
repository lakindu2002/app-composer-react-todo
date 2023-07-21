const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODOTABLE_TABLE_NAME;

/**
 * The Lambda Function Handler that will execute to create a TO-DO
 */
exports.handler = async event => {
  const { body } = event;
  const { title, description } = JSON.parse(body);

  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: Date.now().toString(),
      title,
      description,
    }
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
