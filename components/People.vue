<template>
  <div class='wrapper'>
    <el-row>
      <el-col :span='20' :offset='1' style='margin-top: 30px'>
        <NuxtLink exact active-class="active" class='main-page' to='/'>Main page</NuxtLink>
        <NuxtLink exact active-class="active" class='favorites-page' to='/favourite'>Favorites page</NuxtLink >
      </el-col>
    </el-row>

    <el-row type='flex' justify='space-between' style='flex-wrap: wrap'>
      <el-col
        :xs='24'
        :sm='24'
        :md='14'
        :lg='15'
        :xl='15'
        style='margin-bottom: 20px'
      >
        <el-input
          v-model='searchText'
          placeholder='input Name'
          prefix-icon='el-icon-search'
        />
      </el-col>
      <el-col :xs='24' :sm='14' :md='8' :lg='7' :xl='5'>
        <div class='filter'>
          <el-radio v-model='gender' border label='' size='small'>All</el-radio>
          <el-radio v-model='gender' border label='male' size='small'>Male</el-radio>
          <el-radio v-model='gender' border label='female' size='small'>Female</el-radio>
        </div>
      </el-col>
    </el-row>

    <section class='cards'>
      <div v-if='loading' class='section__wrapper'>
        <div
          class='cards__item'
          v-for='(person, index) in currentPeople'
          :key='index'
        >
          <div class='card__item-img'>
            <img :src='person.img' class='image' />
            <el-button
              @click='toggleFavorite(person)'
              type='primary'
              :icon="`el-icon-star-${person.isFavorite ? 'on' : 'off'}`"
              circle
            />
          </div>
          <div class='cards__item-info'>
            <p class='cards__item-name'>Name: {{ person.name }}</p>
            <p class='cards__item-birth_year'>
              Birth Year: {{ person.birth_year }}
            </p>
            <p class='cards__item-height'>Height: {{ person.height }}</p>
            <p class='cards__item-mass'>Mass: {{ person.mass }}</p>
            <p class='cards__item-homeworld'>
              Homeworld: {{ person.homeworld }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class='loader'>
        <i class='el-icon-loading' />
      </div>
    </section>

    <div class='pagination'>
      <el-pagination
        background
        layout='prev, pager, next'
        :page-size='10'
        :total='people.count'
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
      favourites: [],
      searchText: '',
      gender: '', // all
      loading: false,
    };
  },


  computed: {
    planets() {
      return this.$store.getters['main/planets'];
    },

    currentPeople() {
      return this.people.results
        .filter((person) => {
          const regex = new RegExp(this.searchText, 'gi');
          return (
            (person.name.match(regex) && !this.gender) ||
            person.gender === this.gender
          );
        })
        .map((p) => {
          const planet = this.planets.find(
            (planet) => planet.url === p.homeworld
          );
          const [_, id] = p.url.match(/people\/(\d+)\//);

          return {
            ...p,
            isFavorite: this.favourites.some((f) => f.url === p.url),
            homeworld: (planet && planet.name) || 'Unknow',
            img: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
          };
        });
    },
  },

  async mounted() {
    const locFav = localStorage.getItem('favorites');
    this.favourites = JSON.parse(locFav) || [];

    await this.changePag();
    // fetch planets
    await this.$store.dispatch('main/fetchPlanets');
  },


  methods: {
    async changePag(page = 1) {
      this.loading = false;
      this.people = await this.$axios.$get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      this.loading = true;
      console.log(this.people);
    },

    toggleFavorite(person) {
      const personIdx = this.favourites.findIndex((p) => p.url === person.url);

      if (personIdx > -1) {
        this.favourites.splice(personIdx, 1);
      } else {
        person.isFavorite = !person.isFavorite;
        this.favourites.push(person);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favourites));
    },
  },
};
</script>

<style scoped>
.cards {
  width: 100%;
}
.hl {
  color: red;
}
.section__wrapper {
  margin-bottom: 52px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  grid-gap: 44px 26px;
}

.cards__item {
  background-color: #fff;
}

.card__item-img {
  position: relative;
}
.cards__item img {
  width: 100%;
  height: auto;
}

.el-button {
  position: absolute;
  bottom: 10px;
  right: 5px;
  padding: 14px;
  font-size: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

.cards__item-info {
  padding: 8px 14px 14px 14px;
}

.section__item-name {
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
  margin-bottom: 4px;
}

.el-row {
  margin-bottom: 20px;
}

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
