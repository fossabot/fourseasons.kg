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

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany(Env.get('AUTH') + 'Token', 'id', 'user_id')
  }

  passwordResets() {
    return this.hasMany(Env.get('AUTH') + 'PasswordReset', 'email', 'email')
  }

  tours() {
    return this.hasMany(Env.get('TOUR') + 'Tour', 'id', 'user_id')
  }

  group() {
    return this.belongsTo(Env.get('AUTH') + 'Group', 'group_id', 'id')
  }
}

module.exports = User
