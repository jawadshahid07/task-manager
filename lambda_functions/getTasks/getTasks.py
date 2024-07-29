import json
import boto3

dynamo_db = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # Define parameters to scan the table
        params = {
            'TableName': 'Tasks'
        }

        # Scan the DynamoDB table
        result = dynamo_db.scan(**params)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps(result['Items'])
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({'error': str(e)})
        }
