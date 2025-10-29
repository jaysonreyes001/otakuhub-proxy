<template lang="">
     <div>
          <div class="block lg:flex justify-between items-center mb-10 mt-20 ">
               <div class="flex items-center gap-x-2 ">
                    <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
                    <h1 class="text-2xl font-semibold uppercase">{{route.params.type}}</h1>
               </div>
          <!-- Pagination -->
           <Pagination @page_change="page_change" v-if="list_details.results" :current_page="current_page" :total_pages="list_details.totalPages" />

          </div>
          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-2 md:grid-cols-4 lg:grid-cols-5  ">
               <div v-for="index in 15" role="status" class="max-w-sm p-0 lg:p-4 animate-pulse md:p-6 dark:border-gray-700">
                    <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <span class="sr-only">Loading...</span>
               </div>
          </div>
          <div v-else>
               <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-5 gap-y-10">
                    <div class="relative" v-for="(data,index) in list_details.results" :key="index">
                         <router-link :to="{name:'info',params:{id:data.id}}">
                              <Image :url="data.image" containerClass="pb-[60%]">
                                   <template #footer>
                                        <p class="break-words text-sm lg:text-xl font-semibold mt-2">{{ data.title }}</p>
                                        <div class="flex justify-between ">
                                             <p class="text-gray-400 text-xs mt-1">Episode {{ data.sub }}</p>
                                             <p class="text-gray-400 text-xs mt-1 ">{{ data.sub > 1 ? 'Sub' : '' }} 
                                                  {{ data.sub > 1 && data.dub > 1 ? '|' :'' }} 
                                                  {{ data.dub > 1 ? 'Dub' : '' }}  
                                             </p>
                                        </div>
                                   </template>
                              </Image>
                         </router-link>
                    </div>
               </div>
        
          <!-- Pagination -->
          <Pagination class="mt-20" @page_change="page_change" v-if="list_details.results" :current_page="current_page" :total_pages="list_details.totalPages" />
          </div>
     </div>
</template>
<script setup>
import axios_instance from "@/plugin/axios.js";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Image from "../Components/Image.vue";
import Pagination from "../Components/Pagination.vue";
const route = useRoute();
const loading = ref(false);

const current_page = ref(1);
const pages_number = ref([]);
let list_details = reactive({});

const get_list = async () => {
     loading.value = true;
     window.scrollTo(0,0);
     await axios_instance.get(`/genre/${route.params.type}?page=${current_page.value}`)
     .then(function(response){
          list_details = response.data;
          
     })
     .catch(function(error){
          console.log(error);
          loading.value = false;
     })
     loading.value = false;
}

const page_change = (page) => {
     current_page.value = page;
     get_list();
}

onMounted(()=>{
    get_list();
})

</script>
<style lang="">
     
</style>