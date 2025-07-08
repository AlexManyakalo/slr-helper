<script setup>
const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="item__block">
    <img class="block__image" :src="item.image" :alt="item.name" />
  </div>
  <h4 class="item__title">{{ item.name }}</h4>
</template>

<style lang="scss" scoped>
.item__block {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.block__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item__title {
}
</style>
