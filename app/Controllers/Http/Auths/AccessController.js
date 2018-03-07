'use strict'


const Group = use('App/Models/Auths/Group')
const Access = use('App/Models/Auths/Access')

const Database = use('Database')

const Logger = use('Logger')
const { validateAll } = use('Validator')

var randString = require('randomstring')
var moment = require('moment')

class AccessController {
  async indexAccess() {
    try {
      const access = await Access.all()

      return {
        type: 'success',
        access: access
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async storeAccess({ request, session }) {
    const validation = await validateAll(request.all(), {
      group_id: 'required|unique:accesses, group_id'

    })

    if (validation.fails()) {
      session.withErrors(validation.messages())

      return {
        type: 'error',
        validation: validation
      }
    }

    const {
      group_id, accesses, albums,
      bookings, groups, images,
      languages, news, subscribers,
      tour_comments, tour_types, tours,
      users
    } = request.all()

    try {
      const access = await Access
        .create({
          group_id: group_id,
          accesses: accesses,
          albums: albums,
          bookings: bookings,
          groups: groups,
          images: images,
          languages: languages,
          news: news,
          subscribers: subscribers,
          tour_comments: tour_comments,
          tour_types: tour_types,
          tours: tours,
          users: users
      })

      return {
        type: 'success',
        message: 'Установлен доступ',
        object: access
      }

    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async updateAccess({ request, response, session, params }) {

    const {
      accesses, albums,
      bookings, groups, images,
      languages, news, subscribers,
      tour_comments, tour_types, tours,
      users
    } = request.all()

    try {
      const access = await Access
        .query()
        .where('group_id', params.id)
        .update({
          accesses: accesses,
          albums: albums,
          bookings: bookings,
          groups: groups,
          images: images,
          languages: languages,
          news: news,
          subscribers: subscribers,
          tour_comments: tour_comments,
          tour_types: tour_types,
          tours: tours,
          users: users
        })

      return {
        type: 'success',
        message: 'Обновлен доступ'
      }

    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async destroyAccess({ params }) {
    try {
      const access = await Access
        .query()
        .where('group_id', params.id)
        .delete()

      return {
        type: 'success',
        message: 'Удаление доступа прошла успешно!'
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }
}

module.exports = AccessController
