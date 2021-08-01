<template>
  <div>
    <el-row>
      <el-col :span='22' :offset='1' style='margin-top: 40px'>
        <NuxtLink exact no-prefetch active-class="active" class='main-page' to='/'>Main page</NuxtLink>
        <NuxtLink exact active-class="active" class='favorites-page' to='/favourite'>Favorites page</NuxtLink >
      </el-col>
    </el-row>

    <section class='cards'>
      <div class='section__wrapper'>
        <div
          class='cards__item'
          v-for='(person, index) in favourites'
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
            <p class='cards__item-birth_year'>Birth Year: {{ person.birth_year }}</p>
            <p class='cards__item-height'>Height: {{ person.height }}</p>
            <p class='cards__item-mass'>Mass: {{ person.mass }}</p>
            <p class='cards__item-homeworld'>Homeworld: {{ person.homeworld }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
  data() {
    return {
      favourites: [],
    };
  },


  async mounted() {
    const locFav = localStorage.getItem('favorites');
    this.favourites = JSON.parse(locFav) || [];
  },


  computed: {
    getLocalStorage() {
      return this.favourites;
    },
  },

  methods: {
    toggleFavorite(person) {
      const personIdx = this.favourites.findIndex((p) => p.url === person.url);

      if (personIdx > -1) {
        this.favourites.splice(personIdx, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favourites));
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 40px;
}

.cards {
  width: 100%;
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

img {
  max-width: 100%;
  height: auto;
}

.el-button {
  position: absolute;
  bottom: 10px;
  right: 5px;
  padding: 14px;
  font-size: 20px;
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
</style>
