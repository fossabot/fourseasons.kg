'use strict'


const User = use('App/Models/Auths/User')
const Group = use('App/Models/Auths/Group')
const Token = use('App/Models/Auths/Token')

const Database = use('Database')

const Helpers = use('Helpers')
const Logger = use('Logger')
const Mail = use('Mail')
const Hash = use('Hash')
const Env = use('Env')

const { validateAll } = use('Validator')

var randString = require('randomstring')
var moment = require('moment')

class UserController {
    /**
     * Create new user
     * 
     * @param {request } get value in page
     * @param { response } send answer function 
     * @param { session} value time
     */
    async createUser({ request, response, session }) {
        // global variable
        var flag = false

        // validation datas
        const validation = await validateAll(request.all(), {
            display_name: 'required|min:3|max:80',
            user_name: 'required|min:3|max:80|unique:users, user_name',
            email: 'required|email|min:5|max:80|unique:users, email',
            group: 'required',
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
        console.log('im here')
        // user access


        // add user
        try {
            // Create new user
            const user = await User.create({
                display_name: request.input('display_name'),
                user_name: request.input('user_name'),
                email: request.input('email'),
                group_id: Number(request.input('group')),
                password: request.input('password'),
                confirmation_token: randString.generate(255),
                created_at: moment().format('YYYY-MM-DD HH:mm'),
                updated_at: moment().format('YYYY-MM-DD HH:mm')
            })
            Database.close()

            if (user) {
                flag = true
            }
            // Send mail for activate user
            await Mail.send('auth.mail.message', user.toJSON(), (message) => {
                message
                    .to(user.email)
                    .from(Env.get('MAIL_USERNAME'))
                    .subject('Письмо для подтверждения')                    
            })
            
            
            // Send session value
            session.flash({
                type: 'success',
                notification: 'Добавлен новый пользователь! Пожалуйста потвердите почту по ссылке.'
            })


        } catch (error) {
            // Send session value
            session.withErrors({
                type: 'error',
                notification: 'Ошибка добавления пользователя!'
            })

            // Logger for error
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)

            // Delete user
            if (flag) {
                try {
                    await User
                        .query()
                        .where('user_name', user_name)
                        .delete()

                } catch (error) {
                    Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)
                }
            }
        }

        return response.redirect('back')
    }

    async userIndex({ session }) {
        // get access user
        // get data and validation



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
            .where('users.id', session.user_id)

        Database.close()
        return { users: user }

    }

    async userDelete({ params, session, response }) {
        const user = await User.find(params.id)
        await user.delete()

        session.flash({ notification: 'Пользователь удален!' })

        return response.redirect('back')
    }

    async userIndexUpdate({ params, view }) {
        const user = await User.find(params.id)
        Database.close()

        return { user: user.toJSON() }
    }

    async userConfirm({ params, response, session }) {

        const validation = await validateAll(params.token, {
            token: 'required|min:255|max:256'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
            // response.redirect('back')
            return  {
                type: 'error',
                validate: validation
            }
        }
        
        const confirm = await User.findBy('confirmation_token', params.token)

        confirm.save('is_active', true)

        session.flash({
            type: 'success',
            message: 'Вы подтвердили свою почту!'
        })

        // return response.redirect(Env.get('API') + '/login')
        return  {
            type: 'success',
            validate: validation
        }
    }

    async login({ request, session, response }) {
        // validation
        // const { name, email, password } = request.all()

        // validation datas
        
        const validation = await validateAll(request.all(), {
            name: 'required|min:3|max:80|unique:users, user_name',
            email: 'required|email|min:5|max:80|unique:users, email',
            password: 'required|confirmed|min:6|max:60'
        })

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashExcept(['password', 'csrf_token'])

            return response.redirect('back')
        }


        return {
            type: 'success',
            validate: validation
        }
    }
}

module.exports = UserController
