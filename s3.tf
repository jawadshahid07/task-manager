resource "aws_s3_bucket" "website_bucket" {
  bucket = var.s3_bucket_name
}

# resource "aws_s3_object" "index_html" {
#     bucket = aws_s3_bucket.website_bucket.id
#     key = "index.html"
#     source = "samplewebsite/index.html"
#     etag = filemd5("samplewebsite/index.html")
#     content_type = "text/html"
# }
# resource "aws_s3_object" "error_html" {
#     bucket = aws_s3_bucket.website_bucket.id
#     key = "error.html"
#     source = "samplewebsite/error.html"
#     etag = filemd5("samplewebsite/error.html")
#     content_type = "text/html"
# }

resource "aws_s3_bucket_ownership_controls" "example" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "example" {
  depends_on = [
    aws_s3_bucket_ownership_controls.example,
    aws_s3_bucket_public_access_block.example,
  ]

  bucket = aws_s3_bucket.website_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# resource "aws_s3_object" "react-files" {
#   for_each = fileset("task_manager_app/build", "**")

#   bucket = aws_s3_bucket.website_bucket.id
#   key    = each.value
#   source = "task_manager_app/build/${each.value}"
#   etag = filemd5("task_manager_app/build/${each.value}")
# }

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.website_bucket.arn}/*"
      }
    ]
  })
}