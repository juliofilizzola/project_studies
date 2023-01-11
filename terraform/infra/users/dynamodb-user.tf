resource "aws_dynamodb_table" "users" {
  name = "${var.environment}-users"
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
  write_capacity = "${var.write_capacity}"
  read_capacity = "${var.read_capacity}"

}