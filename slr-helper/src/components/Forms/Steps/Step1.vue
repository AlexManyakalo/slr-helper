<script setup>
import { ref, onMounted } from "vue";
import { api } from "@api/api.js";
import ListComponent from "@src/components/ListComponent.vue";

const books = ref([]);
const isLoading = ref(true);
const selectedIds = ref([]);

function selectBooks(id) {
  const index = selectedIds.value.indexOf(id);
  if (index === -1) selectedIds.value.push(id);
  else selectedIds.value.splice(index, 1);
  console.log(id);
}

async function sendData() {
  try {
    const res = await api.post("/ask-cohere", {
      prompt: "Как работает API DeepSeek?",
    });
    console.log("Ответ:", res.data.text);
  } catch (err) {
    console.error("Ошибка на клиенте:", err.response?.data || err.message);
  }
}

onMounted(async () => {
  isLoading.value = true;
  const response = await api.get("/books");
  books.value = response.data;
  isLoading.value = false;
});
</script>

<template>
  <div class="wrapper__step">
    <p v-if="isLoading">Загрузка...</p>
    <ListComponent
      v-else
      :books="books"
      :selected-ids="selectedIds"
      @select-books="selectBooks"
    />
    <button @click="sendData" class="btn">Далее</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper__step {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
