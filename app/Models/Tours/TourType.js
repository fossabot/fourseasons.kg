'use strict'

const Model = use('Model')
const Env = use('Env')

class TourType extends Model {
  tours() {
    return this.hasMany('Tours/Tour', 'id', 'tour_type_id')
  }

  tourTypeDescriptions() {
    return this.hasMany('Tours/TourTypeDescription', 'id', 'tour_type_id')
  }

  image() {
    return this.belongsTo('Images/Image', 'img_id', 'id')
  }
}

module.exports = TourType
