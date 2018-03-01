'use strict'

const Schema = use('Schema')

class NewsSubscribersSchema extends Schema {
  up () {
    this.down()
    this.create('news_subscribers', (table) => {
      table.primary(['news_id', 'subscribers_id'])
      table.integer('news_id')
        .notNullable()
        .unsigned()
      table.integer('subscribers_id')
        .notNullable()
        .unsigned()
      table.datetime('send_data')
    })
  }

  down () {
    this.dropIfExists('news_subscribers')
  }
}

module.exports = NewsSubscribersSchema
