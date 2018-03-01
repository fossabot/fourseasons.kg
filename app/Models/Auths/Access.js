'use strict'

const Model = use('Model')
const Env = use('Env')

class Access extends Model {
  group() {
    return this.belongsTo(Env.get('AUTH') + 'Group')
  }
}

module.exports = Access
