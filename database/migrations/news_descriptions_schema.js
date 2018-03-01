'use strict'

const Schema = use('Schema')

class NewsDescriptionsSchema extends Schema {
  up () {
    this.down()
    this.create('news_descriptions', (table) => {
      table.increments()
      table.string('title')
        .notNullable()
        .unique('ui_news_descriptions_title')
      table.text('article')
        .notNullable()
      table.integer('lang_id')
        .notNullable()
        .unsigned()
      table.integer('news_id')
        .notNullable()
        .unsigned()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('news_descriptions')
  }
}

module.exports = NewsDescriptionsSchema
