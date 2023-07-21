const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODOTABLE_TABLE_NAME;

/**
 * The Lambda Function Handler that will execute to get all TO-DOs
 */
exports.handler = async event => {
  const params = {
    TableName: TODO_TABLE,
  }

  try {
    const resp = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: resp.Items || []
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error getting all TO-DOs'
      })
    }
  }
};
