'use strict'

const Model = use('Model')
const Env = use('Env')

class Tour extends Model {
  tourComments() {
    return this.hasMany(Env.get('TOUR') + 'TourComment', 'id', 'tour_id')
  }

  tourDescriptions() {
    return this.hasMany(Env.get('TOUR') + 'TourDescription', 'id', 'tour_id')
  }

  bookings() {
    return this.hasMany(Env.get('OTHER') + 'Booking', 'id', 'tour_id')
  }

  tourImages() {
    return this.belongsToMany(Env.get('IMAGE') + 'Image')
  }

  tourType() {
    return this.belongsTo(Env.get('TOUR') + 'TourType', 'tour_id', 'id')
  }

  image() {
    return this.belongsTo(Env.get('IMAGE') + 'Image', 'img_id', 'id')
  }

  user() {
    return this.belongsTo(Env.get('AUTHS') + 'User', 'user_id', 'id')
  }
}

module.exports = Tour
