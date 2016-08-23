# Clark.de


## An application to parse JSON and generate Survey form .
Using ...

* Isomorphic React
* ES6 / ES7
* Express
* lodash

### Steps to run the app

Clone the application , cd into Root Directory ...

1. npm install
2. npm run start
3. Open localhost:8995 in tour browser

### JSON Schema for questionaire

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "desc": {
      "type": "string"
    },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "options":{
            "type": "array",
          },
          "optional":{
            "type": "boolean",
          }
        },
        "required": [
          "type",
          "name",
          "text"
        ]
      }
    }
  },
  "required": [
    "id",
    "title",
    "desc",
    "questions"
  ]
}
```

