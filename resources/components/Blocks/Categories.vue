<template>
<div class="cat-main--component">
  <h2 class="cat-main--title">{{ title }}</h2>
  <div class="cat-main--module" v-for="(item, index) in items" :key="index" :style="'background-image: url(' + item.image +')'">
    <div class="cat-main--content">
      <div>
        <h2 class="cat-main--content-title">
          {{item.title}}
        </h2>
        <p class="cat-main--content-description">
          {{item.description}}
        </p>
      </div>
      <nuxt-link :to="'/tour/categories/' + item.id" class="cat-main--more">
        Подробнее
      </nuxt-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      items: [{
        id: 0,
        title: 'Культурные туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/0.jpg',
      }, {
        id: 1,
        title: 'Груповые туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/1.jpg',
      }, {
        id: 2,
        title: 'Индивидуальные туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/2.jpg',
      }, {
        id: 3,
        title: 'Туры по озерам Кыргызстана',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/3.jpg',
      }, {
        id: 4,
        title: 'Однодневные туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/4.jpg',
      }, {
        id: 5,
        title: 'Вело туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/5.jpg',
      }, {
        id: 6,
        title: 'Конные туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/6.jpg',
      }, {
        id: 7,
        title: 'Рафтинг туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/7.jpg',
      }, {
        id: 8,
        title: 'Джип туры',
        description: 'Познавательные поездки по городам Кыргызстана, где вы увидите главные достопримечательности и памятники культуры, истории, архитектуры различных регионов страны, посещение музеев, исторических объектов, участие в культурных развлекательных мероприятиях',
        image: '/img/tours/8.jpg',
      }]
    }
  }
}
</script>

<style lang="less">
@color-main : #569d87;
@color-bg : rgba(86, 157, 135, 0.8);
@color-main-active : #ff6600;
.cat-main--component,
.cat-main--component * {
  transition: all .65s;
}

.cat-main--component {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: "Roboto", sans-serif;
  color: white;
  margin: 20px 0;
  .cat-main--title {
    margin-left: 5%;
    padding-bottom: 20px;
    width: 100%;
    color: @color-main;
    font-size: 30px;
    font-weight: 200;
    text-transform: uppercase;
  }
  .cat-main--module {
    width: 500px;
    height: 300px;
    margin: 5px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    cursor: default;
    .cat-main--content {
      background-color: @color-bg;
      height: 100%;
      transform: translateY(85%);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      .cat-main--content-title {
        text-align: center;
        height: 30px;
        font-size: 20px;
        padding-bottom: 20%;
        &::after {
          width: 15%;
          height: 1px;
          content: '';
          background-color: white;
          display: block;
          margin: 20px 42.5%;
        }
      }
      .cat-main--content-description {
        padding: 0 20px;
        font-family: "Segoe UI", sans-serif;
        font-size: 18px;
        height: 127px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .cat-main--more {
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 200px;
        height: 30px;
        background-color: @color-main-active;
      }
    }
    &:hover {
      .cat-main--content {
        transform: translateY(0);
        .cat-main--content-title {
          padding-bottom: 50px;
        }
      }
    }
  }
}

@media screen and (max-width: 1550px) {
  .cat-main--component {
    .cat-main--module {
      width: 400px;
      height: 200px;
      .cat-main--content {
        .cat-main--content-title {
          font-size: 18px;
        padding-bottom: 15%;
        }
        .cat-main--content-description {
          font-size: 15px;
          height: 92px;
        }
      }
    }
  }
}
</style>
