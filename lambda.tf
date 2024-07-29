# Create a zip file for the getTasks Lambda function
data "archive_file" "get_tasks_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/getTasks"
  output_path = "${path.module}/gettasks.zip"
}

# Create a zip file for the addTask Lambda function
data "archive_file" "add_task_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/addTask"
  output_path = "${path.module}/addtask.zip"
}

# Referencing an existing IAM role
data "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"
}

# Attach policies to the Lambda execution role
resource "aws_iam_role_policy_attachment" "lambda_dynamodb" {
  role       = data.aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = data.aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Create the getTasks Lambda function
resource "aws_lambda_function" "get_tasks_function" {
  function_name = "GetTasksFunction"
  handler       = "getTasks.lambda_handler"
  runtime       = "python3.9"
  role          = data.aws_iam_role.lambda_exec.arn

  filename = "${path.module}/gettasks.zip"

  environment {
    variables = {
      TABLE_NAME = "Tasks"
    }
  }
}

# Create the addTask Lambda function
resource "aws_lambda_function" "add_task_function" {
  function_name = "AddTaskFunction"
  handler       = "addTask.lambda_handler"
  runtime       = "python3.9"
  role          = data.aws_iam_role.lambda_exec.arn

  filename = "${path.module}/addtask.zip"

  environment {
    variables = {
      TABLE_NAME = "Tasks"
    }
  }
}
