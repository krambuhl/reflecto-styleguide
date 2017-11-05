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
      if (getters.example) {
        return getters.example.component.props
      }

      return { }
    },
    rawReadme: state => {
      if (state.query.type && state.query.name) {
        return getReadme(state.query.type, state.query.name)
      } else {
        return 'Not Found'
      }
    },
    readme: (state, getters) => {
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
