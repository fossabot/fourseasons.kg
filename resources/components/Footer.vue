<template>
<div class="footer--component">
  <div class="footer--top">
    <NameLogo class="footer--icon-logo" />
  </div>
  <div class="footer--center">
    <div class="footer--contacts" id="Contacts">
      <h3>Контакты</h3>
      <a href="https://goo.gl/maps/eTTwaUSRK8R2" class="footer--contacts-item">
        <IconMap class="footer--icon-map" />
        <span>
          <p>Кыргызская Республика,
          720041 г. Бишкек пр. Чуй 92</p>
        </span>
      </a>
      <a href="mailto:office@fourseason.kg" class="footer--contacts-item">
        <IconPost class="footer--icon-message" />
        <span><p>office@fourseason.kg</p></span>
      </a>
      <a href="tel:+996 000 00-00-00" class="footer--contacts-item">
        <IconPhone class="footer--icon-phone" />
        <span><p>+996 000 00-00-00</p></span>
      </a>
    </div>
    <div class="footer--social">
      <h3>Присоединяйтесь</h3>
      <div class="footer--social-item">
        <a href="https://vk.com" target="_blank">
          <IconVk class="footer--icon-vk" />
        </a>
        <a href="https://facebook.com" target="_blank">
          <IconFaceBook class="footer--icon-fb" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <IconInstagram class="footer--icon-inst" />
        </a>
      </div>
    </div>
    <div class="footer--subscribe">
      <h3>Подпишитесь на рассылку новостей</h3>
      <form class="footer--subscribe-item">
        <input type="email" placeholder="Ваш Email">
        <button>Подписаться</button>
      </form>
    </div>
  </div>
  <div class="footer--bottom">
    <div class="footer--bottom-item">
      <div class="footer--bottom-item-logo">
        <span>
          <NameLogo class="footer--icon-logo2" />
          <p>Все права защищены © 2018</p>
        </span>
      </div>
    </div>
    <div v-scroll-to="'#Top'" class="footer--bottom-item">
      <IconDown class="footer--icon-up" />
    </div>

    <a class="footer--bottom-item fys" href='http://fys.kg/referral_site/fourseasons.kg' target="_blank">
      <h3 class="fys-created">Сайт разработан</h3>
      <div>
        <IconFys class="footer--icon-fys" />
        <span>
       <h3>Studios</h3>
        <p> Мы создаем будущее</p>
      </span>
      </div>
    </a>
  </div>
</div>
</template>
<script>
import NameLogo from "~/assets/svg/namelogof.svg"
import IconMap from "~/assets/svg/map.svg"
import IconPost from "~/assets/svg/iconpost.svg"
import IconPhone from "~/assets/svg/iconphone.svg"
import IconVk from "~/assets/svg/vk.svg"
import IconFaceBook from "~/assets/svg/facebook.svg"
import IconInstagram from "~/assets/svg/Instagram.svg"
import IconDown from "~/assets/svg/icondown.svg"
import IconFys from "~/assets/svg/fys.svg"

export default {
  components: {
    NameLogo,
    IconMap,
    IconPost,
    IconPhone,
    IconVk,
    IconFaceBook,
    IconInstagram,
    IconDown,
    IconFys

  }
}
</script>

<style lang="less">
@color-main-active : #ff6600;
[class^="footer--icon-"] {
  fill: white;
  height: 30px;
  width: 30px;
}

.footer--icon-logo {
  width: 100%;
  height: 80px;
}

.footer--icon-vk,
.footer--icon-fb,
.footer--icon-inst {
  width: 50px;
  height: 50px;
  &:hover {
    transform: scale(1.1, 1.1);
    fill: #ffdc4f;
  }
}

.footer--icon-logo2 {
  width: 250px;
  height: 42px;
}

.footer--icon-up {
  width: 50px;
  height: 80px;
  transform: rotate(180deg);
  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1) rotate(180deg);
  }
}

.footer--icon-fys {
  width: 90px;
  height: 90px;
}

.footer--component {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  color: white;
  background-color: #493928;
  transition: all .5s;
  * {
    font-family: "Roboto", sans-serif;
    transition: all .5s;
  }
  .footer--top {
    margin: 10px 0;
  }
  .footer--center {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .footer--contacts {
      width: 100%;
      .footer--contacts-item {
        display: flex;
        align-items: center;
        margin: 15px 0;
        text-decoration: none;
        color: white;
        span {
          max-width: 350px;
          margin-left: 10px;
          white-space: pre-line;
          align-items: center;
          align-content: center;
          display: flex;
          p {
            font-size: 18px;
          }
        }
      }
    }
    .footer--social {
      * {
        transition: all 0s;
        transition: transform .3s;
      }
      width: 100%;
      h3 {
        text-align: center;
      }
      .footer--social-item {
        display: flex;
        justify-content: center;
      }
    }
    .footer--subscribe {
      width: 100%;
      .footer--subscribe-item {
        display: flex;
        input {
          height: 60px;
          width: 70%;
          border-radius: 10px 0 0 10px;
          border: none;
          padding-left: 15px;
          font-size: 24px;
          &:active,
          &:hover,
          &:focus {
            outline: 0;
            outline-offset: 0;
          }
          &::placeholder {
            color: @color-main-active;
          }
        }
        button {
          width: 30%;
          min-width: 120px;
          border-radius: 0 10px 10px 0;
          border: none;
          color: white;
          background-color: @color-main-active;
        }
      }
    }
  }
  .footer--bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-top: 10px;
    .footer--bottom-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.fys {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        color: white;
        h3 {
          font-size: 12px;
          margin: 0 5px;
        }
        div {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          span {
            h3 {
              font-size: 33px;
              font-family: "Arial", sans-serif;
              font-weight: bold;
            }
            p {
              font-size: 10px;
              text-align: center;
            }
          }
        }
        &:hover {
          color: white;
          svg {
            transform: scale(1.05, 1.05)
          }
        }
      }
      .footer--bottom-item-logo {
        width: 100%;
        span {
          max-width: 250px;
          padding: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          p {
            padding: 5px 0;
          }
        }
      }
      p {
        padding: 5px 0;
      }
    }
  }
}

@media screen and (max-width: 1130px) {
  .footer--component {
    .footer--top {}
    .footer--center {
      flex-wrap: wrap;
      justify-content: center;
      h3 {
        text-align: center;
        margin-top: 20px;
      }
      .footer--contacts {
        width: 300px;
        .footer--contacts-item {
          span {
            p {}
          }
        }
      }
      .footer--social {
        width: 300px;
      }
      .footer--subscribe {}
    }
    .footer--bottom {}
  }
}

@media screen and (max-width: 960px) {
  .footer--component {
    .footer--bottom {
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .footer--bottom-item {
        .footer--bottom-item-logo {
          display: flex;
          justify-content: center;
        }
        &.fys {
          justify-content: center;
          flex-direction: column;
          .fys-created {
            font-size: 24px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .footer--component {
    .footer--center {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h3 {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
