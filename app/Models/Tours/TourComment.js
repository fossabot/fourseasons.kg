'use strict'

const Model = use('Model')


class TourComment extends Model {
  /**
   * Legacy pivot table does not have created_at column but YMMV.
   */
  static get createdAtColumn() {
    return undefined
  }

  /**
   * Legacy pivot table does not have updated_at column but YMMV.
   */
  static get updatedAtColumn() {
    return undefined
  }
}

module.exports = TourComment
