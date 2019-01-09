<template>
  <g-link
    class="collection-link"
    v-if="collection"
    :to="{ path: collection.path }">
    <span v-if="collection.anonymous">collection privée</span>
    <span v-else>{{ collection.name }}</span>
  </g-link>
</template>

<script>
export default {
  props: {
    collection: Object
  }
};
</script>

<style lang="stylus">
</style>

