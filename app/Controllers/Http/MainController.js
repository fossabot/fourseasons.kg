'use strict'

const Database = use('Database')
const Logger = use('Logger')

const { validate } = use('Validator')

const moment = require('moment')

/** Model */
const Language = use('OTHERS/Language')

const Tour = use('TOURS/Tour')
const TourDescriptions = use('TOURS/TourDescription')

const TourType = use('TOURS/TourType')
const TourTypeDesciption = use('TOURS/TourTypeDescription')

const News = use('NEWS/News')
const NewsDescription = use('NEWS/NewsDescription')
const NewsImage = use('NEWS/NewsImage')

class MainController {

    /** Main page
     * 
     * @param { params } for detected language 
     */
    async indexMain({ params, session }) {
        
        const lang = params.lang || 'ru'
        
        const lang_id = await Language.findBy('code', lang) 
        
        session.put('lang_id', lang_id.id)
        try {
            const tourType = await TourType
                .query()
                .innerJoin('tour_type_descriptions', 'tour_types.id', 'tour_type_descriptions.tour_type_id')
                .innerJoin('images', 'tour_types.img_id', 'images.id')
                .select(
                    'tour_type_descriptions.tour_type_id', 'tour_type_descriptions.title',
                    'tour_type_descriptions.description',
                    'images.url',
                    'images.title as img_title',
                    'images.description as img_description'
                )
                .where('tour_type_descriptions.lang_id', lang_id.id)
                .where('tour_types.is_status', 1)
            
            let news 
            if(true) {
                news = await News
                    .query()
                    .innerJoin('news_descriptions', 'news.id', 'news_descriptions.news_id')
                    .innerJoin('images', 'news.img_id', 'images.id')
                    .select(
                        'news_descriptions.news_id',
                        'news_descriptions.title',
                        'news_descriptions.article',
                        'images.url',
                        'images.title as img_title',
                        'images.description as img_description'
                    )
                    .where('news_descriptions.lang_id', lang_id.id) 
                    .where('news.is_status', 1)
            }

            Database.close()
            return { 
                type: 'success',
                tourType: tourType,
                news: news
            }
        } catch (error) {
            Logger.error('Error!!! Date: %s Message: %s', moment().format('YYYY-MM-DD HH:mm:ss'), error)
            
            Database.close()
            return {
                type: 'error',
                message: error
            }
        }
        

        
    }

    async indexTours({ params, session }) {
        
        let lang, lang_id
        
        if(session.get('lang_id')) {
            lang_id = session.get('lang_id')
        } else {
            lang = params.lang || 'ru'
            lang_id = await Language.findBy('code', lang) 
        }
            
        try {
            const tours = await Tour
                .query()
                .innerJoin('tour_descriptions', 'tours.id', 'tour_descriptions.tour_id')
                .innerJoin('images', 'images.id', 'tours.img_id')
                .select(
                    'tours.tour_type_id',
                    'tours.day',
                    'tours.night',
                    'tours.price',
                    'tour_descriptions.tour_id',
                    'tour_descriptions.title',
                    'tour_descriptions.description',
                    'images.url',
                    'images.title as img_title',
                    'images.description as img_description'
                )
                .where('tour_type_id', params.tour_type)
                

            Database.close()

            return {
                type: 'success',
                tours: tours
            }
        } catch (error) {
            Database.close()

            return {
                type: 'error',
                message: error
            }
        }

        
        
    }
}

module.exports = MainController
