'use strict'

const TourComment = use('TOURS/TourComment')
const Logger = use('Logger')

const moment = require('moment')


class TourCommentController {
  async indexTourComment() {
    try {
      const tour_comment = await TourComment.all()

      return {
        type: 'succes',
        tour_comment: tour_comment
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async storeTourComment({ request, params }) {
    const { full_name, email, description } = request.all()

    try {
      const tour_comment = new TourComment()

      tour_comment.tour_description_id = params.id
      tour_comment.full_name = full_name
      tour_comment.email = email
      tour_comment.description = description
      tour_comment.date_add = moment().format('YYYY-MM-DD HH:mm')

      await tour_comment.save()

      return {
        type: 'success',
        tour_comment: 'Добавлен новый комментарий'
      }

    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async updateTourComment({ params, request }) {
    const is_status = request.only(['is_status'])

    try {
      const tour_comment = await TourComment.find(params.id)
      console.log(is_status)
      tour_comment.is_status = is_status

      await tour_comment.save()

      return {
        type: 'success',
        tour_comment: 'Обновлен комментарий'
      }

    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }

  async destroyTourComment({ params }) {
    try {
      const tour_comment = await TourComment.find(params.id)

      await tour_comment.delete()

      return {
        type: 'success',
        tour_comment: 'Комментарий удален'
      }
    } catch (error) {
      Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

      return {
        type: 'error',
        message: error
      }
    }
  }
}

module.exports = TourCommentController
