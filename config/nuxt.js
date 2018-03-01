'use strict'

const pkg = require('../package')
const resolve = require('path').resolve

module.exports = {
  mode: 'universal',
  router: {
    middleware: 'i18n'
  },
  head: {
    title: 'Главная',
    titleTemplate: '%s | ' + pkg.description,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'white'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  css: [
  ],
  loading: {
    color: '#00FFCB'
  },
  plugins: [
    '~/plugins/rest-api.js',
    {
      src: '~/plugins/vue-notifications.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-carousel.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-scroll-to.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-highcharts.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-select.js',
      ssr: false
    },
     '~/plugins/bootstrap-vue.js',
    '~/plugins/i18n.js'
  ],
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  axios: {
  },
  build: {
    analyze: true,
    vendor: ['vue-i18n', 'izitoast', 'vue-notifications', 'vue-carousel', 'vue-highcharts', 'vue-select'],
    extend(config) {
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [{
                removeDoctype: true
              },
              {
                removeComments: true
              }
            ]
          }
        }
      })
    }
  },
  srcDir: resolve(__dirname, '..', 'resources')
}
