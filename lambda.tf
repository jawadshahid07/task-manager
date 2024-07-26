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