<template>
  <div class="salebox box" v-if="artwork.onsale">
    <div class="content is-mobile">
      <p>
        This artwork is available for sale.
      </p>
      <p v-if="artwork.collection && !artwork.collection.anonymous">
        This artwork is currently in
        <span v-if="artwork.collection.anonymous"> a <g-link :to="{ path: artwork.collection.path }">private collection</g-link></span>
        <span v-else> the <g-link :to="{ path: artwork.collection.path }">{{ artwork.collection.name }}</g-link></span>
        .
      </p>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-medium">
            <i class="fas fa-shopping-cart fa-md"></i>
          </span>
          <span class="price">{{ artwork.price }} €</span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <g-link v-if="artwork.collection && !artwork.collection.anonymous" :to="{path:''}" class="button">Contact the owner</g-link>
          <g-link v-else :to="{path:''}" class="button">Contact the artist</g-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artwork: Object
  }
};
</script>

<style lang="stylus">
.sale {
  border: 1px solid #ccc;
  border-width: 1px 0;
}
</style>

