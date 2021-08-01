<template>
  <PeopleCards
    :people="favourites"
    :isFavorite="true"
  />
</template>

<script>
export default {
  name: 'Favorite',
  computed: {
    favourites () {
      const locFav = localStorage.getItem('favorites');

      return JSON.parse(locFav) || [];
    }
  }
};
</script>
