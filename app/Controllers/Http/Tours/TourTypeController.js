'use strict'

// -- Additional 
const Database = use('Database')
const Logger = use('Logger')
const { validate } = use('Validator')

const moment = require('moment')
// -- Additional END --

// -- MODELS -- 
const Language = use('OTHERS/Language')

const Tour = use('TOURS/Tour')
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
      const tour_type = await TourType
        .query()
        .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
        .innerJoin('tours', 'tour_types.id', 'tours.tour_type_id')
        .innerJoin('images', 'tour_types.img_id', 'images.id')
        .distinct('tour_type_descriptions.title')
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
        .where('tours.is_status', 1)


      Database.close()
      return {
        type: 'success',
        tour_type: tour_type
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

  async categoriesTour({ params }) {
    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      let tour_type = await TourType
        .query()
        .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
        .select(
          'tour_type_descriptions.tour_type_id as id',
          'tour_type_descriptions.title'
        )
        .where('tour_type_descriptions.lang_id', lang_id.id)
        .where('tour_types.is_status', 1)

      for (let i = 0; i < tour_type.length; ++i) {

        const tour = await Tour
          .query()
          .innerJoin('tour_descriptions', 'tours.id', 'tour_descriptions.tour_id')
          .select(
            'tour_descriptions.id',
            'tour_descriptions.title as title'
          )
          .where('tours.tour_type_id', tour_type[i].id)
          .where('tour_descriptions.lang_id', lang_id.id)
          .where('tours.is_status', 1)

        tour_type[i].tours = tour

        if (tour_type[i].tours == '') {
          tour_type.splice(i)
        }
      }

      return {
        type: 'success',
        tour_type: tour_type
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async showTourType({ params }) {
    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      const tour_type = await TourType
        .query()
        .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
        .innerJoin('images', 'images.id', 'tour_types.img_id')
        .select(
          'tour_type_descriptions.tour_type_id as id',
          'tour_type_descriptions.title',
          'tour_type_descriptions.description',
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('tour_type_descriptions.lang_id', lang_id.id)
        .where('tour_types.is_status', 1)
        .where('tour_types.id', params.id)

      return {
        type: 'success',
        tour_type: tour_type[0]
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async store() {
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = TourTypeController
