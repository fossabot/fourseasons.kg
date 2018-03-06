'use strict'

// -- Additional --
const Database = use('Database')
const Logger = use('Logger')
const { validate } = use('Validator')

const moment = require('moment')

// -- Additional END --

// -- MODELS -- 
const Language = use('OTHERS/Language')

const News = use('NEWS/News')
// -- MODELS END --

class NewsController {
  async indexNews({ params, session }) {

    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      const news = await News
        .query()
        .innerJoin('news_descriptions', 'news.id', 'news_descriptions.news_id')
        .innerJoin('images', 'news.img_id', 'images.id')
        .select(
          'news_descriptions.news_id',
          'news_descriptions.title',
          'news_descriptions.article',
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('news_descriptions.lang_id', lang_id.id)
        .where('news.is_status', 1)

      Database.close()

      return {
        type: 'success',
        news: news
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      Database.close()
      return {
        type: 'error',
        message: error
      }
    }
  }

  async create() {
  }

  async store() {
  }

  async show() {
  }

  async edit() {
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = NewsController
