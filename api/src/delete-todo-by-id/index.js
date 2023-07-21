const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODOTABLE_TABLE_NAME;

/**
 * The Lambda Function Handler that will execute to delete a TO-DO by ID
 */
exports.handler = async event => {
  // path params from event
  const { id } = event.pathParameters;

  // delete the TO-DO

  const params = {
    TableName: TODO_TABLE,
    Key: {
      id
    }
  }

  try {
    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'TO-DO deleted successfully'
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error deleting TO-DO'
      })
    }
  }
};
