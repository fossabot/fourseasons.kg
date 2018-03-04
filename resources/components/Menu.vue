<template>
<div class="Menu">
  <div class="M-Back"></div>
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
        <li>
          <nuxt-link to="/contacts" class="">КОНТАКТЫ</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
  <div class="M-Activator">
    <v-select class="toggle-lang" :options="[{label: 'foo', value: 'Foo'}]"></v-select>
  </div>

</div>
</template>
<script>
import IconLogo from "~/assets/svg/logomenu.svg"

export default {
  components: {
    IconLogo
  }
}
</script>
<style lang="less">
.Menu {
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  .M-Back {
    width: 100%;
    background-color: #569D87;
    height: 60px;
    z-index: -1;
    opacity: 0.8;
    position: fixed
  }
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
          color: black;
        }
      }
    }
  }
  .M-Activator {
    margin-right: 20px;
    .toggle-lang {
      .dropdown-toggle {
        border: none;
      }
    }
  }
}

.nuxt-link-exact-active {
  color: red !important;
}
</style>



