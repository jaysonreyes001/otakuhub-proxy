<template lang="">
     <div class="mt-[50px]">
          <form @submit.prevent="search_function" class="max-w-4xl mx-auto">   
               <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
               <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                         <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                         </svg>
                    </div>
                    <input autocomplete="off" v-model="search" type="search" id="default-search" class="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-muted/60 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Search Anime.." />
                    <div v-if="loading" role="status">
                         <button  type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-primary dark:hover:bg-primary/70 transition dark:focus:ring-primary">
                         <svg aria-hidden="true" class="w-7 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                         </svg>
                         <span class="sr-only">Loading...</span>
                         </button>
                    </div>
                    <button v-else type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 dark:bg-primary dark:hover:bg-primary/70 transition dark:focus:ring-primary">Search</button>
               </div>
          </form>
          <div class="mt-10">
               <div v-if="search_list.results">
                    <p v-if="search_list.results.length > 0" class="text-2xl font-semibold mb-5">Top Results</p>
                    <div v-else class="flex flex-col items-center justify-center h-96 mt-[100px] bg-muted text-center px-4">
                    
                         <img
                              src="https://wallpapers.com/images/hd/puzzled-anime-characterwith-question-mark-4wbil3ia0u6wmb1u.jpg"
                              alt="Anime Chibi"
                              class="w-36 h-36 animate-float drop-shadow-lg"
                         />

                         <h1 class="mt-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                              No Results Found 😿
                         </h1>

                     
                         <p class="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
                              Check your spelling or try searching for something else.
                         </p>
                    </div>
               </div>
               <div v-if="loading" class="grid gap-5 lg:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  ">
                    <div v-for="index in 12" role="status" class="max-w-sm p-1 lg:p-4 animate-pulse md:p-6 dark:border-gray-700">
                         <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700"></div>
                         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                         <span class="sr-only">Loading...</span>
                    </div>
               </div>
               <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-5 gap-y-10">
                    <div class="group relative" v-for="(data,index) in search_list.results" :key="index">
                         <router-link class="h-full " :to="{name:'info',params:{id:data.id}}">
                              <div>
                                   <div class="image-container w-full relative overflow-hidden block bg-secondary pb-[60%]">
                                        <img :src="data.image" class="absolute z-2 top-0 left-0 right-0 bottom-0 h-full w-full object-cover"  :alt="data.title" />
                                        <div class="absolute z-10 transition dark:bg-opacity-0 bg-opacity-0 group-hover:bg-muted/80 w-full h-full  bg-gray-100 dark:bg-transparent ">
                                             <Icon icon="ic:baseline-airplay" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
                                        </div>
                                   </div>
                                   <p class="break-words text-sm md:text-base font-semibold mt-2">{{ data.title }}</p>
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
          </div>
          <img v-if="!search_list.results" class="mt-[100px]" src="@/assets/images/banner.jpg"/>
     </div>
</template>
<script setup>
import axios_instance from "@/plugin/axios.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";


const search_list = ref([]);
const search = ref("");
const loading = ref(false);
const search_function = async () => {
     if(search.value == "") return false;
     loading.value = true;
     search_list.value = [];
     await axios_instance.get(`/${search.value}`)
     .then(function(response){
          search_list.value = response.data;
          search.value = '';
     })
     .catch(function(error){
          console.log(error);
          loading.value = false;
     })
     loading.value = false;
}
onMounted(()=>{
     
})

</script>
<style lang="">
     
</style>