'use strict'

const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.down()
    this.create('bookings', (table) => {
      table.increments()
      table.integer('tour_id')
        .notNullable()
        .unsigned()
      table.string('full_name')
        .notNullable()
      table.string('email', 80)
        .notNullable()
      table.string('number', 80)
        .notNullable()
      table.string('country')
        .notNullable()
      table.text('question')
        .nullable()
      table.boolean('is_status')
        .notNullable()
        .defaultTo(true)
        
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('bookings')
  }
}

module.exports = BookingSchema
