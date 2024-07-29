# Create the API Gateway REST API
resource "aws_api_gateway_rest_api" "tasks_api" {
  name        = "TasksApi"
  description = "API for managing tasks"
}

# Create the /getTasks resource
resource "aws_api_gateway_resource" "get_tasks_resource" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  parent_id   = aws_api_gateway_rest_api.tasks_api.root_resource_id
  path_part   = "getTasks"
}

# Create the /addTask resource
resource "aws_api_gateway_resource" "add_task_resource" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  parent_id   = aws_api_gateway_rest_api.tasks_api.root_resource_id
  path_part   = "addTask"
}

# Create the GET method for /getTasks
resource "aws_api_gateway_method" "get_tasks_method" {
  rest_api_id   = aws_api_gateway_rest_api.tasks_api.id
  resource_id   = aws_api_gateway_resource.get_tasks_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

# Create the POST method for /addTask
resource "aws_api_gateway_method" "add_task_method" {
  rest_api_id   = aws_api_gateway_rest_api.tasks_api.id
  resource_id   = aws_api_gateway_resource.add_task_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# Set up the integration for /getTasks
resource "aws_api_gateway_integration" "get_tasks_integration" {
  rest_api_id             = aws_api_gateway_rest_api.tasks_api.id
  resource_id             = aws_api_gateway_resource.get_tasks_resource.id
  http_method             = aws_api_gateway_method.get_tasks_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.get_tasks_function.invoke_arn
}

# Set up the integration for /addTask
resource "aws_api_gateway_integration" "add_task_integration" {
  rest_api_id             = aws_api_gateway_rest_api.tasks_api.id
  resource_id             = aws_api_gateway_resource.add_task_resource.id
  http_method             = aws_api_gateway_method.add_task_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.add_task_function.invoke_arn
}

# Grant API Gateway permission to invoke the getTasks Lambda function
resource "aws_lambda_permission" "get_tasks_permission" {
  statement_id  = "AllowAPIGatewayInvokeGetTasks"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_tasks_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.tasks_api.execution_arn}/*/*"
}

# Grant API Gateway permission to invoke the addTask Lambda function
resource "aws_lambda_permission" "add_task_permission" {
  statement_id  = "AllowAPIGatewayInvokeAddTask"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.add_task_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.tasks_api.execution_arn}/*/*"
}

# Create the OPTIONS method for /getTasks to handle CORS preflight requests
resource "aws_api_gateway_method" "get_tasks_options_method" {
  rest_api_id   = aws_api_gateway_rest_api.tasks_api.id
  resource_id   = aws_api_gateway_resource.get_tasks_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_tasks_options_integration" {
  rest_api_id             = aws_api_gateway_rest_api.tasks_api.id
  resource_id             = aws_api_gateway_resource.get_tasks_resource.id
  http_method             = aws_api_gateway_method.get_tasks_options_method.http_method
  type                    = "MOCK"
  request_templates       = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "get_tasks_options_method_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.get_tasks_resource.id
  http_method = aws_api_gateway_method.get_tasks_options_method.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "get_tasks_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.get_tasks_resource.id
  http_method = aws_api_gateway_method.get_tasks_options_method.http_method
  status_code = aws_api_gateway_method_response.get_tasks_options_method_response.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Create the OPTIONS method for /addTask to handle CORS preflight requests
resource "aws_api_gateway_method" "add_task_options_method" {
  rest_api_id   = aws_api_gateway_rest_api.tasks_api.id
  resource_id   = aws_api_gateway_resource.add_task_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "add_task_options_integration" {
  rest_api_id             = aws_api_gateway_rest_api.tasks_api.id
  resource_id             = aws_api_gateway_resource.add_task_resource.id
  http_method             = aws_api_gateway_method.add_task_options_method.http_method
  type                    = "MOCK"
  request_templates       = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "add_task_options_method_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.add_task_resource.id
  http_method = aws_api_gateway_method.add_task_options_method.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "add_task_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.add_task_resource.id
  http_method = aws_api_gateway_method.add_task_options_method.http_method
  status_code = aws_api_gateway_method_response.add_task_options_method_response.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Set up the method response and integration response for GET /getTasks
resource "aws_api_gateway_method_response" "get_tasks_method_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.get_tasks_resource.id
  http_method = aws_api_gateway_method.get_tasks_method.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "get_tasks_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.get_tasks_resource.id
  http_method = aws_api_gateway_method.get_tasks_method.http_method
  status_code = aws_api_gateway_method_response.get_tasks_method_response.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  response_templates = {
    "application/json" = ""
  }
}

# Set up the method response and integration response for POST /addTask
resource "aws_api_gateway_method_response" "add_task_method_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.add_task_resource.id
  http_method = aws_api_gateway_method.add_task_method.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "add_task_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.tasks_api.id
  resource_id = aws_api_gateway_resource.add_task_resource.id
  http_method = aws_api_gateway_method.add_task_method.http_method
  status_code = aws_api_gateway_method_response.add_task_method_response.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  response_templates = {
    "application/json" = ""
  }
}
