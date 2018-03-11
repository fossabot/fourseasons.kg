<template>
<div class="aside--categories" v-if="items != null">
  <div class="aside--categories-module" v-for="(item, i) in items" :key="i" :class="{'active': item.id == 1}">
    <!-- !!!! -->
    <nuxt-link :to="cat_url(item.id)">
      <h3>{{ item.title }}</h3>
    </nuxt-link>
    <ul>
      <li v-for="(tour, j) in item.tours" :key="j">
        <nuxt-link :to="tour_url(tour.id)">{{ tour.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</div>
<PulseLoader v-else-if="this.items == null && isLoadError == false" />
<ErrorLoader v-else :method="Get" />
</template>

<script>
import PulseLoader from '~/components/Loader/Pulse.vue'
import ErrorLoader from '~/components/Loader/Error.vue'
export default {
  data() {
    return {
      items: null,
      isLoadError: false
    }
  },
  methods: {
    cat_url(id) {
      return '/'+ this.$t('lang') + '/categories/' + id
    },
    tour_url(id) {
      return '/'+ this.$t('lang') + '/tours/' + id
    },
    Get() {
      this.isLoadError = false
      this.$axios.get('/api/' + this.$t('lang') + '/categories').then(
        res => {
          if (res.type = 'success')
            this.items = res.data.tour_type
          else if (res.type = 'error')
            this.isLoadError = true
        },
        error => {
          this.isLoadError = true
        })
    }
  },
  created() {
    this.Get()
  },
  components: {
    PulseLoader,
    ErrorLoader
  }
}
</script>

<style lang="less">
.aside--categories {
  .aside--categories-module {
    a {
      h3 {}
    }
    ul {
      li {
        a {}
      }
    }
  }
}
</style>
