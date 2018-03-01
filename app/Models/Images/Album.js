'use strict'

const Model = use('Model')
const Env = use('Env')

class Album extends Model {
  images() {
    return this.hasMany(Env.get('IMAGES') + 'Image', 'id', 'album_id')
  }
}

module.exports = Album
