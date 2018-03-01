'use strict'

const Schema = use('Schema')

class TourPriceTitleSchema extends Schema {
  up() {
    this.create('tour_price_titles', (table) => {
      table.increments()
      table.string('title')
        .notNullable()
      table.integer('lang_id')
        .notNullable()
        .unsigned()
      table.integer('tour_id')
        .notNullable()
        .unsigned()
      table.integer('tour_pr_id')
        .unsigned()
    })
  }

  down() {
    this.drop('tour_price_titles')
  }
}

module.exports = TourPriceTitleSchema
