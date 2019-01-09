<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <g-link class="brand navbar-item" :to="{ name: 'home' }">John Oliver-Doe</g-link>
        <a
          class="navbar-burger burger"
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <g-link class="navbar-item" :to="{ name: 'art' }">Art</g-link>
          <g-link class="navbar-item" :to="{ name: 'about' }">About</g-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Language</a>
            <div class="navbar-dropdown">
              <a class="navbar-item">French</a>
              <a class="navbar-item">English</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="stylus">
nav.navbar {
  z-index 0

  .navbar-brand .brand {
    font-weight: bold;
  }
}
</style>
