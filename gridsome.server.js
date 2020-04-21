const write = require('write');
const path = require('path');
const {getIntrospectionQuery, graphql} = require('gridsome/graphql')

class ExtractSchemaPlugin {
  static defaultOptions () {
    return {
      dest: path.resolve(process.cwd(), 'src/.temp/schema.json')
    }
  }

  constructor (api, options) {
    // Skip on production builds.
    if (process.env.NODE_ENV === 'production') {
      return
    }

    api.onBootstrap(async function(app, done) {
      let schema = api._app.schema.getSchema()
      let introspectionQuery = getIntrospectionQuery()

      try {
        let res = await graphql(schema, introspectionQuery)
        write.sync(options.dest, JSON.stringify(res.data))
        console.log(`ExtractSchemaPlugin: Wrote schema to ${options.dest}`)
      }
      catch (e) {
        console.error('ExtractSchemaPlugin: Failed to write schema: ', e)
      }

      done()
    })
  }
}

module.exports = ExtractSchemaPlugin
