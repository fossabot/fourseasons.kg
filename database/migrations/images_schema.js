'use strict'

const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.down()
    this.create('images', (table) => {
      table.increments()
      table.string('url')
        .notNullable()
        .unique('ui_images_url')
      table.string('title')
        .notNullable()
        .unique('ui_images_title')
      table.text('description')
        .nullable()
      table.integer('album_id')
        .notNullable()
        .unsigned()
        .defaultTo(0)
    })
  }

  down () {
    this.dropIfExists('images')
  }
}

module.exports = ImagesSchema
