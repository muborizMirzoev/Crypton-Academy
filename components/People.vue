<template>
  <div>
    <PeopleCards
      :people="people.results"
      :loading="loading"
    />

    <div class='pagination'>
      <el-pagination
        background
        layout='prev, pager, next'
        :page-size='10'
        :total='people.count'
        :pager-count="5"
        @current-change='changePag'
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'People',
  data() {
    return {
      people: {
        results: [],
      },
      loading: false,
    };
  },
  async mounted() {
    // fetch planets
    await this.$store.dispatch('main/fetchPlanets');

    await this.changePag();
  },
  methods: {
    async changePag(page = 1) {
      this.loading = false;
      this.people = await this.$axios.$get(`https://swapi.dev/api/people/?page=${page}`);

      this.people.results = this.people.results.map((p) => {
        const planet = this.$store.getters['main/planets'].find(plan => plan.url === p.homeworld);
        const [_, id] = p.url.match(/people\/(\d+)\//);

        return {
          ...p,
          homeworld: (planet && planet.name) || 'Unknow',
          img: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
        };
      })
      this.loading = true;
    },
  },
};
</script>

<style scoped>


.pagination {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

.main-page,
.favorites-page {
  color: white;
  font-size: 20px;
  padding-right: 20px;
}

.active {
  color: #409eff;
}

.main-page:hover,
.favorites-page:hover {
  color: #409eff;
}

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  color: #fff;
}
</style>
