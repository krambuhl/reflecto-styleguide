import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const { getExample, getExamples, getReadme, getSchema } = global.__ElementArchive__
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
    example (state, getters) {
      return getExample(state.query.type, state.query.name, getters.exampleId)
    },
    examples (state) {
      return getExamples(state.query.type, state.query.name)
    },
    exampleId (state, getters) {
      if (state.query.id) {
        return state.query.id
      }

      return getters.defaultExampleId
    },
    defaultExampleId (state, getters) {
      const key = Object.keys(getters.examples)[0]

      if (key) {
        return key.substr(key.lastIndexOf('/') + 1)
      }

      return '0'
    },
    exampleProps (state, getters) {
      if (getters.example) {
        return getters.example.component.props
      }

      return { }
    },
    rawReadme (state) {
      if (state.query.type && state.query.name) {
        return getReadme(state.query.type, state.query.name)
      } else {
        return 'Not Found'
      }
    },
    readme (state, getters) {
      return getters.rawReadme
        .replace(/{{(\w+\.\w+)}}/g, '<div data-var="$1"></div>')
        .replace(/{{(\w+-\w+)}}/g, '<div data-var="$1"></div>')
    },
    rawSchema (state) {
      return getSchema()
    }
  },
  strict: debug,
  plugins: debug ? [store => console.log(store)] : []
})
