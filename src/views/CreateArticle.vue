<template>
    <div>
        <!-- Top Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <!-- Main Content -->
            <div class="row justify-content-center w-100 my-5">
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="card p-4">
                        <h5 class="fw-bold mb-3">Create New Article</h5>
                        <form @submit.prevent="handleCreate">
                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" class="form-control" placeholder="Enter article title" v-model="form.title" />
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option selected disabled>Choose category</option>
                                    <option v-for="category in categoryStore.categories" :key="category.id" 
                                    :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>

                           

                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file" @change="handleFileChange" class="form-control" />
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" rows="5"
                                    placeholder="Write your article content..." v-model="form.content"></textarea>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="reset" class="btn btn-outline-secondary">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Publish Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useCategoryStore } from '@/stores/category';
let categoryStore = useCategoryStore();
import { onMounted } from 'vue';
import { ref } from 'vue';
import api from '@/api/http';

let form = ref({
    title:"",
    content:"",
    categoryId:"",
})

const file = ref(null)

let image = ref(null);

onMounted(  ()=>{
    categoryStore.fetchCategory();
})
const handleCreate = async () =>{
    console.log(form.value);
    console.log(file.value);

    try{
        let res = await api.post('/articles', form.value);
        console.log(res.data.data.id);
        let id = res.data.data.id
        if(file.value){
            let formData = new FormData();
            formData.append('thumbnail', file.value)
            let res = await api.post(`/articles/${id}/thumbnail`, formData);
            console.log(res);
            
        }
    }catch(err){
        console.error(err)
    }
}

// Watch the file for changes
const handleFileChange = (event) => {
  // Get the selected file from the event
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
  }
}
</script>