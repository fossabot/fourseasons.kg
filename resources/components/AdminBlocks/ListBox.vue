<template>
<div class="listbox-items">
  <h2>{{title}}</h2>
  <ul id="example-1">
    <li v-for="(item, index) in items" :key="index">
      <nuxt-link to="#">{{ item.text }}</nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['title', 'items']
}
</script>
<style lang="less">
.listbox-items {
  padding-left: 20px;
   h2 {
    margin-top: 15px;
    margin-bottom: 5px;
    color: rgb(0, 253, 173)
  }
  #example-1 {
    margin-left: 10px;
    a{
      text-decoration: none;
      color:#cfd8dc;
      &:hover{
        color:white;
      }
    }
  }
}
</style>
