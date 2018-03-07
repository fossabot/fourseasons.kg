'use strict'

const Logger = use('Logger')

const moment = require('moment')

class Authenticated {
  async handle({ auth, response }, next) {
    try {
      const check = await auth.check()

      if (check) {
        return response.send('')
      }


      await next()
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)      

      await next()
    }
  }
}

module.exports = Authenticated
