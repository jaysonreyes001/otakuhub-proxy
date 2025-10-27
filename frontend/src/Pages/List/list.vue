<template lang="">
     <div>
          <div class="block lg:flex justify-between mb-10 ">
               <div class="flex items-center gap-x-2 mt-20">
                    <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
                    <h1 class="text-2xl font-semibold">{{title}}</h1>
               </div>
          <!-- Pagination -->
               <nav class="flex items-center justify-center lg:justify-end gap-x-1 mt-10" aria-label="Pagination">
                    <button :disabled="current_page <= 1 ? true : false" @click="pages(current_page-=1)" type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous">
                         <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m15 18-6-6 6-6"></path>
                         </svg>
                         <span class="hidden lg:block">Previous</span>
                         </button>
                         <div class="flex items-center gap-x-1">
                              <button v-if="current_page  > 3" @click="pages(1)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                   py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                   dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                   1
                              </button>

                              <div v-for="page in pages_number">
                                   <button  v-if="page == current_page" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm 
                                   rounded-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white 
                                   dark:focus:bg-neutral-500" aria-current="page">{{page}}</button>
                                   <button @click="pages(page)" v-else type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                        py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{{page}}
                                   </button>
                              </div>

                              <button v-if="current_page != list_details.totalPages" @click="pages(list_details.totalPages)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                   py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                   dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                   {{list_details.totalPages}}
                              </button>
                         </div>
                         <button :disabled="current_page >= list_details.totalPages ? true : false" @click="pages(current_page+=1)"  type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next">
                         <span class="hidden lg:block">Next</span>
                         <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6"></path>
                         </svg>
                    </button>
               </nav>
               <!-- End Pagination -->
          </div>
          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  ">
               <div v-for="index in 12" role="status" class="max-w-sm p-4 animate-pulse md:p-6 dark:border-gray-700">
                    <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700"></div>
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <span class="sr-only">Loading...</span>
               </div>
          </div>
          <div v-else>
               <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-10">
                    <div class="group relative" v-for="(data,index) in list_details.results" :key="index">
                         <router-link class="h-full " :to="{name:'info',params:{id:data.id}}">
                              <div class="absolute z-10 transition dark:bg-opacity-0 bg-opacity-0 group-hover:bg-muted/80 w-full h-full  bg-gray-100 dark:bg-transparent ">
                                   <Icon icon="mdi:play-outline" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
                              </div>
                              <div>
                                   <div
                                        class="image-container rounded w-full relative overflow-hidden block bg-secondary pb-[60%]">
                                        <img :src="data.image" class="absolute z-2 top-0 left-0 right-0 bottom-0 h-full w-full object-cover"  :alt="data.title" />
                                   </div>
                                   <p class="break-words text-xs md:text-sm font-semibold mt-2">{{ data.title }}</p>
                                   <div class="flex justify-between ">
                                   <p class="text-gray-400 text-xs mt-1">Episode {{ data.sub }}</p>
                                   <p class="text-gray-400 text-xs mt-1 ">{{ data.sub > 1 ? 'Sub' : '' }} 
                                        {{ data.sub > 1 && data.dub > 1 ? '|' :'' }} 
                                        {{ data.dub > 1 ? 'Dub' : '' }}  
                                   </p>
                                   </div>
                              </div>
                         </router-link>
                    </div>
               </div>
               <!-- Pagination -->
               <nav class="flex items-center justify-center lg:justify-end gap-x-1 mt-20" aria-label="Pagination">
                    <button :disabled="current_page <= 1 ? true : false" @click="pages(current_page-=1)" type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous">
                         <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m15 18-6-6 6-6"></path>
                         </svg>
                         <span class="hidden lg:block">Previous</span>
                         </button>
                         <div class="flex items-center gap-x-1">
                              <button v-if="current_page  > 3" @click="pages(1)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                   py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                   dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                   1
                              </button>

                              <div v-for="page in pages_number">
                                   <button  v-if="page == current_page" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm 
                                   rounded-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white 
                                   dark:focus:bg-neutral-500" aria-current="page">{{page}}</button>
                                   <button @click="pages(page)" v-else type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                        py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{{page}}
                                   </button>
                              </div>

                              <button v-if="current_page != list_details.totalPages" @click="pages(list_details.totalPages)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                                   py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                                   dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                   {{list_details.totalPages}}
                              </button>
                         </div>
                         <button :disabled="current_page >= list_details.totalPages ? true : false" @click="pages(current_page+=1)"  type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next">
                         <span class="hidden lg:block">Next</span>
                         <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6"></path>
                         </svg>
                    </button>
               </nav>
               <!-- End Pagination -->
          </div>
     </div>
</template>
<script setup>
import axios_instance from "@/plugin/axios.js";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const loading = ref(false);

const current_page = ref(1);
const pages_number = ref([]);
let list_details = reactive({});

const get_list = async () => {
     loading.value = true;
     list_details = {};
     await axios_instance.get(`/${route.params.type}?page=${current_page.value}`)
     .then(function(response){
          list_details = response.data;
          
     })
     .catch(function(error){
          console.log(error);
          loading.value = false;
     })
     loading.value = false;
}

const title = computed(()=>{
     let title_ = "";
     if(route.params.type == 'recent-episodes'){
          title_ = 'LATEST EPISODE';
     }
     return title_;
})

const pages = async (page_) => {
     window.scrollTo(0,0);
     await get_list();
     current_page.value = page_;
     pages_number.value = [...prev_page(),current_page.value,...next_page()];
} 

const prev_page = () => {
     let page_arr = [];
     for (let index = current_page.value -1 ; current_page.value - 2 <= index; index--) {
          if(index < 1){
               break;
          }
          page_arr.push(index)
     }
     return page_arr.reverse();
}
const next_page = () => {
     let page_arr = [];
     for (let index = current_page.value + 1 ; current_page.value + 2 >= index; index++) {
          if(index >= list_details.totalPages){
               break;
          }
          page_arr.push(index)
     }
     return page_arr;
}

onMounted(()=>{
    pages(current_page.value)
})

</script>
<style lang="">
     
</style>