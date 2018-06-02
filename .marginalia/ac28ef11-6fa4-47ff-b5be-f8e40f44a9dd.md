When the client makes a `DELETE` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If there's an error in removing the _friend_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friend could not be removed" }`.