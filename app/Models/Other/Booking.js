'use strict'

const Model = use('Model')
const Env = use('Env')

class Booking extends Model {
  tour() {
    return this.belongsTo(Env.get('TOUR') + 'Tour', 'tour_id', 'id')
  }
}

module.exports = Booking
