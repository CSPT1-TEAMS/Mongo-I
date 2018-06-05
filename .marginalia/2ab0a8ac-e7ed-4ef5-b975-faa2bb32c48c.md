When the client makes a `PUT` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If the request body is missing the `firstName`, `lastName` or `age` property:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Please provide firstName, lastName and age for the friend." }`.

* If the value for `age` is not a number or it has a value that is less than 1 or more than 120:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Age must be a number between 1 and 120" }`.

* If there's an error when updating the _friend_:

  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friend information could not be modified." }`.

* If the friend is found and the new information is valid:

  * update the friend document in the database using the new information sent in the `reques body`.
  * return HTTP status code `200` (OK).
  * return the newly updated _friend document_.