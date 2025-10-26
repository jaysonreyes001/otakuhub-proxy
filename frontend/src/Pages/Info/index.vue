<template lang="">
  <div class="px-5 sm:px-10 lg:px-0">
    <div v-if="!loading">
      <div class="grid grid-cols-1 lg:grid-cols-2 sm:gap-10 mt-10">
          <img class="rounded h-[500px] lg:h-[900px] w-full" :src="anime.mal_details.images.jpg.large_image_url"  />
          <div>
            <p class="text-2xl lg:text-4xl font-bold mt-5 text-center lg:text-left">{{anime.details.title}}</p>
            <div class="mt-5">
              <i class="badge bg-slate-600">{{anime.mal_details.rating.split(' ')[0]}}</i>
              <span class="text-sm dark:text-gray-300">{{anime.details.hasSub ? ' • Sub' : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.hasDub ? ' • Dub' : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.type ? ` • ${anime.details.type} ` : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.status ? ` • ${anime.details.status} ` : '' }}</span>
            </div>
            <div class="mt-5">
              <div class="flex items-center">
                  <svg class="w-8 h-8 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <p class="ms-2 text-base font-semibold text-gray-900 dark:text-gray-100">{{anime.mal_details.score}} Score</p>
              </div>
            </div>
            <p class="text-sm text-gray-900 dark:text-gray-200  mt-5">{{anime.details.description}}</p>

            <br><br>


            <div class="grid grid-cols-2 mt-5">
              <div class="text-sm">Aried</div>
              <div class="text-xs">{{anime.mal_details.aired.string}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

            <div class="grid grid-cols-2 mt-2">
              <div class="text-sm">Duration</div>
              <div class="text-xs">{{anime.mal_details.duration}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

            <div class="grid grid-cols-2 mt-2">
              <div class="text-sm">Status</div>
              <div class="text-xs">{{anime.mal_details.status}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">


            <div class="grid grid-cols-2 mt-2">
              <div class="text-sm">Premiered</div>
              <div class="text-xs">{{anime.details.season}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

            <div class="grid grid-cols-2 mt-2" v-if="anime.details.genres">
              <div class="text-sm">Genres</div>
              <div class="text-xs">{{anime.details.genres.join(' • ')}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

            <div class="grid grid-cols-2 mt-2">
              <div class="text-sm">Studios</div>
              <div class="text-xs">{{anime.mal_details.studios.map(item => item.name).join(' , ')}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

            <div class="grid grid-cols-2 mt-2">
              <div class="text-sm">Producers</div>
              <div class="text-xs">{{anime.mal_details.producers.map(item => item.name).join(' , ')}}</div>
            </div>
            <hr class="border-t border-gray-800 my-3">

          </div>
      </div>


      <div class="mt-20">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] mt-1 w-[5px] bg-primary "></span>
           <h1 class="text-lg font-semibold">TRAILER</h1>
        </div>
          <iframe :src="anime.mal_details.trailer.embed_url" class="mt-5 w-full lg:w-1/2 h-[400px]"></iframe>
      </div>

      <div class="mt-20">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] mt-1 w-[5px] bg-primary "></span>
           <h1 class="text-lg font-semibold">RECOMMENDATION</h1>
        </div>
           <swiper
            :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }"

            :modules="modules"
            class="mySwiper relative mt-5"
            :breakpoints="{
                '0': {
                    slidesPerView: 2,
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
          <swiper-slide v-for="(data,index) in anime.details.recommendations" :key="index">
              <router-link :to="{name:'info',params:{id:data.id}}">
                <div class="relative">
                  <img :src="data.image" :alt="data.title" class="rounded h-[200px] sm:h-[300px] lg:h-[300px] w-full overflow-hidden" />
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
    </div>
    <div class="relative h-[400px] lg:h-[950px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

  // import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import { onMounted, reactive, ref } from 'vue';
import {useRoute} from 'vue-router';
import axios_instance from '@/plugin/axios.js';
import axios from 'axios';
const route  = useRoute();
const loading = ref(true);
const anime = reactive({
  details:{},
  mal_details:{}
});
const anime_id = ref(route.params.id);

const get_anime_details = async () => {
  loading.value = true;
  await axios_instance.get("/info",{params:{
    id:anime_id.value
  }})
  .then(function(response){
      anime.details = response.data;
      get_mal_details();
  })
  .catch(function(error){
    console.log(error)
  })
} 


const get_mal_details = async () => {
  await axios.get(`https://api.jikan.moe/v4/anime/${anime.details.malID}/full`)
  .then(function(response){
      anime.mal_details = response.data.data;
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
} 

onMounted(()=>{
  get_anime_details();
})

</script>
<style lang="">
  
</style>