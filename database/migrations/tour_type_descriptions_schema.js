'use strict'

const Schema = use('Schema')

class TourTypeDescriptionsSchema extends Schema {
  up () {
    this.down()
    this.create('tour_type_descriptions', (table) => {
      table.increments()
      table.integer('lang_id')
        .notNullable()
        .unsigned()
      table.string('title')
        .notNullable()
        .unique('ui_tour_type_descriptions_title')
      table.text('descriptions')
        .nullable()
      table.integer('tour_type_id')
        .notNullable()
        .unsigned()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tour_type_descriptions')
  }
}

module.exports = TourTypeDescriptionsSchema
