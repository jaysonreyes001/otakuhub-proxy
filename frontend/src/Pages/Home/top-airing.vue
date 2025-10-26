<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';

const config = {
  itemsToShow: 6,
  gap: 20,
  autoplay: 3000,
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
const get_spotlight = async () => {
  loading.value = true;
  await axios_instance.get("/top-airing")
  .then(function(response){
    console.log(response.data)
    data_list.value = response.data.results;
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
}

onMounted(()=>{
  get_spotlight()
})
</script>

<template>
  <div>
    
    <div class="relative group" v-if="!loading">
      <div class="flex items-center gap-x-2 mb-4">
        <span class="inline-block h-[30px] mt-1 w-[5px] bg-primary "></span>
          <h1 class="text-xl font-bold">TOP AIRING</h1>
      </div>
    <Carousel  v-bind="config">
      <Slide v-for="(data,index) in data_list" :key="index">
        <router-link :to="{name:'watch',params:{id:data.id}}">
          <div class="relative w-full h-[500px]">
            <img :src="data.image" class="rounded h-[250px] lg:h-[300px] w-full overflow-hidden" alt="image" />
            <div class="absolute mt-2">
                <p class="text-sm font-semibold">{{ data?.title }}</p>
                <div class="flex">
                <p class="text-gray-400 text-xs mt-1">{{ data.sub > 1 ? 'Sub' : '' }} 
                  {{ data.sub > 1 && data.dub > 1 ? '|' :'' }} 
                  {{ data.dub > 1 ? 'Dub' : '' }}  
                  {{ data.duration ? ' | '+data.duration : '' }}
                </p>
                </div>
            </div>
          </div>
        </router-link>
      </Slide>
      <!-- <template #addons>
        <Navigation />
      </template> -->
    </Carousel>
    </div>
    <div class="relative h-[250px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>