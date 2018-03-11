<template>
<div style="margin-top: 80px; display: flex; flex-direction: column;">
  <button @click="Send">Click Button</button>
  <code width="100%">
     {{ response }}
   </code>
</div>
</template>

<script>
export default {
  data() {
    return {
      response: ['Click Button']
    }
  },
  methods: {
    async Send() {
      await this.$axios.get('/api/ru/' +'', {
        name: 'Abrakadabre',
        email: 'test@user.ru',
        password: '1234567',
        password_confirmation: '1234567'
      }).then((res) => {
        this.response = res
      }).catch((err) => {
        
      })
    }
  }
}
</script>
