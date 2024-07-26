const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Ensure that the event body is correctly parsed
    let data;
    if (event.body) {
      data = JSON.parse(event.body);
    } else {
      throw new Error('No data provided');
    }

    // Extract fields from the parsed data
    const { id, title, description, date, priority, completed } = data;

    // Validate required fields
    if (!id || !title || !description || !date || !priority || completed === undefined) {
      throw new Error('Missing required fields');
    }

    // Set up parameters for DynamoDB
    const params = {
      TableName: 'Tasks',
      Item: {
        id,
        title,
        description,
        date,
        priority,
        completed
      }
    };

    // Put item into DynamoDB
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task added successfully!' })
    };

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
