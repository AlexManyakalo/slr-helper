<script setup>
import { ref, onMounted } from "vue";
import api from "@api/api.js";
import HeroCard from "@src/components/HeroCard.vue";

// const id = ref("");
const heroes = ref([]);
const books = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  const [heroesRes, booksRes] = await Promise.all([
    api.get("/heroes"),
    api.get("/books"),
    // api.get("/hero", { id }),
  ]);
  heroes.value = heroesRes.data;
  books.value = booksRes.data;
  console.log(heroes.value);
  isLoading.value = false;
});
</script>

<template>
  <p v-if="isLoading">Загрузка...</p>
  <h2>Какие книги есть?</h2>
  <ul class="books__list list"></ul>
  <h2>Рекомендую героев:</h2>
  <ul class="heroes__list list">
    <HeroCard :heroes="heroes" />
  </ul>
  <h2>Выберите героя. Какого выбрали?</h2>
  <ul class="heroes__list list">
    <HeroCard :heroes="heroes" />
  </ul>
  <h2>Какие герои есть в лобби?</h2>
  <ul class="heroes__list list">
    <HeroCard :heroes="heroes" />
  </ul>
</template>

<style lang="scss" scoped>

</style>
