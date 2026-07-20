# HTTP Status Codes

## 200 OK
Request completed successfully.
Example: GET /users

## 201 Created
A new resource was created.
Example: POST /users creates a new user.

## 400 Bad Request
The client sent invalid data.
Example: Missing required fields.

## 401 Unauthorized
Authentication is required.
Example: User not logged in.

## 403 Forbidden
The user is authenticated but does not have permission.
Example: Normal user accessing an admin page.

## 404 Not Found
The requested resource does not exist.
Example: GET /users/100

## 500 Internal Server Error
An unexpected server error occurred.
Example: Database connection failed.