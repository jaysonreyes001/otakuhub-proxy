<script setup>
import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';

const config = {
  pauseAutoplayOnHover: true,
  wrapAround:true,
  breakpointMode: 'carousel',
  breakpoints:{
    0:{
      itemsToShow:2,
      gap:10,
    },
    300:{
      itemsToShow:3,
      gap:10,
    },
    500:{
      itemsToShow:4,
      gap:10,
    },
    700:{
      itemsToShow:5,
      gap:15,
    },
    800:{
      itemsToShow:5,
      gap:15,
    },
    1200:{
      itemsToShow:7,
      gap:20,
    },
  }
} 

const data_list = ref([]);
const loading = ref(false);
const get_data = async () => {
  loading.value = true;
  await axios_instance.get("/recent-episodes")
  .then(function(response){
    data_list.value = response.data.results.slice(0,18);
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
}

onMounted(()=>{
  get_data()
})
</script>

<template>
  <div>
    <div class="relative mt-10" v-if="!loading">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] mt-1 w-[5px] bg-primary "></span>
           <h1 class="text-lg font-bold"> LATEST EPISODE</h1>
        </div>
        <button class="text-xs font-bold">VIEW MORE</button>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-5 gap-y-10">
        <div class="group relative" v-for="(data,index) in data_list" :key="index">
            <router-link class="h-full " :to="{name:'watch',params:{id:data.id,episode_id:data.sub}}">
              <div class="absolute z-10 transition dark:bg-opacity-0 bg-opacity-0 group-hover:bg-opacity-70 w-full h-full  bg-gray-100 dark:bg-gray-900 ">
                <Icon icon="mdi:play-outline" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
              </div>
              <div>
                  <div class="image-container rounded w-full relative overflow-hidden block bg-secondary pb-[150%]">
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
    </div>
    <div class="relative h-[500px] lg:h-[200px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>