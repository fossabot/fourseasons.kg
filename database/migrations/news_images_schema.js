'use strict'

const Schema = use('Schema')

class NewsImagesSchema extends Schema {
  up () {
    this.down()
    this.create('news_images', (table) => {
      table.primary(['news_id', 'images_id'])
      table.integer('news_id')
        .notNullable()
        .unsigned()
      table.integer('images_id')
        .notNullable()
        .unsigned()
    })
  }

  down () {
    this.dropIfExists('news_images')
  }
}

module.exports = NewsImagesSchema
