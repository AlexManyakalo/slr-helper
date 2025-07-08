<script setup>
import ItemCard from "@src/components/ItemCard.vue";
const props = defineProps({
  books: Array,
  selectedIds: Array,
});

const emit = defineEmits(["select-books"]);
function onClick(id) {
  emit("select-books", id);
}
</script>

<template>
  <div class="wrapper__list">
    <h3 class="title">Какие книги есть?</h3>
    <ul class="list">
      <li
        v-for="item in books"
        @click="onClick(item.id)"
        :class="['list__item', { active: selectedIds.includes(item.id) }]"
      >
        <ItemCard :item="item" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@src/styles/variables" as v;

.wrapper__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-block: 30px;
}

.title {
}

.list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 30px;
}

.list__item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 120px;
  text-align: center;
  height: 170px;
  transition-duration: v.$transition-duration;

  &.active {
    outline: v.$border;
  }
}
</style>
