<template>
<div class="Menu" @click="CloseMenu">
  <div class="M-Logo">
    <nuxt-link to="/" class="">
      <IconLogo id="logo-menu" />
    </nuxt-link>
  </div>
  <input id="menu--toogle" type="checkbox" v-model="isShowMenu" />
  <label for="menu--toogle" class="menu--burger">
  <Burger  />
  </label>

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
  <div class="M-Activator dropdown">
      
      <button class="dropbtn"><LanguageIcon />РУССКИЙ</button>
      <div class="dropdown-content">
        <a href="#">English</a>
      </div>
  </div>
</div>
</template>
<script>
import IconLogo from "~/assets/svg/logomenu.svg"
import Burger from "~/assets/svg/burger.svg"
import LanguageIcon from "~/assets/svg/language.svg"

export default {
  data() {
    return {
      isShowMenu: false
    }
  },
  methods: {
    CloseMenu() {
      this.isShowMenu = false;
    }
  },
  components: {
    IconLogo,
    Burger,
    LanguageIcon
  }
}
</script>
<style lang="less">
.v-scroll {
  color: white;
  cursor: pointer;
}

.dropbtn {
  background-color: transparent;
  color: white;
  padding: 15px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  outline: none;
  svg{
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: rgba(86, 157, 135, 1);
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: rgba(86, 157, 135, 1);
}

.Menu * {
  transition: all .5s;
}

.btn-lang {
  color: white;
  background-color: transparent;
  border: none;
}

.dropdown-menu {
  background-color: rgba(86, 157, 135, 1);
  transition: none;
  border: none;
  * {
    color: white;
  }
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
  #menu--toogle,
  .menu--burger {
    display: none;
    cursor: pointer;
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
    margin-right: 10px;
  }
}

@media screen and (max-width: 749px) {
  .dropbtn {
  padding: 12.5px;
  font-size: 15px;
  svg{
    width: 25px;
    height: 25px;

  }
}
  .Menu {
    height: 50px;
    .M-Logo {
      display: none;
    }
    .M-List {
      visibility: hidden;
      opacity: 0;
      width: 100%;
      z-index: 9999;
      position: fixed;
      top: -20px;
      bottom: 0;
      left: 0;
      right: -20px;
      background-color: rgba(86, 157, 135, .9);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      nav {
        ul {
          flex-direction: column;
          align-items: center;
          li {
            margin: 10px 0;
            font-size: 24px;
            * {
              display: flex;
              font-size: 24px;
              flex-direction: column;
            }
          }
        }
      }
    }
    .menu--burger {
      display: block;
      z-index: 99999;
      position: fixed;
      margin-left: 10px;
      top: 5px;
      height: 40px;
      width: 40px;
    }
    .M-Activator {
      z-index: 99999;
      position: fixed;
      top: 0;
      right: 0;
    }
    #menu--toogle {
      &:checked~.M-List {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>



