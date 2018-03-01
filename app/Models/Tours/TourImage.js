'use strict'

const Model = use('Model')
const Env = use('Env')

class TourImage extends Model {
  tour() {
    return this.belongsTo(Env.get('TOUR')+'Tour', 'tour_id', 'id')
  }

  image() {
    return this.belongsTo(Env.get('IMAGE')+'Image', 'images_id', 'id')
  }
}

module.exports = TourImage
