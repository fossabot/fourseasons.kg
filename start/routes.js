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

const { validateAll } = use('Validator')

const Route = use('Route')
const Env = use('Env')

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
    Route.get('/:lang/type/:id', 'MainController.indexTours')
    Route.get('/:lang/type/tour/:id', 'MainController.indexTour')



    // Lang 



    // Tour

    Route.post(':lang/tour', 'Tours/TourController.store')
  })
  .prefix(Env.get('API'))

Route.get('\login', ({ request }) => {
  // validation
  const { name, email, password } = request.all()

  // validation datas
  const rules = {
    name: 'required|min:3|max:80|unique:users, user_name',
    email: 'required|email|min:5|max:80|unique:users, email',
    password: 'required|confirm|min:6|max:60'
  }

  const validation = await validateAll(request.all(), rules)

  if (validation.fails()) {
    session
      .withErrors(validation.messages())
      .flashExcept(['password', 'csrf_token'])
    return response.redirect('back')
  }

  return { 
    type: 'success',
    validate: validation }
})

Route.any('*', 'NuxtController.render')
