import api from "@/api/http";
import { ref } from "vue";


export const useArticleStore = ('article', () => {
    let articles = ref([]); 
    let ownArticles = ref([])

    async function fetchAritcles({search = "", sortBy = "createdAt", sortDir = "desc"} = {}) {
        let res = await api.get('/articles',{
            params: {
                search,
                sortBy,
                sortDir
            }
        });
        articles.value = res.data.data.items
        // console.log(articles.value)
             
    }
    async function fetchOwnAritcles() {
    let res = await api.get('/articles/own');
    ownArticles.value = res.data.data.items
    console.log(ownArticles.value)
             
    }
    return { articles,ownArticles, fetchAritcles, fetchOwnAritcles}
})