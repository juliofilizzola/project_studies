resource "aws_iam_policy" "register-policy" {
  name = "${var.environment}-register-policy"
  policy = <<EOF
    {
      "Version": "2012-10-07",
      "Statement": [
        {
          "Action": [
            "dynamodb:PutItem"
          ],
          "Effect": "Allow",
          "Resource": "${aws_dynamodb_table.users.arn}"
        }
      ]
    }
  EOF
}