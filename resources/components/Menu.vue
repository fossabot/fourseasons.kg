<template>
<div class="Menu">
  <div class="M-Logo">
    <nuxt-link to="/" class="">
      <IconLogo id="logo-menu" />
    </nuxt-link>
  </div>
  <div class="M-List">
    <nav>
      <ul>
        <li>
          <nuxt-link to="/" class="">ГЛАВНАЯ</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tours/" class="">ТУРЫ</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/news/" class="">НОВОСТИ</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about/" class="">О НАС</nuxt-link>
        </li>
        <li v-scroll-to="'#Contacts, 80px'" class="v-scroll">
         КОНТАКТЫ
        </li>
      </ul>
    </nav>
  </div>
  <div class="M-Activator">
    <b-dropdown id="ddown-left" text="Left align" variant="primary" class="m-2">
      <b-dropdown-item href="#">Action</b-dropdown-item>
      <b-dropdown-item href="#">Another action</b-dropdown-item>
      <b-dropdown-item href="#">Something else here</b-dropdown-item>
    </b-dropdown>
  </div>
</div>
</template>
<script>
import IconLogo from "~/assets/svg/logomenu.svg"
import Burger from "~/assets/svg/burger.svg"

export default {

  components: {
    IconLogo,
    Burger
  }
}
</script>
<style lang="less">
.v-scroll {
  color: white;
  cursor: pointer;
}
.Menu {
  z-index: 99;
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(86, 157, 135, .8);
  top: 0;
  .M-Logo {
    margin-left: 20px;
    width: 50px;
    height: 50px;
    #logo-menu * {
      fill: white;
    }
  }
  .M-List {
    width: 430px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0;
      li {
        list-style: none;
        float: left;
        a {
          text-decoration: none;
          color: white; // display: flex;
          // justify-content: center;
        }
        .nuxt-link-exact-active::after {
          width: 80%;
          height: 2px;
          content: '';
          background-color: white;
          display: block;
          margin: 0 10%;
          margin-top: 5px;
        }
      }
    }
  }
  .M-Activator {
    margin-right: 20px;
  }
}

@media screen and (max-width: 749px) {
  .Menu {
    display: none;
  }
}
</style>



