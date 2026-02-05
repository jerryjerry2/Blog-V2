<template>
  <div>
    <!-- Top Navbar -->
    <Navbar></Navbar>
    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar></Sidebar>
      <!-- Main Content -->
      <div class=" content">
        <h3>Article Page</h3>
        <div class="d-flex justify-content-end my-4">
          <router-link class="btn bg-primary text-light w-25" :to="{name:'createArticle'}">
           Add Article
          </router-link>
        </div>
        <BaseTable :columns="columns" :rows="articleStore.ownArticles.value">
          <template #col-thumbnail="{ value }">
            <img :src="value" alt="" width="100px">
          </template>
          <template #col-category="{ value }">
            <p>{{ value.name }}</p>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useArticleStore } from '@/stores/articles';
import { onMounted } from 'vue';
import BaseTable from '@/components/ui/BaseTable.vue';

let articleStore = useArticleStore();

onMounted(async () => {
  await articleStore.fetchOwnAritcles();
})
let columns = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Content", key: "content" },
  { label: "Thumbnail", key: "thumbnail" },
  { label: "Category", key: "category" },
]
</script>