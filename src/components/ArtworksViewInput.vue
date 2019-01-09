<template>
  <div class="field">
    <b-field>
      <b-radio-button v-model="view"
          native-value="default"
          type="is-grey">
          <span class="icon">
            <i class="fas fa-th-large"></i>
          </span>
      </b-radio-button>

      <b-radio-button v-model="view"
          native-value="image"
          type="is-grey">
          <span class="icon">
            <i class="fas fa-th"></i>
          </span>
      </b-radio-button>

      <b-radio-button v-model="view"
          native-value="row"
          type="is-grey">
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
  data() {
    return {
      view: 'default'
    }
  },
  watch: {
    view(val) {
      this.$emit('update:view', val)
    }
  }
}
</script>

<style scoped lang="stylus">
.icon 
  margin 0 !important
</style>
