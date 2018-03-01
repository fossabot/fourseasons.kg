'use strict'

const Model = use('Model')
const Env = use('Env')

class TourDescription extends Model {
  tour() {
    return this.belongsTo(Env.get('TOUR') + 'Tour', 'tour_id', 'id')
  }

  language() {
    return this.belongsTo(Env.get('OTHER') + 'Language', 'lang_id', 'id')
  }
}

module.exports = TourDescription
