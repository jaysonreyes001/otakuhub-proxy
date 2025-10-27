<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

  // import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';
import { useColorMode } from '@vueuse/core';
const mode = useColorMode();
const data_list = ref([]);
const loading = ref(false);
const modules = [Navigation];
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
    
    <div class="relative mt-10" v-if="!loading">
      <div class="flex items-center gap-x-2 mb-4">
        <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
          <h1 class="text-lg font-bold">TOP AIRING</h1>
      </div>
      <div class="swiper-container relative">
      <swiper
            :modules="modules"
            class="mySwiper relative"
            :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
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
                    slidesPerView: 6,
                    spaceBetween:15
                },
            }"
        >
            <swiper-slide v-for="(data,index) in data_list" :key="index">
                <router-link :to="{name:'info',params:{id:data.id}}">
                  <div class="relative group">
                    <div class="absolute z-10 transition dark:bg-opacity-0 bg-opacity-0 group-hover:bg-opacity-70 w-full h-full  bg-gray-100 dark:bg-gray-900 ">
                      <Icon icon="mdi:play-outline" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
                    </div>
                    <img :src="data.image" :alt="data.title" class="rounded h-[200px] sm:h-[300px] lg:h-[350px] w-full overflow-hidden" />
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

              <div class="custom-nav">
                  <button :class="{
                      'custom-prev-light': mode === 'light',
                      'custom-prev': mode === 'dark',
                    }"><Icon class="text-primary dark:text-white" icon="material-symbols:arrow-left"/></button>
                  <button :class="{
                      'custom-next-light': mode === 'light',
                      'custom-next': mode === 'dark',
                    }"><Icon class="text-primary dark:text-white" icon="material-symbols:arrow-right"/></button>
              </div>

            </div>
    </div>
    <div class="relative h-[250px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>