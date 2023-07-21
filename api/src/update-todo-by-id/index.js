const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODOTABLE_TABLE_NAME;

/**
 * The Lambda Function Handler that will execute to get all TO-DOs
 */
exports.handler = async event => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;
  const { title, description } = JSON.parse(body);

  const patchAttr = {
    ...title && { title },
    ...description && { description },
  };

  if (Object.entries(patchAttr).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Nothing to patch'
      })
    }
  }

  let updateExpression = '';
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};

  Object.entries(patchAttr).forEach(([key, value], index) => {
    updateExpression += `${index === 0 ? 'set ' : ', '}#${key} = :${key}`;
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = value;
  })

  const params = {
    TableName: TODO_TABLE,
    Key: {
      id
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,

  }


  try {
    const resp = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'TO-DO updated successfully'
      })
    }
  } catch (error) {
    console.log(error);
    console.log(params);
    console.log(updateExpression);
    console.log(expressionAttributeNames);
    console.log(expressionAttributeValues);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error updating TO-DO'
      })
    }
  }
};
