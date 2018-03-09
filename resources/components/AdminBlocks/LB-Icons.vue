<template>
<div class="icons-block">
  <nuxt-link to="#"><IconSettings /></nuxt-link>
  <nuxt-link to="#"><IconNotification /></nuxt-link>
  <nuxt-link to="#"><IconMail /></nuxt-link>
  <nuxt-link to="#"><IconExit /></nuxt-link>
</div>
</template>
<script>
import IconSettings from "~/assets/svg/iconsettings.svg"
import IconMail from "~/assets/svg/iconmail.svg"
import IconExit from "~/assets/svg/iconexit.svg"
import IconNotification from "~/assets/svg/iconnotifications.svg"

export default {
  components: {
    IconSettings,
    IconMail,
    IconExit,
    IconNotification
  }
}
</script>
<style lang="less">
.icons-block {
  width: 250px;
  height: 50px;
  background-color: #37474f;
  border-top: 2px solid #263238;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
