<template>
<div class="ErrorLoad">
  <h2>{{this.$t('ErrorLoad')}}</h2>
  <button @click="method" v-if="method != null">{{ this.$t('Retry') }}</button>
</div>
</template>

<script>
export default {
  props: {
    method: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="less">
.ErrorLoad {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 71.5px auto;
  h2 {
    font-size: 20px;
    color: #D50000;
  }
  button {
    border: none;
    background-color: #569d87;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 24px;
    margin: 10px 0;
    &:hover {
      background-color: #ff6600;
    }
  }
}
</style>
