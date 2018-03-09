'use strict'

class Language {
  get rules() {
    return {
      title: 'required|min:2|max:80|unique:languages, title',
      code: 'required|max:20|unique:languages, code',
      prefix: 'required|max:20|unique:languages, prefix',
      img_url: 'min:3|max:255|unique:languages, img_url'
    }
  }

  get validateAll () {
    return true
  }

  get messages() {
    return { 
      required: 'Эти поля должны быть заполнены',
      min: 'Поле должно содержать больше 2 символов',
      max: 'Поле должно содержать меньше 20 символов',
      unique: 'Это поле должна быть уникальной'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Language
