<template>
  <div class="field">
    <b-field>
      <b-radio-button v-model="view"
          native-value="default"
          type="is-dark">
          <span class="icon">
            <i class="fas fa-th-large"></i>
          </span>
      </b-radio-button>

      <b-radio-button v-model="view"
          native-value="image"
          type="is-dark">
          <span class="icon">
            <i class="fas fa-th"></i>
          </span>
      </b-radio-button>

      <b-radio-button v-model="view"
          native-value="row"
          type="is-dark">
          <span class="icon">
            <i class="fas fa-th-list"></i>
          </span>
      </b-radio-button>
    </b-field>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect
  },
  computed: {
    view: {
      get () {
        return this.$store.state.layout
      },
      set (value) {
        this.$store.commit('layout', value)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.icon 
  margin 0 !important
</style>
