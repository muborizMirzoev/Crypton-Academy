<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2" style="margin-top: 40px">
        <NuxtLink class="main-page" to="/">Main page</NuxtLink>
      </el-col>
    </el-row>

    <section class="cards">
      <div class="section__wrapper">
        <div
          class="cards__item"
          v-for="(person, index) in getLocalStorage"
          :key="index"
        >
          <img
            :src="`https://starwars-visualguide.com/assets/img/characters/${
              JSON.parse(
                getLocalStorage.getItem(JSON.parse(person).name)
              ).url.match(/\d+/)[0]
            }.jpg`"
            class="image"
          />
          <div class="cards__item-info">
            <p class="cards__item-name">{{ JSON.parse(person).name }}</p>
            <el-button
              @click="toggleFavorite(JSON.parse(person))"
              v-bind:class="{ 'i-am-active': button_active_state }"
              v-on:click="button_active_state = !button_active_state"
              type="primary"
              :icon="`el-icon-star-on`"
              circle
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  data() {
    return {
      button_active_state: false,
    };
  },

  computed: {
    getLocalStorage() {
      console.log(localStorage);
      return localStorage;
    },
  },

  methods: {
    toggleFavorite(person) {
      if (localStorage.getItem(person.name)) {
        localStorage.removeItem(person.name);
        return this.isFavorite(person.name);
      } else {
        localStorage.setItem(person.name, JSON.stringify(person));
        return this.isFavorite(person.name);
      }
    },
    isFavorite(name) {
      console.log(!!localStorage.getItem(name));
      return !!localStorage.getItem(name) ? "on" : "off";
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
