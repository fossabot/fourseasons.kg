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

/** System control 
 * 
 * Begin
 */

Route
  .group(() => {
    // System control
    Route.get('/login', 'Auths/UserController.loginUserIndex')
    Route.get('/createuser', 'Auths/UserController.createUserIndex')
    Route.post('createuser', 'Auths/UserController.createUser').as('create')
    Route.get('/users', 'Auths/UserController.userIndex')
    Route.delete('userDelete/:id', 'Auths/UserController.userDelete')
    Route.patch('userBlaUpdate/:id', 'Auths/UserController.userUpdate').as('update')

    Route.get('/userUpdate/:id', 'Auths/UserController.userIndexUpdate')

    Route.get('register/confirm/:token', 'Auths/UserController.userConfirm')

    // Main
    Route.get('/', 'MainController.indexMain')
    Route.get('/:lang', 'MainController.indexMain')    
    Route.get('/:lang/:tour_type', 'MainController.indexTours')

    
    // Lang 

    
    
    // Tour
    
    Route.post(':lang/tour', 'Tours/TourController.store')
  })
  .prefix(Env.get('API'))

/**
 * End
 */



Route.any('*', 'NuxtController.render')
