'use strict'

const { validateAll } = use('Validator')

const Database = use('Database')
const Logger = use('Logger')

const Tour = use('TOURS/Tour')
const TourDescription = use('TOURS/TourDescription')
const TourImage = use('TOURS/TourImage')

var moment = require('moment')

class TourController {
  async index() {

  }

  async create() {
  }

  async store({ request, response, session }) {
    try {
      // tours      
      const validation_tour = await validateAll(request.all(), {
        tour_type_id: 'required',
        user_id: 'required',
        img_id: 'required',
        day: 'required',
        night: 'required',
        is_status: 'required',
        price: 'required'
      })

      // tour_descriptions 
      const validation_tour_description = await validateAll(request.all(), {
        lang_id: 'required',
        title: 'required',
        programms: 'required',
        included: 'required',
        no_include: 'required',
        description: 'required',
        tour_id: 'required'
      })

      if (validation_tour.fails()) {
        response.send(session.withErrors(validation_tour.messages()))

        return response.redirect('back')
      }

      if (validation_tour_description.fails()) {
        response.send(session.withErrors(validation_tour_description.messages()))

        return response.redirect('back')
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

  async show() {
  }

  async edit() {
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = TourController
