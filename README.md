# Airbnb-Clone website using technology node.js, Express, MongoDB , Middleware etc.

## User Routes Endpoints

### User Registration Endpoint

#### POST /signup

##### Description
This endpoint is used to register a new user. It requires the user's username, email, and password.

##### Request Body
The request body should be a JSON object with the following properties:
- `username` (string, required): The user's username.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

Example:
```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

##### Responses

###### Success
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the user details.
```json
{
  "user": {
    "_id": "user_id_here",
    "username": "john_doe",
    "email": "john.doe@example.com"
  }
}
```

### User Login Endpoint

#### POST /login

##### Description
This endpoint is used to authenticate and log in a user. It requires the user's username and password.

##### Request Body
The request body should be a JSON object with the following properties:
- `username` (string, required): The user's username.
- `password` (string, required): The user's password.

Example:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing a success message.
```json
{
  "message": "Welcome back, john_doe!"
}
```

###### Failure
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.
```json
{
  "error": "Invalid username or password."
}
```

## Listing Routes Endpoints

### Create Listing Endpoint

#### POST /listings

##### Description
This endpoint is used to create a new listing. It requires the user to be logged in.

##### Request Body
The request body should be a JSON object with the following properties:
- `title` (string, required): The title of the listing.
- `description` (string, required): The description of the listing.
- `price` (number, required): The price of the listing.
- `location` (string, required): The location of the listing.
- `country` (string, required): The country of the listing.

Example:
```json
{
  "title": "Cozy Cottage",
  "description": "A cozy cottage in the countryside.",
  "price": 100,
  "location": "Countryside",
  "country": "USA"
}
```

##### Responses

###### Success
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the listing details.
```json
{
  "listing": {
    "_id": "listing_id_here",
    "title": "Cozy Cottage",
    "description": "A cozy cottage in the countryside.",
    "price": 100,
    "location": "Countryside",
    "country": "USA"
  }
}
```

### Get All Listings Endpoint

#### GET /listings

##### Description
This endpoint is used to retrieve all listings.

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON array containing all listings.
```json
[
  {
    "_id": "listing_id_here",
    "title": "Cozy Cottage",
    "description": "A cozy cottage in the countryside.",
    "price": 100,
    "location": "Countryside",
    "country": "USA"
  },
  {
    "_id": "listing_id_here",
    "title": "Modern Apartment",
    "description": "A modern apartment in the city.",
    "price": 150,
    "location": "City",
    "country": "USA"
  }
]
```

### Get Listing by ID Endpoint

#### GET /listings/:id

##### Description
This endpoint is used to retrieve a listing by its ID.

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the listing details.
```json
{
  "listing": {
    "_id": "listing_id_here",
    "title": "Cozy Cottage",
    "description": "A cozy cottage in the countryside.",
    "price": 100,
    "location": "Countryside",
    "country": "USA"
  }
}
```

###### Failure
- **Status Code**: 404 Not Found
- **Response Body**: A JSON object containing an error message.
```json
{
  "error": "Listing not found."
}
```

### Update Listing Endpoint

#### PUT /listings/:id

##### Description
This endpoint is used to update a listing by its ID. It requires the user to be logged in and to be the owner of the listing.

##### Request Body
The request body should be a JSON object with the properties to be updated.

Example:
```json
{
  "title": "Updated Cozy Cottage",
  "description": "An updated cozy cottage in the countryside.",
  "price": 120
}
```

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the updated listing details.
```json
{
  "listing": {
    "_id": "listing_id_here",
    "title": "Updated Cozy Cottage",
    "description": "An updated cozy cottage in the countryside.",
    "price": 120,
    "location": "Countryside",
    "country": "USA"
  }
}
```

###### Failure
- **Status Code**: 404 Not Found
- **Response Body**: A JSON object containing an error message.
```json
{
  "error": "Listing not found."
}
```

### Delete Listing Endpoint

#### DELETE /listings/:id

##### Description
This endpoint is used to delete a listing by its ID. It requires the user to be logged in and to be the owner of the listing.

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing a success message.
```json
{
  "message": "Listing deleted successfully."
}
```

###### Failure
- **Status Code**: 404 Not Found
- **Response Body**: A JSON object containing an error message.
```json
{
  "error": "Listing not found."
}
```

## Review Routes Endpoints

### Create Review Endpoint

#### POST /listings/:id/reviews

##### Description
This endpoint is used to create a new review for a listing. It requires the user to be logged in.

##### Request Body
The request body should be a JSON object with the following properties:
- `comment` (string, required): The review comment.
- `rating` (number, required): The review rating. Must be between 1 and 5.

Example:
```json
{
  "comment": "Great place to stay!",
  "rating": 5
}
```

##### Responses

###### Success
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the review details.
```json
{
  "review": {
    "_id": "review_id_here",
    "comment": "Great place to stay!",
    "rating": 5,
    "author": "user_id_here"
  }
}
```

### Delete Review Endpoint

#### DELETE /listings/:id/reviews/:reviewId

##### Description
This endpoint is used to delete a review by its ID. It requires the user to be logged in and to be the author of the review.

##### Responses

###### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing a success message.
```json
{
  "message": "Review deleted successfully."
}
```

###### Failure
- **Status Code**: 404 Not Found
- **Response Body**: A JSON object containing an error message.
```json
{
  "error": "Review not found."
}
```

