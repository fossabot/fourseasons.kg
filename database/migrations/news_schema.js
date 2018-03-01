'use strict'

const Schema = use('Schema')

class NewsSchema extends Schema {
  up () {
    this.down()
    this.create('news', (table) => {
      table.increments()
      table.integer('user_id')
        .notNullable()
        .unsigned()
      table.boolean('is_status')
        .notNullable()
        .defaultTo(false)
      table.integer('img_id')
        .notNullable()
        .unsigned()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('news')
  }
}

module.exports = NewsSchema
