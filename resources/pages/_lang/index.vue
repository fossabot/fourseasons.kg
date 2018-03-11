<template>
<div>
  <section class="first-s">
    <div class="mainlogo">
      <MainLogo />
    </div>
    <div class="namelogo">
      <NameLogo />
    </div>
    <div class="main-text">
      <span>{{$t('Title')}}</span>
      <IconDown v-scroll-to="'#Categories, 80px'" class="icon--down" />
    </div>
  </section>
  <Categories id="Categories" :title="$t('ToursKG')" />
  <News :title="$t('LastNews')" />
</div>
</template>

<script>
import MainLogo from "~/assets/svg/mainlogo.svg"
import NameLogo from "~/assets/svg/namelogo.svg"
import IconDown from "~/assets/svg/icondown.svg"

import News from '~/components/Blocks/News'
import Categories from '~/components/Blocks/Categories'

export default {
  layout: 'main',
  components: {
    MainLogo,
    NameLogo,
    IconDown,
    News,
    Categories
  }
}
</script>


<style lang="less">
.icon--down {
  transition: all .5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
  }
}

.first-s {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('~static/3.jpg');
  background-size: cover;
  background-position-x: center;
  background-position-y: bottom;
  .mainlogo {
    margin-top: 150px;
    width: 120px;
    height: 120px;
  }
  .namelogo {
    margin-top: 15px;
    width: 306px;
    height: 51px;
  }
  .main-text {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 200px;
    margin-top: 3%;
    background-color: rgba(86, 157, 135, .5);
    svg {
      width: 48px;
      height: 30px;
      margin: 20px 0;
    }
    span {
      margin-top: 20px;
      color: white;
      margin: 0;
      font-family: "Roboto", sans-serif;
      font-size: 45px;
      max-width: 490px;
      text-align: center;
    }
  }
}

@media screen and (max-width: 1440px) and (min-width: 750px) {
  .first-s {
    .mainlogo {
      margin-top: 120px;
      width: 80px;
      height: 80px;
    }
    .namelogo {
      margin-top: 15px;
      width: 206px;
    }
    .main-text {
      height: 140px;
      span {
        font-size: 36px;
        margin-top: 10px;
      }
      svg {
        width: 40px;
      }
      .M-Back2 {
        height: 140px;
      }
      .f-h1 {
        margin: 0;
      }
    }
  }
}

@media screen and (max-width: 749px) {
  .first-s {
    .mainlogo {
      margin-top: 120px;
      width: 80px;
      height: 80px;
    }
    .namelogo {
      margin-top: 15px;
      width: 206px;
    }
    .main-text {
      height: 140px;
      margin-top: 30px;
      span {
        font-size: 24px;
      }
      svg {
        display: none;
      }
      h1 {
        font-size: 1.7rem;
      }
    }
  }
}

@media screen and (max-height: 480px) and (max-width: 900px) {
  .first-s {
    .mainlogo {
      margin-top: 120px;
      width: 80px;
      height: 80px;
    }
    .namelogo {
      margin-top: 15px;
      width: 206px;
    }
    .main-text {
      height: 140px;
      margin-top: 30px;
      span {
        font-size: 24px;
      }
      svg {
        display: none;
      }
      h1 {
        font-size: 1.7rem;
      }
    }
  }
}
</style>