<template>
  <div class='wrapper'>
    <el-row>
      <el-col :span='20' :offset='1' style='margin-top: 30px'>
        <NuxtLink exact  active-class="active" class='main-page' to='/'>Main page</NuxtLink>
        <NuxtLink exact  no-prefetch active-class="active" class='favorites-page' to='/favourite'>Favorites page</NuxtLink >
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
  </div>
</template>

<script>
export default {
  name: 'People',
  props: {
    people: {
      type: Array,
      require: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      favourites: [],
      searchText: '',
      gender: '', // all
    };
  },
  computed: {
    currentPeople() {
      return this.people
      .filter((person) => {
          const regex = new RegExp(this.searchText, 'gi');

          return (person.name.match(regex) || !person.name) && (person.gender === this.gender || !this.gender);
      })
      .map((p) => {
        p.isFavorite = this.favourites.some((f) => f.url === p.url);
        return p
      });
    },
  },
  async mounted() {
    if (this.isFavorite) {
      this.favourites = this.people;
    }
    else {
      const locFav = localStorage.getItem('favorites');
      this.favourites = JSON.parse(locFav) || [];
    }
  },
  methods: {
    toggleFavorite(person) {
      const personIdx = this.favourites.findIndex((p) => p.url === person.url);

      if (personIdx > -1) {
        this.favourites.splice(personIdx, 1);
      }
      else {
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

.section__wrapper {
  margin-bottom: 52px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 44px 26px;
}

.cards__item {
  background-color: #fff;
  box-shadow: 0px 0px 12px 0px rgb(172, 172, 172);
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

.el-radio {
  color: #ffffff;
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
