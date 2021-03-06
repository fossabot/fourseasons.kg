'use strict'

const Schema = use('Schema')

class GroupSchema extends Schema {
  up () {
    this.down()
    this.create('groups', (table) => {
      table.increments()
      table.string('title', 20)
        .notNullable()
        .unique('ui_groups_title')
      table.string('description', 255)
    })
  }

  down () {
    this.dropIfExists('groups')
  }
}

module.exports = GroupSchema
