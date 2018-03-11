'use strict'

const Schema = use('Schema')

class TourDescriptoinsSchema extends Schema {
  up () {
    this.down()
    this.create('tour_descriptions', (table) => {
      table.increments()
      table.integer('lang_id')
        .notNullable()
        .unsigned()
      table.string('title')
        .notNullable()
        .unique('ui_tour_descriptions_title')
      table.text('programms')
        .notNullable()
      table.text('price')
        .notNullable()
      table.text('included')
        .notNullable()
      table.text('no_include')
        .notNullable()
      table.text('description')
        .notNullable()
      table.integer('tour_id')
        .notNullable()
        .unsigned()

      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tour_descriptoins')
  }
}

module.exports = TourDescriptoinsSchema
