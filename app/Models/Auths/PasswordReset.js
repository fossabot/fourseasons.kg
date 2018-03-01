'use strict'

const Model = use('Model')
const Env = use('Env')

class PasswordReset extends Model {
  user() {
    return this.belongsTo(Env.get('AUTH') + 'User', 'email', 'email')
  }
}

module.exports = PasswordReset
