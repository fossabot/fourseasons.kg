<template>
  <div class="left-bar">
    <LBUser />
    <LBIcons />
    <div class="list-block">
      <ListBox title="Туры" :items="tours" />
      <ListBox title="Пользователи" :items="users" />
      <ListBox title="Новости" :items="news" />
      <ListBox title="Изображения" :items="images" />
      <ListBox title="Языки" :items="language" />
    </div>
  </div>
</template>

<script>
import ListBox from '~/components/AdminBlocks/ListBox'
import LBUser from '~/components/AdminBlocks/LB-User'
import LBIcons from '~/components/AdminBlocks/LB-Icons'
export default {
  layout: 'admin',
  components: {
    ListBox,
    LBUser,
    LBIcons
  },
  data() {
    return {
      tours: [{
        id: 0,
        text: 'Туры'        
      },{
        id: 1,
        text: 'Типы туров'        
      },{
        id: 2,
        text: 'Бронирование'        
      }],
      users: [{
        id: 0,
        text: 'Пользователи'        
      },{
        id: 1,
        text: 'Группы'        
      }],
       news: [{
        id: 0,
        text: 'Новости'        
      },{
        id: 1,
        text: 'Подписчики'        
      }],
      images:[{
        id: 0,
        text: 'Изображения'
      },{
        id: 1,
        text: 'Альбом'
      }],
      language:[{
        id: 0,
        text: 'Языки'
      }]
    }
  }
}
</script>
<style lang="less">
  .left-bar{
    width: 250px;
    height: 100vh;
    font-family: "Roboto", sans-serif;
    background-color:#37474f; 
    .list-block{
      width: 250px;
      background-color:#37474f; 
      border-top: 2px solid #263238;
      
    }
  }
</style>

