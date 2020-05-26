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

      // Gridsome v0.7.14 and earlier pass a done() callback.
      // versions after that just expect the Promise to resolve by returning.
      done && done()
    })
  }
}

module.exports = ExtractSchemaPlugin
