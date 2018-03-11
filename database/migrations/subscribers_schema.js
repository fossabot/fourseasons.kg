'use strict'

const Schema = use('Schema')

class SubscribersSchema extends Schema {
  up () {
    this.down()
    this.create('subscribers', (table) => {
      table.increments()
      table.string('email', 80)
        .notNullable()
        .unique('ui_subscribers_email_unique')
      table.boolean('is_status')
        .notNullable()
        .defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('subscribers')
  }
}

module.exports = SubscribersSchema
