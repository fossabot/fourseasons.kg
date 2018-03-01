'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.down()
    this.create('users', table => {
      table.increments()
      table.string('user_name', 80)
        .notNullable()
        .unique('ui_users_user_name')
      table.string('display_name', 80)
        .notNullable()
      table.string('password', 60)
        .notNullable()
      table.string('img_url', 255)
        .nullable()
      table.integer('group_id', 3)
        .notNullable()
        .unsigned()
        .defaultTo(2)
      table.string('email', 80)
        .notNullable()
        .unique('ui_users_email_unique')
      table.string('confiramtion_token')
      table.boolean('is_active')
        .notNullable()
        .defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
