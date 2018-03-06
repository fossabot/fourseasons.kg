'use strict'

const AccessModel = use('App/Models/Auths/Access')
const User = use('App/Models/Auths/User')

class Access {
  async handle({ request, session, auth, response }, next) {
    try {

      await auth.check()

      let user = session.get('user_name')

      if (user) {
        response.send(user)
      }

      return {
        type: 'error',
        message: 'Bla bla bla'
      } 
    } catch (error) {
      response.send('Извините вы не зарегистрированы!')
      await next()
    }

  }
}

module.exports = Access
