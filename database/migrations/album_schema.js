'use strict'

const Schema = use('Schema')

class AlbumSchema extends Schema {
  up() {
    this.down()
    this.create('albums', (table) => {
      table.increments()
      table.string('title', 100)
        .notNullable()
        .unique('ui_albums_title')
      table.integer('parent_id')
        .notNullable()
        .unsigned()
        .defaultTo(0)
    })
  }

  down() {
    this.dropIfExists('albums')
  }
}

module.exports = AlbumSchema
