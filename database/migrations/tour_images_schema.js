'use strict'

const Schema = use('Schema')

class TourImagesSchema extends Schema {
  up () {
    this.down()
    this.create('tour_images', (table) => {
      table.primary(['tour_id', 'images_id'])
      table.integer('tour_id')
        .notNullable()
        .unsigned()        
      table.integer('images_id')
        .notNullable()
        .unsigned()
    })
  }

  down () {
    this.dropIfExists('tour_images')
  }
}

module.exports = TourImagesSchema
