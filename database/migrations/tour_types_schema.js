'use strict'

const Schema = use('Schema')

class TourTypesSchema extends Schema {
  up () {
    this.down()
    this.create('tour_types', (table) => {
      table.increments()
      table.integer('img_id')
        .notNullable()
        .unsigned()
      table.boolean('is_status')
        .notNullable()
        .defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tour_types')
  }
}

module.exports = TourTypesSchema
