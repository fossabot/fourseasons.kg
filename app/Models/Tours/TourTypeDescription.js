'use strict'

const Model = use('Model')
const Env = use('Env')

class TourTypeDescription extends Model {
  language() {
    return this.belongsTo(Env.get('OTHER') + 'Language', 'land_id', 'id')
  }

  tourType() {
    return this.belongsTo(Env.get('TOUR') + 'TourType', 'tour_type_id', 'id')
  }
}

module.exports = TourTypeDescription
