'use strict'


const User = use('App/Models/Auths/User')
const Group = use('App/Models/Auths/Group')
const Token = use('App/Models/Auths/Token')

const Database = use('Database')

const Logger = use('Logger')
const Mail = use('Mail')
const Hash = use('Hash')
const Env = use('Env')

const { validateAll } = use('Validator')

var randString = require('randomstring')
var moment = require('moment')

class UserController {
    async indexTourTypes({ params, session }) {
        const lang = params.lang || 'ru'
        const lang_id = await Language.findBy('code', lang)

        try {
            const tourType = await TourType
                .query()
                .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
                .innerJoin('images', 'tour_types.img_id', 'images.id')
                .select(
                    'tour_type_descriptions.tour_type_id',
                    'tour_type_descriptions.title',
                    'tour_type_descriptions.description',
                    'images.url',
                    'images.title as img_title',
                    'images.description as img_description'
                )
                .where('tour_type_descriptions.lang_id', lang_id.id)
                .where('tour_types.is_status', 1)

            return {
                type: 'success',
                tourType: tourType
            }
        } catch (error) {
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }
    }

    async indexUser({ session }) {
        // get access user


        // get data and validation
        try {
            // Select users list
            const user = await User
                .query()
                .innerJoin('groups', 'users.group_id', 'groups.id')
                .select(
                    'users.user_name',
                    'users.display_name',
                    'img_url',
                    'groups.title',
                    'users.email'
                )
                .where('users.user_name', session.get('user_name'))

            Database.close()

            return {
                users: user
            }
        } catch (error) {
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }



    }

    /**
     * Create new user
     * 
     * @param {request } get value in page
     * @param { response } send answer function 
     * @param { session} value time
     */
    async storeUser({ request, response, session }) {

        // validation datas
        const validation = await validateAll(request.all(), {
            display_name: 'required|min:3|max:80',
            user_name: 'required|min:3|max:80|unique:users, user_name',
            email: 'required|email|min:5|max:80|unique:users, email',
            group_id: 'required',
            password: 'required|confirmed|min:6|max:60'
        })

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashExcept(['password', 'csrf_token'])
            //response.redirect('back')
            return {
                type: 'error',
                validate: validation
            }
        }
        // user access

        const { display_name, user_name, email, group_id, password } = request.all()
        // Begin transactions
        const trx = await Database.beginTransaction()
        
        // add user
        try {
            // const confirmation_token = randString.generate(255)
            // Create new user
            const user = await User.create({
                display_name: display_name,
                user_name: user_name,
                email: email,
                group_id: Number(group_id),
                password: password,
                confirmation_token: randString.generate(255),
                created_at: moment().format('YYYY-MM-DD HH:mm'),
                updated_at: moment().format('YYYY-MM-DD HH:mm')
            }, trx)

            // Send mail for activate user
            await Mail.send('auth.mail.message', user.toJSON(), (message) => {
                message
                    .to(user.email)
                    .from(Env.get('MAIL_USERNAME'))
                    .subject('Письмо для подтверждения')
            })

            trx.commit()

            // Send session value
            session.flash({
                type: 'success',
                notification: 'Добавлен новый пользователь! Пожалуйста потвердите почту по ссылке.'
            })

            Database.close()

            return {
                type: 'success',
                message: 'Добавлен новый пользователь! Пожалуйста потвердите почту по ссылке.',
                user: user
            }
        } catch (error) {
            // Send session value
            session.withErrors({
                type: 'error',
                notification: 'Ошибка добавления пользователя!'
            })

            // Logger for error
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            // Rollback transaction
            trx.rollback()

            return {
                type: 'error',
                message: error
            }
        }

        return response.redirect('back')
    }

    async updateUser({ params, session, request }) {

        const validation = await validateAll(request.all(), {
            display_name: 'required|min:3|max:80',
            user_name: 'required|min:3|max:80',
            email: 'required|email|min:5|max:80',
            group_id: 'required',
            password: 'required|confirmed|min:6|max:60'
        })

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashExcept(['password', 'csrf_token'])
            //response.redirect('back')
            return {
                type: 'error',
                validate: validation
            }
        }

        const { display_name, user_name, email, group_id, password } = request.all()
        
        try {
            const user = await User
                .query()
                .where('id', params.id)
                .update({
                    display_name: display_name,
                    user_name: user_name,
                    email: email,
                    group_id: group_id,
                    password: password
                })   

                return {
                    type: 'success',
                    message: 'Пользователь обновлен'
                }
        } catch (error) {
            // Logger for error
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }

        return {
            user: user
        }
    }

    async destroyUser({ params, session, response }) {
        console.log('User destroy')

        try {
            const { id } = params
            if (id) {
                const user = await User.find(id)
                await user.delete()

                session.flash({
                    type: 'succes',
                    notification: 'Пользователь удален!'
                })
                // return response.redirect('back')

                return {
                    type: 'succes',
                    message: 'Пользователь удален'
                }
            }

        } catch (error) {
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }

        return {
            type: 'attention',
            message: 'Вы не выбрали пользователя'
        }
    }

    async userConfirm({ params, response, session }) {

        const validation = await validateAll(params.token, {
            token: 'required|min:255|max:256'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
            // response.redirect('back')
            return {
                type: 'error',
                validate: validation
            }
        }
        try {
            const confirm = await User.findBy('confirmation_token', params.token)

            confirm.is_active = true

            await confirm.save()

            session.flash({
                type: 'success',
                message: 'Вы подтвердили свою почту!'
            })

            // return response.redirect(Env.get('API') + '/login')
            return {
                type: 'success',
                message: 'Вы подтвердили свою почту!',
                confirm: confirm
            }

        } catch (error) {
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }
    }

    async login({ request, auth, session, response }) {

        // validation datas
        const validation = await validateAll(request.all(), {
            user_name: 'required|min:3|max:80',
            password: 'required|min:6|max:60'
        })

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashExcept(['remember'])

            return response.redirect('back')
        }

        const { user_name, password, remember } = request.all()

        // login in system
        try {
            /**
            * Checking user in database 
            */
            const user = await User
                .query()
                .where('user_name', user_name)
                .where('is_active', true)
                .first()
            /**
             * Verified user password and if verified check username and password
             */
            if (user) {
                const passwordVerified = await Hash.verify(password, user.password)

                if (passwordVerified) {
                    await auth
                        .remember(!!remember)
                        .attempt(user_name, password)

                    session.put('user_name', user_name)

                    return response.redirect('/api/users', true)
                    // return response.redirect('/profile')
                }
            }

            session.flash({
                notification: {
                    type: 'warning',
                    message: 'Мы не смогли подтвердить ваши полномочия. Убедитесь, что вы подтвердили свой адрес электронной почты.'
                }
            })

            response.redirect('back')

        } catch (error) {
            session.flash({
                notification: {
                    type: 'error',
                    message: error
                }
            })

            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            return {
                type: 'error',
                message: error
            }
        }
    }
}

module.exports = UserController
