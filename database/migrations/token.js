'use strict'

const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.down()

    this.create('tokens', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
      table.string('token')
        .notNullable()
        .unique()
      table.string('type', 80)
        .notNullable()
      table.boolean('is_revoked')
        .defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tokens')
  }
}

module.exports = TokensSchema
