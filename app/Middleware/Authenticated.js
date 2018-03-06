'use strict'

class Authenticated {
  async handle ({ auth, response }, next) {
    
    const check = await auth.check()

    if(check) {
      return response.send('')
    }
    
    
    await next()
  }
}

module.exports = Authenticated
