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
    // -- System control BEGIN -- //
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
    // -- System control END -- //

    // -- OTHERS BEGIN --
    /** Language */
    // get language
    Route.get('/language', 'Others/LanguageController.indexLanguage')
    // create new language
    Route
      .post('language', 'Others/LanguageController.storeLanguage')
      .validator('Language')
    // update language
    Route
      .patch('language/:id', 'Others/LanguageController.updateLanguage')
      .validator('Language')
    Route.delete('language/:id', 'Others/LanguageController.destroyLanguage')
    // -- OTHERS END --

    // -- BEGIN TOUR COMMENTS --
    // get all tour comments
    Route.get('/tourcomment', 'Tours/TourCommentController.indexTourComment')
    // create tour comments
    Route
      .post('tourcomment/:id', 'Tours/TourCommentController.storeTourComment')
      .validator('TourComment')
    // update tour comments
    Route
      .patch('tourcomment/:id', 'Tours/TourCommentController.updateTourComment')
    // delete tour comment
    Route
      .delete('tourcomment/:id', 'Tours/TourCommentController.destroyTourComment')

    Route.get('/:lang/tourcomment/:id', 'Tours/TourCommentController.showTourComment')

    // -- END TOUR COMMENTS --



    // TOURS
    // -- BEGIN -- // 
    // get one tour  
    Route.get('/:lang/tour/:id', 'Tours/TourController.showTour')
    // get tours in category
    Route.get('/:lang/categories/:id', 'Tours/TourController.indexTours')
    // create tour
    Route.post('tour', 'Tours/TourController.storeTour')
    // update tour
    Route.patch('tour/:id', 'Tours/TourController.updateTour')
    // delete tour
    Route.delete('tour/:id', 'Tours/TourController.destroyTour')
    
    
    // -- TOURS END -- //

    // TYPES TOUR
    // -- BEGIN --
    
    Route.get('/:lang', 'Tours/TourTypeController.indexTourTypes')
    Route.get('/:lang/categories', 'Tours/TourTypeController.categoriesTour')
    Route.get('/:lang/category/:id', 'Tours/TourTypeController.showTourType')
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
