'use strict'

const Model = use('Model')
const Env = use('Env')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  tokens() {
    return this.hasMany('App/Models/Auths/Token')
  }
}

module.exports = User
