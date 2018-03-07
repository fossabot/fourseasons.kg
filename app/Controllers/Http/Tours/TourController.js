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
const TourImage = use('TOURS/TourImage')
const TourComment = use('TOURS/TourComment')

const TourType = use('TOURS/TourType')
// -- END MODELS -- 

class TourController {

  async indexTour({ params }) {
    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      const tours = await Tour
        .query()
        .innerJoin('tour_descriptions', 'tours.id', 'tour_descriptions.tour_id')
        .innerJoin('images', 'images.id', 'tours.img_id')
        .select(
          'tours.tour_type_id',
          'tours.day',
          'tours.night',
          'tours.min_price',
          'tour_descriptions.tour_id',
          'tour_descriptions.title',
          'tour_descriptions.programms',
          'tour_descriptions.included',
          'tour_descriptions.no_include',
          'tour_descriptions.description',
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('tour_descriptions.tour_id', params.id)
        .where('tour_descriptions.lang_id', lang_id.id)
        .where('tours.is_status', 1)

      const tour_images = await TourImage
        .query()
        .innerJoin('tours', 'tour_images.tour_id', 'tours.id')
        .innerJoin('images', 'tour_images.images_id', 'images.id')
        .select(
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('tour_images.tour_id', params.id)

      Database.close()


      return {
        type: 'success',
        tours: tours,
        tour_images: tour_images
      }
    } catch (error) {
      Database.close()

      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async indexTours({ params, session }) {
    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      const tours = await Tour
        .query()
        .innerJoin('tour_descriptions', 'tours.id', 'tour_descriptions.tour_id')
        .innerJoin('images', 'images.id', 'tours.img_id')
        .select(
          'tours.tour_type_id',
          'tours.day',
          'tours.night',
          'tours.min_price',
          'tour_descriptions.tour_id',
          'tour_descriptions.title',
          'tour_descriptions.description',
          'images.url',
          'images.title as img_title',
          'images.description as img_description'
        )
        .where('tour_type_id', params.id)
        .where('tours.is_status', 1)
        .where('tour_descriptions.lang_id', lang_id.id)
      Database.close()

      return {
        type: 'success',
        tours: tours
      }
    } catch (error) {
      Database.close()

      return {
        type: 'error',
        message: error
      }
    }
  }

  async storeTour({ request, response, session }) {
    try {

      // Validation data
      const validation = await validateAll(request.all(), {
        lang_id: 'required',
        title: 'required',
        programms: 'required',
        included: 'required',
        no_include: 'required',
        description: 'required',
        tour_id: 'required',
        tour_type_id: 'required',
        user_id: 'required',
        img_id: 'required',
        day: 'required',
        night: 'required',
        is_status: 'required',
        price: 'required'
      })

      if (validation.fails()) {
        session.withErrors(validation_tour.messages())

        return {
          type: 'error',
          message: validation
        }
        // return response.redirect('back')
      }

      /* console.log({
        tour_type_id: request.input('tour_type_id'),
        user_id: request.input('user_id'),
        img_id: request.input('img_id'),
        day: request.input('day'),
        night: request.input('night'),
        is_status: request.input('is_status'),
        price: request.input('price'),
        updated_at: moment().format('YYYY-MM-DD HH:mm'),
        created_at: moment().format('YYYY-MM-DD HH:mm')
      })

      console.log({
        lang_id: request.input('lang_id'),
        title: request.input('title'),
        programms: request.input('programms'),
        included: request.input('included'),
        no_include: request.input('no_include'),
        description: request.input('description'),
        tour_id: request.input('tour_id'),
        updated_at: moment().format('YYYY-MM-DD HH:mm'),
        created_at: moment().format('YYYY-MM-DD HH:mm')
      })
      */
      const trx = await Database.beginTransaction()

      await trx
        .insert({
          tour_type_id: request.input('tour_type_id'),
          user_id: request.input('user_id'),
          img_id: request.input('img_id'),
          day: request.input('day'),
          night: request.input('night'),
          is_status: request.input('is_status'),
          price: request.input('price'),
          updated_at: moment().format('YYYY-MM-DD HH:mm'),
          created_at: moment().format('YYYY-MM-DD HH:mm')
        })
        .into('tours')

      await trx
        .insert({
          lang_id: request.input('lang_id'),
          title: request.input('title'),
          programms: request.input('programms'),
          included: request.input('included'),
          no_include: request.input('no_include'),
          description: request.input('description'),
          tour_id: request.input('tour_id'),
          updated_at: moment().format('YYYY-MM-DD HH:mm'),
          created_at: moment().format('YYYY-MM-DD HH:mm')
        })
        .into('tour_descriptions')


      trx.commit()
      Database.close()

      session.flash({
        type: 'success',
        notification: 'Ура добавлен новый тур!'
      })

      return { type: 'success' }
    } catch (error) {

      trx.rollback()
      Database.close()
      session.withErrors({
        type: 'error',
        notification: 'Ошибка добавления!'
      })

      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return { type: 'fuck' }
    }

  }


  async update({ request, params, session }) {
    
    const validation = await validateAll(request.all(), {
      
    })
  }

  async destroy() {
  }

  async categoryTour({ params }) {
    const lang = params.lang || 'ru'
    const lang_id = await Language.findBy('code', lang)

    try {
      let tour_type = await TourType
        .query()
        .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
        .select(
          'tour_type_descriptions.tour_type_id',
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
            'tour_descriptions.title as tour_title'
          )
          .where('tours.tour_type_id', tour_type[i].tour_type_id)
          .where('tour_descriptions.lang_id', lang_id.id)
          .where('tours.is_status', 1)

        tour_type[i].tours = [
          tour
        ]
      }

      return {
        type: 'success',
        tour_type: tour_type
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  }


}

module.exports = TourController
