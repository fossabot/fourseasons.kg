'use strict'

const Schema = use('Schema')

class LanguageSchema extends Schema {
  up () {
    this.down()
    this.create('languages', (table) => {
      table.increments()
      table.string('title', 80)
        .notNullable()
        .unique('ui_languages_title')
      table.string('code', 20)
        .notNullable()
        .unique('ui_languages_code')
      table.string('prefix', 20)
        .notNullable()
        .unique('ui_languages_prefix')
      table.string('img_url', 255)
        .nullable()
        .unique('ui_languages_img_url')
    })
  }

  down () {
    this.dropIfExists('languages')
  }
}

module.exports = LanguageSchema
