import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const { getExample, getExamples, getReadme } = global.__ElementArchive__
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
        id: route.query.id || '0'
      }
    },
    updateExample: () => (state, { id }) => {
      state.query.id = id
    }
  },
  getters: {
    example: state => {
      return getExample(state.query.type, state.query.name, state.query.id)
    },
    examples: state => {
      return getExamples(state.query.type, state.query.name)
    },
    exampleProps: (state, getters) => {
      return getters.example.component.props
    },
    readme: state => {
      if (state.query.type && state.query.name) {
        return getReadme(state.query.type, state.query.name)
      } else {
        return 'Not Found'
      }
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
