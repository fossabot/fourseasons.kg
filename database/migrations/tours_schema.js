'use strict'

const Schema = use('Schema')

class ToursSchema extends Schema {
  up () {
    this.down()
    this.create('tours', (table) => {
      table.increments()
      table.integer('tour_type_id')
        .notNullable()
        .unsigned()
      table.integer('user_id')
        .notNullable()
        .unsigned()
      table.integer('img_id')
        .notNullable()
        .unsigned()
      table.integer('day', 3)
        .notNullable()
        .unsigned()
      table.integer('night', 3)
        .notNullable()
        .unsigned()      
      table.boolean('is_status')
        .notNullable()
        .defaultTo(false)
      table.decimal('min_price', 12,2)
        .notNullable()
        .unsigned()
        .defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tours')
  }
}

module.exports = ToursSchema
