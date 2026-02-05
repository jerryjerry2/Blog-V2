import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/http";
export const useCategoryStore = defineStore ("category", ()=>{
    // State management
    let categories = ref([]);

    // Action
    async function fetchCategory() {
        let res = await api.get('/categories');
        categories.value = res.data.data.items;
        // console.log(categories.value);
        
             
    }
    // Return
    return {fetchCategory, categories}

})