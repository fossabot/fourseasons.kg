export default function ({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) return
  const locale = params.lang || 'ru'

  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'Страница не найдена.', statusCode: 404 })
  }
  
  store.commit('SET_LANG', locale)

  app.i18n.locale = locale
}
