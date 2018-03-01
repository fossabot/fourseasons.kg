'use strict'

const Model = use('Model')
const Env = use('Env')

class Group extends Model {
  accesses() {
    return this.hasOne(Env.get('AUTH') + 'Access', 'id', 'group_id')
  }

  users() {
    return this.hasMany(Env.get('AUTH') + 'User', 'id', 'group_id')
  }
}

module.exports = Group
