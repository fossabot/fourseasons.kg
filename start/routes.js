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

    Route.get('/users', 'Auths/UserController.userIndex')

    //Route.get('/login', 'Auths/UserController.login')
    //Route.delete('userDelete/:id', 'Auths/UserController.userDelete')
    //Route.patch('userUpdate/:id', 'Auths/UserController.userUpdate').as('update')

    //Route.get('/userUpdate/:id', 'Auths/UserController.userIndexUpdate')


    // -- END -- //

    // Main
    Route.get('/', 'MainController.indexMain')
    Route.get('/:lang', 'MainController.indexMain')
    Route.get('/:lang/type/:id', 'MainController.indexTours')
    Route.get('/:lang/type/tour/:id', 'MainController.indexTour')


    
    // Lang 



    // Tour

    Route.post(':lang/tour', 'Tours/TourController.store')
  })
  .prefix(Env.get('API'))

  // test route
Route.get('/login', 'Auths/UserController.login')

Route.any('*', 'NuxtController.render')
