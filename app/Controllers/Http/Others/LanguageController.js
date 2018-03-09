'use strict'


const Language = use('OTHERS/Language')

const Database = use('Database')

const Logger = use('Logger')

class LanguageController {
  async indexLanguage() {
    try {
      const language = await Language.all()

      return {
        type: 'succes',
        language: language
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error-lang',
        message: error
      }
    }
  }

  async storeLanguage({ request }) {

    const { title, code, prefix, img_url } = request.all()

    try {
      const language = await Database
        .insert({
          title: title,
          code: code,
          prefix: prefix,
          img_url: img_url
        })
        .into('languages')

      return {
        type: 'success',
        message: language
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  }

  async updateLanguage({ request, params }) {
    const { title, code, prefix, img_url } = request.all()

    try {
      const language = await Database
        .table('languages')
        .where('id', params.id)
        .update({
          title: title,
          code: code,
          prefix: prefix,
          img_url: img_url
        })


      return {
        type: 'success',
        message: language
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  }

  async destroyLanguage({ params }) {
    try {
      const language = await Database
        .table('languages')
        .where('id', params.id)
        .delete()

      return {
        type: 'success',
        message: 'Успешно удален'
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  }
}

module.exports = LanguageController
