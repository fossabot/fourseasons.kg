'use strict'

const Model = use('Model')
const Env = use('Env')

class Token extends Model {
  user() {
    return this.belongsTo(Env.get('AUTHS') + 'User')
  }
}

module.exports = Token
