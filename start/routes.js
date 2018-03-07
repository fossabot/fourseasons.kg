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
    /** USER */
    // Get users
    Route.get('/users', 'Auths/UserController.indexUser')
    // create new user    
    Route.post('user', 'Auths/UserController.storeUser')
    // update user
    Route.patch('user/:id', 'Auths/UserController.updateUser')
    // delete user
    Route.delete('user/:id', 'Auths/UserController.destroyUser')
    // confirm user
    Route.post('register/confirm/:token', 'Auths/UserController.userConfirm')
    // login in system
    Route
      .get('/login',  'Auths/UserController.login')
      .middleware(['authenticated'])         

    /** GROUP */
    // get groups
    Route.get('/group', 'Auths/GroupController.indexGroup')
    // create new groups
    Route.post('group', 'Auths/GroupController.storeGroup')
    // update group
    Route.patch('group/:id', 'Auths/GroupController.updateGroup')
    // delete group
    Route.delete('group/:id', 'Auths/GroupController.destroyGroup')

    /** ACCESS */
    // get access
    Route.get('/access', 'Auths/AccessController.indexAccess')
    // create new access
    Route.post('access', 'Auths/AccessController.storeAccess')
    // update access
    Route.patch('access/:id', 'Auths/AccessController.updateAccess')
    // delete access
    Route.delete('access/:id', 'Auths/AccessController.destroyAccess')
    // -- END -- //

    /**  */

  
    // TOURS
    // -- BEGIN -- //   
    // create tour
    Route.post('tour', 'Tours/TourController.storeTour')
    // update tour
    Route.patch('tour/:id', 'Tours/TourController.updateTour')
    // delete tour
    Route.delete('tour/:id', 'Tours/TourController.destroyTour')
    
    Route.get('/:lang', 'Tours/TourTypeController.indexTourTypes')
    Route.get('/:lang/type/:id', 'Tours/TourController.indexTours')
    Route.get('/:lang/type/tour/:id', 'Tours/TourController.indexTour')
    Route.get('/:lang/categories', 'Tours/TourController.categoryTour')
    // -- TOURS END -- //

    // TYPES TOUR
    // -- BEGIN --

    // -- END --

    //  NEWS
    // -- BEGIN --
    Route.get('/:lang/news', 'News/NewsController.indexNews')

    // -- END --

  })
  .prefix(Env.get('API'))

Route.get('/user/:name', async({ params, session, response })=>{

  session.put('user_name', params.name)

  return response.redirect('/profile', 200) 
})

Route.get('/profile', async({ session })=>{
  return {
    session: session.get('user_name', 'Nothing')
  }
})

Route.get('/message', ({ request, response }) => {
  response.send('hello world')
})

Route.any('*', 'NuxtController.render')
