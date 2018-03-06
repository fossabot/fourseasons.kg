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
      
      

    // Main page admin panel
    Route.get('/admin', 'Auths/UserController.mainPage')

    Route.get('/users', 'Auths/UserController.userIndex')
      


 

    //Route.patch('userUpdate/:id', 'Auths/UserController.userUpdate').as('update')

    //Route.get('/userUpdate/:id', 'Auths/UserController.userIndexUpdate')
    // -- END -- //



  
    // TOURS
    // -- BEGIN -- //    
    Route.get('/:lang', 'Tours/TourTypeController.indexTourTypes')
    // Route.get('/:lang', 'News/NewsController.indexNews')
    Route.get('/:lang/type/:id', 'Tours/TourController.indexTours')
    Route.get('/:lang/type/tour/:id', 'Tours/TourController.indexTour')

    Route.get('/:lang/categories', 'Tours/TourController.categoryTour')
    
    Route.post(':lang/tour', 'Tours/TourController.store')
    // -- TOURS END -- //

    




    

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

Route.get('/message', ({ response }) => {
  response.send('hello world')
})

Route.any('*', 'NuxtController.render')
