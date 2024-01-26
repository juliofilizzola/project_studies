{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": ["${action}"],
        "Effect": "Allow",
        "Resource": "${resource}"
      },
      {
        "Effect": "Allow",
        "Action": [
          "logs:GreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": "*"
      }
    ]
  }