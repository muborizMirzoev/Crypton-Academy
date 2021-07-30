// state
export const state = () => ({
  people: [],
  favorites: []
})

// getters
export const getters = {
  favorites: s => s.favorites,
}

export const mutations = {
  SET_PEOPLE (state, people) {
    state.people = people
  },
  SET_FAVORITE (state, favorites) {
    state.favorites = favorites
  },
}

export const actions = {
  fetchPeople ({ commit }) {
    const people = this.$axios.$get('')
    console.log('people', people)

    commit('SET_PEOPLE', people)
  },
  setFavorite ({ commit }, favorite) {
    console.log('favorite', favorite)
    commit('SET_FAVORITE', favorite)
  }
}
