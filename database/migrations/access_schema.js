'use strict'

const Schema = use('Schema')

class AccessSchema extends Schema {
  up () {
    this.down()
    this.create('accesses', (table) => {
      table.integer('group_id') 
        .notNullable()
        .unsigned()
        .unique('ui_accesses_group_id')
        .primary('pk_group_id_accesses')
        
      table.enu('accesses',               ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('albums',                 ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('bookings',               ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('groups',                 ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('images',                 ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('languages',              ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('news_descriptions',      ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('news_images',            ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('news_subscribers',       ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('news',                   ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('subscribers',            ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tour_comments',          ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tour_descriptions',      ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tour_images',            ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tour_type_descriptions', ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tour_types',             ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('tours',                  ['111', '11', '0']).notNullable().defaultTo('0')
      table.enu('users',                  ['111', '11', '0']).notNullable().defaultTo('0')
      table.timestamps()


    })
  }

  down () {
    this.dropIfExists('accesses')
  }
}

module.exports = AccessSchema
