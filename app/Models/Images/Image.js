'use strict'

const Model = use('Model')
const Env = use('Env')

class Image extends Model {
  tours() {
    return this.hasMany(Env.get('TOUR') + 'Tour', 'id', 'img_id')
  }

  tourTypes() {
    return this.hasMany(Env.get('TOUR') + 'TourType', 'id', 'img_id')
  }

  album() {
    return this.belongsTo(Env.get('IMAGE')+ 'Album', 'album_id', 'id')
  }


}

module.exports = Image
