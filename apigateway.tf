# Define the API Gateway REST API
resource "aws_api_gateway_rest_api" "task_api" {
  name        = "TaskAPI"
  description = "API for task management"
}

# Define the API Gateway resource (e.g., /task)
resource "aws_api_gateway_resource" "task" {
  rest_api_id = aws_api_gateway_rest_api.task_api.id
  parent_id   = aws_api_gateway_rest_api.task_api.root_resource_id
  path_part   = "task"
}

# Define the POST method for the API Gateway
resource "aws_api_gateway_method" "add_task" {
  rest_api_id   = aws_api_gateway_rest_api.task_api.id
  resource_id   = aws_api_gateway_resource.task.id
  http_method   = "POST"
  authorization = "NONE"
}

# Define the integration for the POST method
resource "aws_api_gateway_integration" "add_task" {
  rest_api_id             = aws_api_gateway_rest_api.task_api.id
  resource_id             = aws_api_gateway_resource.task.id
  http_method             = aws_api_gateway_method.add_task.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.add_task.invoke_arn
}

# Define the GET method for the API Gateway
resource "aws_api_gateway_method" "get_tasks" {
  rest_api_id   = aws_api_gateway_rest_api.task_api.id
  resource_id   = aws_api_gateway_resource.task.id
  http_method   = "GET"
  authorization = "NONE"
}

# Define the integration for the GET method
resource "aws_api_gateway_integration" "get_tasks" {
  rest_api_id             = aws_api_gateway_rest_api.task_api.id
  resource_id             = aws_api_gateway_resource.task.id
  http_method             = aws_api_gateway_method.get_tasks.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get_tasks.invoke_arn
}

# Define the OPTIONS method for CORS
resource "aws_api_gateway_method" "options" {
  rest_api_id   = aws_api_gateway_rest_api.task_api.id
  resource_id   = aws_api_gateway_resource.task.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options" {
  rest_api_id = aws_api_gateway_rest_api.task_api.id
  resource_id = aws_api_gateway_resource.task.id
  http_method = aws_api_gateway_method.options.http_method
  type        = "MOCK"
}

resource "aws_api_gateway_method_response" "options" {
  rest_api_id = aws_api_gateway_rest_api.task_api.id
  resource_id = aws_api_gateway_resource.task.id
  http_method = aws_api_gateway_method.options.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options" {
  rest_api_id = aws_api_gateway_rest_api.task_api.id
  resource_id = aws_api_gateway_resource.task.id
  http_method = aws_api_gateway_method.options.http_method
  status_code = aws_api_gateway_method_response.options.status_code

  response_templates = {
    "application/json" = ""
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Define the deployment for the API Gateway
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.task_api.id
  stage_name  = "prod"

  depends_on = [
    aws_api_gateway_integration.add_task,
    aws_api_gateway_integration.get_tasks,
    aws_api_gateway_integration.options
  ]
}

# Output the API URL
output "api_url" {
  value = "https://${aws_api_gateway_rest_api.task_api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/prod/task"
}

# Data sources to fetch current AWS region and account ID
data "aws_region" "current" {}

data "aws_caller_identity" "current" {}
