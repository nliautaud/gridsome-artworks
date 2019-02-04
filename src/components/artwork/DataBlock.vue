<template>
  <div class="data" :class="{'single-line': singleLine}">
    <table class="table is-fullwidth no-border">
      <tr class="title-row" v-if="!without.title">
        <th>Title</th>
        <td colspan="3">
          {{ artwork.title }}
        </td>
      </tr>
      <tr class="date-row" v-if="!without.date">
        <th>Date</th>
        <td colspan="3">
          {{ date }}
        </td>
      </tr>
      <tr class="author-row" v-if="!without.author">
        <th>Author</th>
        <td colspan="3">
          John Oliver-Doe
        </td>
      </tr>
      <tr class="dimensions-row" v-if="!without.dimensions">
        <th>Width</th>
        <td>{{ artwork.width }} cm</td>
        <th>Height</th>
        <td>{{ artwork.height }} cm</td>
      </tr>
      <tr class="techniques-row" v-if="!without.techniques">
        <th>Technique</th>
        <td colspan="3">
          <div v-if="artwork.techniques.length">
            <g-link
              v-for="technique in artwork.techniques"
              v-bind:key="technique.id"
              :to="technique.path"
            >{{ technique.title }}</g-link>
          </div>
          <div v-else>-</div>
        </td>
      </tr>
      <tr class="supports-row" v-if="!without.supports">
        <th>Support</th>
        <td colspan="3">
          <div v-if="artwork.supports.length">
            <g-link
              v-for="support in artwork.supports"
              v-bind:key="support.id"
              :to="support.path"
            >{{ support.title }}</g-link>
          </div>
          <div v-else>-</div>
        </td>
      </tr>
      <!-- <tr class="tags-row" v-if="!without.tags">
        <th>Tags</th>
        <td colspan="3">
          <div v-if="artwork.tags.length" class="tags">
            <g-link
              class="tag"
              v-for="tag in artwork.tags"
              v-bind:key="tag.id"
              :to="tag.path"
            >{{ tag.title }} ({{ tag.artworks.length }})</g-link>
          </div>
          <div v-else>-</div>
        </td>
      </tr> -->
      <tr class="collection-row" v-if="!without.collection">
        <th>Collection</th>
        <td colspan="3">
          <CollectionLink v-if="artwork.collection" :collection="artwork.collection" />
          <span v-else>-</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CollectionLink from "~/components/CollectionLink"
export default {
  components: {
    CollectionLink
  },
  props: {
    artwork: Object,
    without: {
      default: () => ({}),
      type: Object
    },
    singleLine: Boolean
  },
  computed: {
    date() {
      return new Date(this.artwork.date).toLocaleDateString('en-EN', {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: undefined
      })
    }
  }
};
</script>

<style lang="sass">
.data
  table
    background: none
    table-layout: fixed
  tr
    max-width: 100%
  th
    padding-left: 0

  tr:last-child
    td, th
      border: none

  &.single-line
    th, td, .tags
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .tags
      display: block
</style>