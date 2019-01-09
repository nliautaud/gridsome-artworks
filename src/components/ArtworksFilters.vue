<template> 
  <div class="artworks-filters is-clearfix">

    <section class="section searchsort-section">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          

          <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control is-expanded">
                    <Treeselect
                      :options="sortOptions"
                      :defaultExpandLevel="0"
                      :clearable="false"
                      :searchable="false"
                      placeholder="Sort-by"
                      v-model="filters.sort"
                      @select="onSortSelect"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column is-narrow">
              <ArtworksViewInput />
          </div>
          <div class="column"></div>
          
          <div class="column is-12-mobile">
            <div class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <a v-if="hasFiltersActive"
                  @click="reset"
                  class="level-item button is-danger is-inverted">
                  Reset filters
                </a>
                <a class="level-item button"
                        @click="areFiltersOpen = !areFiltersOpen"
                        :class="{
                          'is-primary' : !areFiltersOpen && hasFiltersActive,
                          'is-light' : areFiltersOpen
                        }">
                  <span>Rechercher</span>
                  <span class="icon">
                    <i class="fa fa-lg"
                      :class="areFiltersOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <b-collapse :open.sync="areFiltersOpen">
      <section class="section filters-section has-background-light">
        <div class="container">
          <div class="columns is-multiline">

            <div class="column is-12-mobile is-4-tablet is-4-desktop is-3-widescreen">
              <b-field>
                <b-input 
                  v-model="filters.search"
                  @input="onSearch"
                  placeholder="Search..."
                  type="search"
                  icon-pack="fas"
                  icon="search"
                  :class="{'search-active' : filters.search}"
                  />
              </b-field>
              <p class="is-size-7"
                @click.stop="$event.target.nodeName == 'A' ? filters.search = $event.target.innerText : ''"
                >
                Examples : <a>nature morte</a>, <a>chats</a>, <a>abstrait</a>
                </p>
            </div>
            
            <div class="column is-4-tablet is-3-desktop medium">
              <div class="field">
                <div class="control">
                  <Treeselect
                    :options="supportsOptions"
                    :defaultExpandLevel="0"
                    multiple
                    showCount
                    placeholder="Supports"
                    v-model="filters.supports"
                    />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <Treeselect
                    :options="techniquesOptions"
                    :defaultExpandLevel="0"
                    multiple
                    showCount
                    placeholder="Techniques"
                    v-model="filters.techniques"
                    />
                </div>
              </div>
            </div>

            <div class="column is-4-tablet is-3-desktop date">
              <div class="field" :class="{ 'has-addons': filters.from }">
                <div class="control is-expanded">
                  <Datepicker
                    v-model="filters.from"
                    minimum-view="month"
                    :language="datepicker.lang.fr"
                    :disabledDates="disabledDates"
                    inputClass="input"
                    calendarClass="dropdown-content"
                    placeholder="De"
                    format="MMM yyyy"
                  ></Datepicker>
                </div>
                <div class="control" v-if="filters.from">
                  <button class="button is-primary" v-on:click="filters.from = null">
                    <span class="icon is-small">
                      <i class="fa fa-times fa-sm"></i>
                    </span>
                  </button>
                </div>
              </div>
              <div class="field" :class="{ 'has-addons': filters.to }">
                <div class="control is-expanded">
                  <Datepicker
                    v-model="filters.to"
                    minimum-view="month"
                    :language="datepicker.lang.fr"
                    :disabledDates="disabledDates"
                    inputClass="input"
                    calendarClass="dropdown-content"
                    placeholder="À"
                    format="MMM yyyy"
                  ></Datepicker>
                </div>
                <div class="control" v-if="filters.to">
                  <button class="button is-primary" v-on:click="filters.to = null">
                    <span class="icon is-small">
                      <i class="fa fa-times fa-sm"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div class="column is-4-tablet is-3-desktop format">
              <div class="field">
                <div class="control">
                  <Treeselect
                    :options="formatsOptions"
                    placeholder="Formats"
                    v-model="filters.format"
                    class="is-primary"
                    >
                      <div slot="value-label" slot-scope="{ node }">
                        <span class="icon is-medium" v-if="node.raw.labelIcon">
                          <i class="fa-md" :class="node.raw.labelIcon"></i>
                        </span>
                        {{ node.raw.selectedLabel }}
                      </div>
                      <label slot="option-label"
                        slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
                        :class="labelClassName">
                        <span class="icon is-large" v-if="node.raw.labelIcon">
                          <i class="fa-lg" :class="node.raw.labelIcon"></i>
                        </span>
                        {{ node.label }}
                        <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
                      </label>
                  </Treeselect>
                </div>
              </div>
            </div>

            <div class="column is-8-tablet is-3-desktop collectionsale">
              <div class="columns is-mobile is-multiline">
                <div class="column is-12-mobile is-6-tablet is-12-desktop">
                  <div class="control">
                    <Treeselect
                      :options="collectionsOptions2"
                      :defaultExpandLevel="0"
                      placeholder="Collection"
                      v-model="filters.collection"
                      />
                  </div>
                </div>
                <div v-if="filters.collection" class="level">
                  <g-link
                    class="button is-fullwidth is-primary is-outlined"
                    v-if="filters.collection"
                    :to="{
                      path: $static.collections.edges.find(c => c.node.id == filters.collection).node.path
                    }">
                    <span>See the collection</span>
                    <span class="icon">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </g-link>
                </div>
                <div class="column is-12-desktop field">
                  <b-switch v-model="filters.onsale">
                    Disponible à la vente
                  </b-switch>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </b-collapse>

  </div>
</template>

<static-query>
query Query {
  supports: allSupport (perPage: 100000000) {
    edges {
      node {
        id
        title
        path
        parent {
          id
          title
        }
      }
    }
  }
  techniques: allTechnique{
    edges {
      node {
        id
        title
        path
        parent {
          id
          title
        }
      }
    }
  }
  collections: allCollection {
    edges {
      node {
        id
        name
        path
        anonymous
      }
    }
  }
}
</static-query>

<script>
import ArtworksViewInput from '~/components/ArtworksViewInput.vue'
import Datepicker from 'vuejs-datepicker'
import {datepicker_en, datepicker_fr} from 'vuejs-datepicker/dist/locale'

import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    ArtworksViewInput,
    Datepicker,
    Treeselect
  },
  props: {
    filteredArtworks: Array
  },
  data() {
    return {
      areFiltersOpen: false,
      filters: {
        sort: 'new',
        search: null,
        supports: [],
        techniques: [],
        format: null,
        onsale: false,
        from: null,
        to: null,
        collection: null
      },
      userSortSelectedOverSearch: null,
      datepicker : {
        lang: { en: datepicker_en, fr: datepicker_fr }
      }
    }
  },
  computed: {
    hasFiltersActive() {
      return this.filters.sort != 'new'
        || this.filters.search
        || this.filters.supports.length
        || this.filters.techniques.length
        || this.filters.format
        || this.filters.onsale
        || this.filters.from
        || this.filters.to
        || this.filters.collection
    },
    disabledDates() {
      return {
        from: this.filters.to || new Date(),
        to: this.filters.from || null
      }
    },
    supportsOptions() {
      return this.getOptions(this.$static.supports.edges, 'supports')
    },
    techniquesOptions() {
      return this.getOptions(this.$static.techniques.edges, 'techniques')
    },
    formatsOptions() {
      return [
        {
          id: 'portrait',
          label: 'Portrait',
          labelIcon: 'fas fa-portrait',
          selectedLabel: 'Format : portrait'
        },
        {
          id: 'square',
          label: 'Carré',
          labelIcon: 'far fa-square',
          selectedLabel: 'Format : carré'
        },
        {
          id: 'landscape',
          label: 'Paysage',
          labelIcon: 'fas fa-image',
          selectedLabel: 'Format : paysage'
        },
      ]
    },
    collectionsOptions() {
      return this.$static.collections.edges
        .filter(n => !n.node.anonymous)
        .map(n => n.node)
    },
    collectionsOptions2() {
      return this.$static.collections.edges
        .filter(n => !n.node.anonymous)
        .map(n => ({
          id: n.node.id,
          label: n.node.name,
        }))
    },
    sortOptions() {
      let opt = [
        {
          id: 'new',
          label: 'Date : Most recent',
        },
        {
          id: 'old',
          label: 'Date : Oldest',
        },
        {
          id: 'asc',
          label: 'Title : A-Z',
        },
        {
          id: 'dsc',
          label: 'Title : Z-A',
        },
      ]
      if (this.filters.search) opt.unshift({
        id: 'best',
        label: 'Best results',
      })
      return opt
    }
  },
  methods: {
    reset() {
      this.filters.search = ''
      this.filters.sort = 'new'
      this.filters.supports = []
      this.filters.techniques = []
      this.filters.format = null
      this.filters.onsale = false
      this.filters.from = null
      this.filters.to = null
      this.filters.collection = null
    },
    onSearch(value) {
      if (value && !this.userSortSelectedOverSearch) this.filters.sort = 'best'
      if (!value && !this.userSortSelectedOverSearch) this.filters.sort = 'new'
      if (!value && this.userSortSelectedOverSearch) {
        if(this.userSortSelectedOverSearch != 'best')
          this.filters.sort = this.userSortSelectedOverSearch
        this.userSortSelectedOverSearch = null
      }
    },
    onSortSelect(value) {
      if (this.filters.search) this.userSortSelectedOverSearch = value
    },
    getOptions(items, type, parentId) {
      let childs
      if (parentId)
        childs = items.filter(n => n.node.parent.length && n.node.parent[0].id == parentId)
      else childs = items.filter(n => !n.node.parent.length)

      return childs.map(child => {
        let granchilds = this.getOptions(items, type, child.node.id)
        return {
          id: child.node.id,
          label: child.node.title,
          children: granchilds.length ? granchilds : undefined,
          isDisabled: this.filteredArtworks && !this.filteredArtworks.some(a => a[type] && a[type].some(t => t.id == child.node.id))
        }
      })
    }
  },
  watch: {
    filters: {
      handler(value) {
        this.$emit('filter', value)
      },
      deep: true
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/_variables.scss'
.artworks-filters

  .searchsort-section
    padding-bottom: 0

  .filters-section
    margin-top: 2em
    padding-top: 2em
    padding-bottom: 2em
    border: 0 solid $grey-lighter
    border-width: 1px 0

    .search-active input[type="search"]
      border-color: $primary

    .vue-treeselect--single.vue-treeselect--has-value
      &:not(.vue-treeselect--open)
        .vue-treeselect__control
          background: $primary
        .vue-treeselect__single-value,
        .vue-treeselect__x-container:not(:hover),
        .vue-treeselect__control-arrow-container:not(:hover) svg
          color: $primary-invert
      &.vue-treeselect--open
        .vue-treeselect__option--selected
          background: $primary
        .vue-treeselect__option--selected
          color: $primary-invert

    .vue-treeselect--multi.vue-treeselect--has-value
      .vue-treeselect__multi-value-item
        background: $primary
      .vue-treeselect__checkbox--checked
        background: $primary
        border-color: $primary
      .vue-treeselect__multi-value-item:not(:hover) .vue-treeselect__value-remove
      .vue-treeselect__multi-value-label
        color: $primary-invert

  .label
    white-space: nowrap

  .vdp-datepicker__calendar
    position: absolute
    right: 0px

  .format.field
    .checkbox
      flex-flow: column
      height: auto
      .icon
        margin-left: 0
</style>
