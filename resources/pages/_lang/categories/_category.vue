<template>
<div class="categories--page">
  <div class="categories--content-tours">

  </div>
  <div class="categories--content-tours">
    <ACategories />
  </div>
</div>
</template>

<script>
import ACategories from '~/components/Aside/Categories'
export default {
  components: {
    ACategories
  }
}
</script>

<style lang="less">

.categories--page {
  margin-top: 80px;
}

</style>
