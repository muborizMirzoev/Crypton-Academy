// state
export const state = () => ({
  planets: [],
})

// getters
export const getters = {
  planets: s => s.planets,
}

export const mutations = {
  SET_PLANETS (state, planets) {
    state.planets = planets
  },
}

export const actions = {
  async fetchPlanets ({ commit }) {
    const planets = []

    for (let i = 1; i <= 6; i++) {
      const { results } = await this.$axios.$get(`https://swapi.dev/api/planets/?page=${i}`);
      planets.push(...results);
    }
  
    commit('SET_PLANETS', planets)
  },
}
