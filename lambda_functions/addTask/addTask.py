import json
import boto3

dynamo_db = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # Ensure that the event body is correctly parsed
        data = json.loads(event.get('body', '{}'))
        
        # Extract fields from the parsed data
        id = data.get('id')
        title = data.get('title')
        description = data.get('description')
        date = data.get('date')
        priority = data.get('priority')
        completed = data.get('completed')
        
        # Validate required fields
        if not all([id, title, description, date, priority, completed is not None]):
            raise ValueError('Missing required fields')

        # Set up parameters for DynamoDB
        params = {
            'TableName': 'Tasks',
            'Item': {
                'id': {'S': id},
                'title': {'S': title},
                'description': {'S': description},
                'date': {'S': date},
                'priority': {'S': priority},
                'completed': {'BOOL': completed}
            }
        }
        
        # Put item into DynamoDB
        dynamo_db.put_item(**params)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({'message': 'Task added successfully!'})
        }
    
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({'error': str(e)})
        }
