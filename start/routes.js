'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/
const Route = use('Route')
const Env = use('Env')

Route
  .group(() => {
    // System control
    // -- BEGIN -- //
    
      // create new user    
      Route.post('createuser', 'Auths/UserController.createUser').as('create')    
      // confirm user
      Route.get('register/confirm/:token', 'Auths/UserController.userConfirm')
      // login in system
      Route.post('/login', 'Auths/UserController.login')
      
      // Main page admin panel
      Route.get('/admin', 'Auths/UserController.mainPage')

      Route.get('/users', 'Auths/UserController.userIndex')

      
      //Route.delete('userDelete/:id', 'Auths/UserController.userDelete')
      //Route.patch('userUpdate/:id', 'Auths/UserController.userUpdate').as('update')

      //Route.get('/userUpdate/:id', 'Auths/UserController.userIndexUpdate')
    // -- END -- //

    // Main
    Route.get('/', 'MainController.index')
    // Route.get('/', 'Tours/TourTypeController.indexTourTypes')
    // Route.get('/', 'News/NewsController.indexNews')
    Route.get('/:lang', 'Tours/TourTypeController.indexTourTypes')
    // Route.get('/:lang', 'News/NewsController.indexNews')
    Route.get('/:lang/type/:id', 'Tours/TourController.indexTours')
    Route.get('/:lang/type/tour/:id', 'Tours/TourController.indexTour')

    Route.get('/:lang/categories', 'Tours/TourController.categoryTour')

    
    // Lang 
    



    // Tour

    Route.post(':lang/tour', 'Tours/TourController.store')
  })
  .prefix(Env.get('API'))

Route.any('*', 'NuxtController.render')
