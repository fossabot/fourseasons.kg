'use strict'

const Model = use('Model')
const Env = use('Env')

class Language extends Model {
  tourDescriptions() {
    return this.hasMany(Env.get('TOUR') + 'TourDescription')
  }

  tourTypeDescriptions() {
    return this.hasMany(Env.get('TOUR') + 'TourTypeDescriptions')
  }
}

module.exports = Language
