<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="20" :offset="2" style="margin-top: 40px">
        <NuxtLink class="favorites-page" to="/favourite"
          >Favorites page</NuxtLink
        >
      </el-col>
    </el-row>

    <el-row type="flex" align="middle">
      <el-col :span="11" :offset="2">
        <el-input
          v-model="searchText"
          placeholder="input Name"
          prefix-icon="el-icon-search"
        />
      </el-col>
      <el-col :span="10" :offset="1">
        <div class="filter">
          <el-radio v-model="gender" border label="" size="medium"
            >All</el-radio
          >
          <el-radio v-model="gender" border label="male" size="medium"
            >Male</el-radio
          >
          <el-radio v-model="gender" border label="female" size="medium"
            >Female</el-radio
          >
        </div>
      </el-col>
    </el-row>

    <section class="cards">
      <div class="section__wrapper">
        <div
          class="cards__item"
          v-for="(person, index) in currentPeople"
          :key="index"
        >
          <img
            :src="`https://starwars-visualguide.com/assets/img/characters/${person.url.match(
              /\d+/
            )}.jpg`"
            class="image"
          />
          <div class="cards__item-info">
            <p class="cards__item-name">Name: {{ person.name }}</p>
            <p class="cards__item-birth_year">
              Birth Year: {{ person.birth_year }}
            </p>
            <p class="cards__item-height">Height: {{ person.height }}</p>
            <p class="cards__item-mass">Mass: {{ person.mass }}</p>
            <p class="cards__item-homeworld">
              Homeworld:
              {{ homeworld(person.url) }}
            </p>
            <el-button
              @click="toggleFavorite(person)"
              v-bind:class="{ 'i-am-active': button_active_state }"
              v-on:click="button_active_state = !button_active_state"
              type="primary"
              :icon="`el-icon-star-${isFavorite(person.name)}`"
              circle
            />
          </div>
        </div>
      </div>
    </section>

    <el-row>
      <el-col :span="16" :offset="8">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="people.count"
          @current-change="changePag"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "People",
  data() {
    return {
      people: {
        results: [],
      },
      searchText: "",
      gender: "", // all
      button_active_state: false,

      loading: false, // TODO:: ADD IT!
    };
  },

  computed: {
    currentPeople() {
      return this.people.results.filter((person) => {
        const regex = new RegExp(this.searchText, "gi");
        return (
          (person.name.match(regex) && !this.gender) ||
          person.gender === this.gender
        );
      });

      // person.name.toLowerCase().includes(this.searchText.toLowerCase()) && // search text
    },
  },
  async mounted() {
    await this.changePag();
  },

  methods: {
    async changePag(page = 1) {
      this.people = await this.$axios.$get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      console.log("people", this.people);
    },

    toggleFavorite(person) {
      console.log(person);
      if (localStorage.getItem(person.name)) {
        localStorage.removeItem(person.name);
      } else {
        localStorage.setItem(person.name, JSON.stringify(person));
      }
    },

    isFavorite(name) {
      return !!localStorage.getItem(name) ? "on" : "off";
    },

    async homeworld(url) {
      const homeworld = await fetch(url).then((r) => r.json());
      return homeworld;
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
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  grid-gap: 44px 26px;
}

.cards__item {
  background-color: #fff;
}

.cards__item img {
  width: 100%;
  height: auto;
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
  margin-bottom: 40px;
}

.main-page,
.favorites-page {
  color: white;
  font-size: 20px;
  padding-right: 20px;
}

.main-page:hover,
.favorites-page:hover {
  color: #409eff;
}
</style>
