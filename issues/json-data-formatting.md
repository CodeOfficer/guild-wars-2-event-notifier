This api randomly returns records like so:

{
  "post": {
    "id": 1,
    "title": "this is a title",
    "comments": {
      "1": {"text": "this is a comment"},
      "2": {"text": "this is a comment"}
    }
  }
}

instead of:

{
  "post": {
    "id": 1,
    "title": "this is a title",
    "comments": [
      {"id": 1, "text": "this is a comment"},
      {"id": 2, "text": "this is a comment"},
    ]
  }
}

or:

{
  "post": {
    "id": 1,
    "title": "this is a title",
    "comments": [1, 2]
  }
}
