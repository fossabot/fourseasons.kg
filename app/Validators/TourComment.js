'use strict'

class TourComment {
  get rules () {
    return {
      full_name: 'required|min:4|max:255',
      email: 'required|min:4|max:80',
      description: 'required|min:4|max:255'
    }
  }

  get validateAll () {
    return true
  }

  get messages() {
    return { 
      required: 'Эти поля должны быть заполнены',
      min: 'Поле должно содержать больше 4 символов',
      max: 'Поле должно содержать меньше 255 символов'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = TourComment
