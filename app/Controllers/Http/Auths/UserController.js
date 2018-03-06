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
        // user access
        
        // Begin transactions
        const trx = await Database.beginTransaction()
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
                message: 'Never call '
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
        try {
            const confirm = await User.findBy('confirmation_token', params.token)

            confirm.is_active = true

            await confirm.save()
         
            session.flash({
                type: 'success',
                message: 'Вы подтвердили свою почту!'
            })

             // return response.redirect(Env.get('API') + '/login')
            return  {
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
        // validation
        // const { name, email, password } = request.all()

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

        // login in system
        try {
            /**
            * Checking user in database 
            */
            const user = await User
                .query()
                .where('user_name', request.input('user_name'))
                .where('is_active', true)
                .first()

            /**
             * Verified user password and if verified check username and password
             */       
            if (user) {
                const passwordVerified = await Hash.verify(password, user.password)               
                
                if(passwordVerified) {
                    await auth.remember(!!remember).attempt(username, password)

                    session.put('user_name', request.input('user_name'))
                    
                    return response.route('/')
                }
            }

            session.flash({
                notification: {
                    type: 'warning',
                    message: 'Мы не смогли подтвердить ваши полномочия. Убедитесь, что вы подтвердили свой адрес электронной почты.'
                }
            })  

            return response.redirect('back')

        } catch (error) {
            session.flash({
                notification: {
                    type: 'error',
                    message: error
                }
            })  

        }

    }
}

module.exports = UserController
