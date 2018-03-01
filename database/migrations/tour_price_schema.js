'use strict'

const Schema = use('Schema')

class TourPriceSchema extends Schema {
  up() {
    this.create('tour_prices', (table) => {
      table.increments()
      table.decimal('price', 12, 2)
        .notNullable()
      table.integer('tour_id')
        .notNullable()
        .unsigned()      
    })
  }

  down() {
    this.drop('tour_prices')
  }
}

module.exports = TourPriceSchema
