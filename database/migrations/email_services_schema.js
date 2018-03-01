'use strict'

const Schema = use('Schema')

class EmailServicesSchema extends Schema {
  up () {
    this.down()
    this.create('email_services', (table) => {
      table.string('domain', 24)
        .notNullable()
      table.string('name', 32)
        .notNullable()
      table.string('url', 64)
        .notNullable()
    })
  }

  down () {
    this.dropIfExists('email_services')
  }
}

module.exports = EmailServicesSchema
