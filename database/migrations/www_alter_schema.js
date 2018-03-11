'use strict'

const Schema = use('Schema')

class AlterSchema extends Schema {
  up() {
    /**
     * ALTER accesses
     */
    this.alter('accesses', (table) => {
      table.foreign('group_id')
        .references('id')
        .inTable('groups')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_group_id_groups_accesses')
    })

    /**
     * ALTER albums
     */
    this.alter('albums', (table) => {
      table.foreign('parent_id')
        .references('id')
        .inTable('albums')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_parent_id_albums')
    })

    /**
     * ALTER bookiings
     */
    this.alter('bookings', (table) => {
      table.foreign('tour_id')
        .references('id')
        .inTable('tours')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_id_tours_bookings')
    })

    /**
     * ALTER  images
     */
    this.alter('images', (table) => {
      table.foreign('album_id')
        .references('id')
        .inTable('albums')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_album_id_albums_images')
    })

    /**
     * ALTER news_descriptions
     */
    this.alter('news_descriptions', (table) => {
      table.foreign('news_id')
        .references('id')
        .inTable('news')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_news_id_news_news_descriptions')
      table.foreign('lang_id')
        .references('id')
        .inTable('languages')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_lang_id_languages_news_descriptions')
    })

    /**
     * ALTER news_images
     */
    this.alter('news_images', (table) => {
      table.foreign('news_id')
        .references('id')
        .inTable('news')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_news_id_news_news_images')

      table.foreign('images_id')
        .references('id')
        .inTable('images')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_images_id_images_news_images')
    })

    /**
     * ALTER news
     */
    this.alter('news', (table) => {
      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_users_id_users_news')
      table.foreign('img_id')
        .references('id')
        .inTable('images')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_img_id_images_news')
    })

    /**
     * ALTER news_subscribers
     */
    this.alter('news_subscribers', (table) => {
      table.foreign('news_id')
        .references('id')
        .inTable('news')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_news_id_news_news_subscribers')

      table.foreign('subscribers_id')
        .references('id')
        .inTable('subscribers')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_subscribers_id_subscribers_news_subscribers')
    })

    /**
     * ALTER password_resets
     */
    this.alter('password_resets', (table) => {
      table.foreign('email')
        .references('email')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_email_users_password_resets')
    })

    /**
     * ALTER tokens
     */
    this.alter('tokens', (table) => {
      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_user_id_users_tokens')
    })

    /**
     * ALTER tour_comments
     */
    this.alter('tour_comments', (table) => {
      table.foreign('tour_description_id')
        .references('id')
        .inTable('tour_descriptions')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_description_id_tours_tour_comments')
    })

    /**
     * ALTER tour_descriptions
     */
    this.alter('tour_descriptions', (table) => {
      table.foreign('lang_id')
        .references('id')
        .inTable('languages')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_lang_id_languages_tour_descriptions')
      table.foreign('tour_id')
        .references('id')
        .inTable('tours')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_id_tours_tour_descriptions')
    })

    /**
     * ALTER tour_images
     */
    this.alter('tour_images', (table) => {
      table.foreign('tour_id')
        .references('id')
        .inTable('tours')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_id_tours_tours_images')
      table.foreign('images_id')
        .references('id')
        .inTable('images')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_img_id_images_tours_images')
    })
   
    /**
     * ALTER tours
     */
    this.alter('tours', (table) => {
      table.foreign('tour_type_id')
        .references('id')
        .inTable('tour_types')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_type_id_tour_type_tours')
      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_users_id_tours')
      table.foreign('img_id')
        .references('id')
        .inTable('images')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_img_id_images_tours')
    })

    /**
     * ALTER tour_type_descriptions 
     */
    this.alter('tour_type_descriptions', (table) => {
      table.foreign('lang_id')
        .references('id')
        .inTable('languages')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_lang_id_languages_tour_type_descriptions')
      table.foreign('tour_type_id')
        .references('id')
        .inTable('tour_types')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_tour_type_id_tour_types_tour_type_descriptions')
    })

    /**
     * ALTER tour_types
     */
    this.alter('tour_types', (table) => {
      table.foreign('img_id')
        .references('id')
        .inTable('images')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_img_id_images_tour_types')
    })

    /**
     * ALTER users
     */
    this.alter('users', (table) => {
      table.foreign('group_id')
        .references('id')
        .inTable('groups')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .withKeyName('fk_group_id_groups_users')
    })
  }
  down() {
    this.drop('alters')
  }
}

module.exports = AlterSchema
