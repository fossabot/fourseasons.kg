'use strict'

const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  up () {
    this.down()
    this.create('password_resets', (table) => {
      table.increments()
      table.string('email', 80)
        .notNullable()
      table.string('token')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('password_resets')
  }
}

module.exports = PasswordResetSchema
