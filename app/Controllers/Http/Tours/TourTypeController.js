'use strict'

// -- Additional 
const Database = use('Database')
const Logger = use('Logger')
const { validate } = use('Validator')

const moment = require('moment')
// -- Additional END --

// -- MODELS -- 
const Language = use('OTHERS/Language')

const TourType = use('TOURS/TourType')
// -- END MODELS -- 

class TourTypeController {
  /** Main page
     * 
     * @param { params } for detected language 
     */
  async indexTourTypes({ params, session }) {

    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      const tourType = await TourType
        .query()
        .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
        .innerJoin('images', 'tour_types.img_id', 'images.id')
        .select(
          'tour_type_descriptions.tour_type_id',
          'tour_type_descriptions.title',
          'tour_type_descriptions.description',
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('tour_type_descriptions.lang_id', lang_id.id)
        .where('tour_types.is_status', 1)


      Database.close()
      return {
        type: 'success',
        tourType: tourType
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

module.exports = TourTypeController
