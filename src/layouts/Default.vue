<template>
  <div class="layout">

    <Navbar/>

    <div class="hero" v-if="this.$slots.hero">
      <div class="hero-body">
        <div class="container">
          <slot name="hero"/>
        </div>
      </div>
    </div>

    <div class="layout-content">
      <slot/>
    </div>

    <footer class="footer has-background-light">
      <div class="content has-text-centered has-text-grey">
        
        <slot name="foot" />

        <p>
          JOD {{ new Date().getFullYear() }}
        </p>
      </div>
    </footer>

  </div>
</template>
<script>
import Navbar from "~/components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>


<style lang="sass">
@import '~/assets/_variables.scss'

.has-background-dark,
.has-background-grey-dark,
.has-background-grey-darker
  .title
    color: $light
</style>
