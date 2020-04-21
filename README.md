# gridsome-plugin-extract-schema

A [Gridsome](https://gridsome.org/) plugin that extracts your graphql schema to a `.json` file.

## Why do I need this?

Modern IDE's (VSCode, IntelliJ, etc) can autocomplete and verify your graphql queries if they're setup properly:
https://graphql-config.com/introduction

## Install

`npm install --save gridsome-plugin-extract-schema`

## How to use

### Edit your `gridsome.config.js`

```javascript
module.exports = {
  plugins: ["gridsome-plugin-extract-schema"]
};
```

or

```javascript
{
  use: "gridsome-plugin-extract-schema",
  options: {
    dest: `${__dirname}/src/.temp/schema.json` // Default
  }
}
```

### Create a `.graphqlconfig` file in your project root

```json
{
  "schemaPath": "src/.temp/schema.json",
  "extensions": {
    "endpoints": {
      "dev": {
        "url": "http://localhost:9200/___graphql"
      }
    }
  }
}
```
💥 Boom, now your IDE should be able to autocomplete and validate your QraphQL queries.