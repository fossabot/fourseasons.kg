'use strict'

const Schema = use('Schema')

class TourCommentSchema extends Schema {
  up () {
    this.down()
    this.create('tour_comments', (table) => {
      table.increments()
      table.integer('tour_id')
        .notNullable()
        .unsigned()
      table.boolean('is_status')
        .notNullable()
        .defaultTo('false')
      table.string('full_name')
        .notNullable()
      table.string('email', 80)
        .notNullable()
      table.text('description')
        .notNullable()
      table.datetime('date_add')
    })
  }

  down () {
    this.dropIfExists('tour_comments')
  }
}

module.exports = TourCommentSchema
