resource "aws_ssm_parameter" "dynamodb-users-table" {
  name = "${var.environment}-dynamodb-users-table"
  type = "String"
  value = "${aws_dynamodb_table.users.name}"
}