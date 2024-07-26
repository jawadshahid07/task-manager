data "archive_file" "add_task_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/addTask"
  output_path = "${path.module}/lambda_functions/addTask.zip"
}

data "archive_file" "get_tasks_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/getTasks"
  output_path = "${path.module}/lambda_functions/getTasks.zip"
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_dynamodb_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ],
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
  ]
}

resource "aws_lambda_function" "add_task" {
  function_name = "addTask"
  role          = aws_iam_role.lambda_role.arn
  handler       = "addTask.handler"
  runtime       = "nodejs16.x"

  filename = data.archive_file.add_task_zip.output_path

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.tasks.name
    }
  }
}

resource "aws_lambda_function" "get_tasks" {
  function_name = "getTasks"
  role          = aws_iam_role.lambda_role.arn
  handler       = "getTasks.handler"
  runtime       = "nodejs16.x"

  filename = data.archive_file.get_tasks_zip.output_path

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.tasks.name
    }
  }
}

# Allow API Gateway to invoke the add_task Lambda function
resource "aws_lambda_permission" "allow_api_gateway_add_task" {
  statement_id  = "AllowExecutionFromAPIGatewayAddTask"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.add_task.function_name
  principal     = "apigateway.amazonaws.com"

  # Construct the source ARN dynamically
  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.task_api.id}/*/POST/task"
}

# Allow API Gateway to invoke the get_tasks Lambda function
resource "aws_lambda_permission" "allow_api_gateway_get_tasks" {
  statement_id  = "AllowExecutionFromAPIGatewayGetTasks"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_tasks.function_name
  principal     = "apigateway.amazonaws.com"

  # Construct the source ARN dynamically
  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.task_api.id}/*/GET/task"
}
