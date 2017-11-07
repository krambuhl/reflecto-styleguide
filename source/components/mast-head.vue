<template>
  <div class="mast-head">
    <Wrapper variant="medium">
      <div class="logo">
        <h1>Reflecto</h1>
      </div>

      <nav class="nav" v-on-clickaway="deselect">
        <div
          v-for="(section, i) in schema"
          class="section"
          :class="{ 'is-active': i === selectedIndex }"
          @blur="deselect"
        >
          <button
            class="section__toggle"
            @click="toggle(i)"
          >
            {{section.title}}
          </button>

          <div
            class="section__content"
            :style="getSectionStyles(section)"
            @click="selectLink($event)"
          >
            <div>
              <ul class="list">
                <li v-for="file in section.files">
                  <router-link :to="file.href">{{file.text}}</router-link>
                </li>
              </ul>
            </div>

            <div v-if="section.groups" v-for="group in section.groups">
              <strong v-if="group.title" class="list-header">{{group.title}}</strong>
              <ul class="list">
                <li v-for="file in group.files">
                  <router-link :to="file.href">{{file.text}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import Padding from '@tags/Padding'
import Wrapper from '@tags/Wrapper'

const { createDemoLink } = global.__ElementArchive__

export default {
  name: 'mast-head',
  components: {
    Padding,
    Wrapper
  },
  mixins: [clickaway],
  data () {
    return {
      selectedIndex: -1
    }
  },
  methods: {
    getSectionStyles (section) {
      return {
        maxWidth: `${this.getSectionWidthMultiplier(section) * 10}em`
      }
    },
    getSectionWidthMultiplier (section) {
      let count = 0

      if (section.files) {
        count += section.files.length
      }

      if (section.groups) {
        section.groups.forEach(group => {
          count += group.files.length
        })
      }

      if (count > 16) return 3
      if (count > 8) return 2
      return 1
    },
    getFileLink (key) {
      const [type, name] = key.split('/')
      return createDemoLink(type, name, '0')
    },
    getName (key) {
      return key.split('/')[1]
    },
    toggle (index) {
      this.selectedIndex = this.selectedIndex === index ? -1 : index
    },
    deselect () {
      this.selectedIndex = -1
    },
    selectLink (ev) {
      if (ev.target.tagName === 'A') {
        this.selectedIndex = -1
      }
    }
  },
  computed: {
    ...mapGetters(['rawSchema']),
    schema () {
      const getFileData = key => ({
        href: this.getFileLink(key),
        text: this.getName(key)
      })

      return this.rawSchema.map(section => {
        if (section.files) {
          section.files = Object.keys(section.files).map(getFileData)
        }

        if (section.groups) {
          section.groups = section.groups
            .map(group => {
              return Object.assign({}, group, {
                files: Object.keys(group.files).map(getFileData)
              })
            })
            .filter(group => group)
        }

        return section
      })
    }
  }
}
</script>

<style scoped>
.mast-head {
  border-bottom: 2px solid var(--color-light);
  padding: 1em var(--padding);
}

.wrapper {
  display: flex;
  justify-items: center;
  justify-content: space-between;
  margin: auto;
}

.nav {
  display: flex;
}

.section {
  position: relative;

  & + * {
    margin-left: 2px;
  }

  &.is-active {
    & .section__toggle {
      background-color: var(--color-purple);
      border-color: var(--color-purple);
      color: white;
    }

    & .section__content {
      display: block;
    }
  }
}

.section__toggle {
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-medium-dark);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.3em 0.75em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    border-color: var(--color-purple);
    color: var(--color-purple);
  }
}

.section__content {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  margin-top: 0.5em;
  width: 100vw;
  max-width: 10em;
  background-color: #fff;
  border: 2px solid var(--color-light);
  border-radius: 4px;
  padding: 1em 1em 0.25em 1em;
  box-shadow: color(black alpha(20%)) 0 0.5em 2em;
  columns: 3 8em;
  font-size: 0.9em;

  display: none;

  & > * {
    break-inside: avoid;
  }
}

.list {
  & li {
    margin-bottom: 0.75em;
  }

  & a {
    display: block;
    color: var(--color-dark);
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}

.list-header {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25em;
}

</style>
