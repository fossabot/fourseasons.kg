<template>
<div>
  <section class="first-s">
    <div class="mainlogo">
      <MainLogo />
    </div>
    <NameLogo width="30%" />
    <div class="main-text">

    </div>
  </section>
  <News />
</div>
</template>

<script>
import MainLogo from "~/assets/svg/mainlogo.svg"
import NameLogo from "~/assets/svg/namelogo.svg"

import News from '~/components/Blocks/News'

export default {
  components: {
    MainLogo,
    NameLogo,
    News
  }
}
</script>

<style lang="less">
.first-s {
  display: flex;
  flex-direction: columm;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url('~static/3.png');
  background-size: cover;
  .mainlogo {
    margin-top: 100px;
    width: 120px;
    height: 120px;
  }
}
</style>