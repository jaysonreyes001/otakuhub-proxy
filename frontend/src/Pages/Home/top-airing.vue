<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

  // import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';

const data_list = ref([]);
const loading = ref(false);
const get_spotlight = async () => {
  loading.value = true;
  await axios_instance.get("/top-airing")
  .then(function(response){
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
    
    <div class="relative group mt-10" v-if="!loading">
      <div class="flex items-center gap-x-2 mb-4">
        <span class="inline-block h-[30px] mt-1 w-[5px] bg-primary "></span>
          <h1 class="text-lg font-bold">TOP AIRING</h1>
      </div>
      <swiper
            :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }"

            :modules="modules"
            class="mySwiper relative"
            :breakpoints="{
                '0': {
                    slidesPerView: 3,
                    spaceBetween:10
                },
                '568': {
                    slidesPerView: 4,
                    spaceBetween:10
                },
                '1024': {
                    slidesPerView: 5,
                    spaceBetween:15
                },
                '1280': {
                    slidesPerView: 7,
                    spaceBetween:15
                },
            }"
        >
            <swiper-slide v-for="(data,index) in data_list" :key="index">
                <router-link :to="{name:'watch',params:{id:data.id}}">
                  <div class="relative">
                    <img :src="data.image" class="rounded h-[200px] sm:h-[300px] lg:h-[300px] w-full overflow-hidden" alt="image" />
                    <div class="mt-2">
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
                </swiper-slide>
            </swiper>
    </div>
    <div class="relative h-[250px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>