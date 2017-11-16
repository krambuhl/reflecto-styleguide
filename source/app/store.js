import Vue from 'vue'
import Vuex from 'vuex'
import { getModule, getModules } from 'reflecto-archive'

Vue.use(Vuex)

const { examples, readmes, schema } = global.__ElementArchive__
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    route: { },
    query: { }
  },
  mutations: {
    updateRoute: (state, { route }) => {
      state.route = route
      state.query = {
        type: route.query.type,
        name: route.query.name,
        id: route.query.id
      }
    }
  },
  getters: {
    example (state, { exampleId: id }) {
      const { type, name } = state.query
      const module = getModule(examples, { type, name, id })

      if (module) {
        return module.example
      }

      return null
    },
    examples (state) {
      const { type, name } = state.query
      return getModules(examples, { type, name })
        .reduce((all, def) => {
          all.push(def.example)
          return all
        }, [])
    },
    exampleId (state, getters) {
      const { id } = state.query
      return id || '0'
    },
    exampleProps (state, getters) {
      if (getters.example) {
        return getters.example.props ||
          getters.example.component.props
      }

      return { }
    },
    rawReadme (state) {
      const { type, name } = state.query

      if (type && name) {
        const def = getModule(readmes, { type, name })
        if (def) return def.module
      }

      return ''
    },
    readme (state, getters) {
      return getters.rawReadme
        .replace(/{{(\w+\.\w+)}}/g, '<div data-var="$1"></div>')
        .replace(/{{(\w+-\w+)}}/g, '<div data-var="$1"></div>')
    },
    rawSchema (state) {
      return schema
    }
  },
  strict: debug,
  plugins: debug ? [store => console.log(store)] : []
})
