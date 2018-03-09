'use strict'

const Group = use('App/Models/Auths/Group')

const Database = use('Database')

const Logger = use('Logger')
const { validateAll } = use('Validator')

var moment = require('moment')

class GroupController {

  async indexGroup() {
    try {
      const group = await Group.all()

      return {
        type: 'success',
        group: group
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async storeGroup({ request, response, session }) {
    const validation = await validateAll(request.all(), {
      title: 'required|min:3|max:20|unique:groups, title',
      description: 'string|min:3|max:255'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages())

      return {
        type: 'error',
        message: validation
      }
    }

    try {
      const group = await Group
        .query()
        .insert({
          title: request.input('title'),
          description: request.input('description')
        })
        .into('groups')

      return {
        type: 'success',
        message: 'Добавлена новая группа!'
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async updateGroup({ request, response, session, params }) {
    const validation = await validateAll(request.all(), {
      title: 'required|min:3|max:20|unique:groups, title',
      description: 'string|min:3|max:255'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages())

      return {
        type: 'error',
        message: validation
      }
    }

    try {
      const group = await Database
        .table('groups')
        .where('id', params.id)
        .update({
          title: request.input('title'),
          description: request.input('description')
        })

      return {
        type: 'success',
        message: 'Редактирование группы прошла успешно!'
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async destroyGroup({ params }) {
    try {
      const group = await Database
        .table('groups')
        .where('id', params.id)
        .delete()

      return {
        type: 'success',
        message: 'Удаление группы прошла успешно!'
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

module.exports = GroupController
