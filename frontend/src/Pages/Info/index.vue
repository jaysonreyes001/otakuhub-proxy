<template lang="">
  <div class="px-5 sm:px-10 lg:px-0">
    <div v-if="!loading">
      <div class="grid grid-cols-1 lg:grid-cols-2 sm:gap-10 mt-10">
          <img v-if="anime.details.malID == 0" class="rounded h-[500px] lg:h-[900px] w-full" :src="anime.details.image"  />
          <img v-else class="rounded h-[400px] sm:h-[700px] lg:h-[900px] w-full" :src="anime.mal_details.images.jpg.large_image_url"  />
          <div>
            <p class="text-2xl lg:text-4xl font-bold mt-5 text-center lg:text-left">{{anime.details.title}}</p>
            <div class="mt-5">
              <i class="badge bg-slate-600" v-if="anime.details.malID != 0">{{anime.mal_details.rating.split(' ')[0]}}</i>
              <span class="text-sm dark:text-gray-300">{{anime.details.hasSub ? ' • Sub' : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.hasDub ? ' • Dub' : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.type ? ` • ${anime.details.type} ` : '' }}</span>
              <span class="text-sm dark:text-gray-300">{{anime.details.status ? ` • ${anime.details.status} ` : '' }}</span>
            </div>
            <div class="mt-5" v-if="anime.details.malID != 0">
              <div class="flex items-center">
                  <svg class="w-8 h-8 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <p class="ms-2 text-base font-semibold text-gray-900 dark:text-gray-100">{{anime.mal_details.score}} Score</p>
              </div>
            </div>
            <p class="text-sm text-gray-900 dark:text-gray-200  mt-5">{{anime.details.description}}</p>

            <br><br>

            <div v-if="anime.details.malID != 0">
              <div  class="grid grid-cols-2 mt-5">
                <div class="text-sm">Aried</div>
                <div class="text-xs">{{anime.mal_details.aired.string}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

            <div v-if="anime.details.malID != 0">
              <div class="grid grid-cols-2 mt-2">
                <div class="text-sm">Duration</div>
                <div class="text-xs">{{anime.mal_details.duration}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

            <div>
              <div class="grid grid-cols-2 mt-2">
                <div class="text-sm">Status</div>
                <div class="text-xs">{{anime.details.status}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

            <div>
              <div class="grid grid-cols-2 mt-2">
                <div class="text-sm">Premiered</div>
                <div class="text-xs">{{anime.details.season}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

            <div>
              <div class="grid grid-cols-2 mt-2" v-if="anime.details.genres">
                <div class="text-sm">Genres</div>
                <div class="text-xs">{{anime.details.genres.join(' • ')}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

            <div v-if="anime.details.malID != 0">
              <div class="grid grid-cols-2 mt-2">
                <div class="text-sm">Studios</div>
                <div class="text-xs">{{anime.mal_details.studios.map(item => item.name).join(' , ')}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>
            
            <div v-if="anime.details.malID != 0">
              <div class="grid grid-cols-2 mt-2">
                <div class="text-sm">Producers</div>
                <div class="text-xs">{{anime.mal_details.producers.map(item => item.name).join(' , ')}}</div>
              </div>
              <hr class="border-t border-gray-800 my-3">
            </div>

          </div>
      </div>

      <div class="mt-20">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
           <h1 class="text-lg font-semibold">EPISODES</h1>
        </div>
          <div class="overflow-y-auto max-h-[700px]">
          <div class="grid grid-cols-1 lg:grid-cols-6 gap-5 gap-y-3 lg:gap-y-10 mt-5">
                          
              <div class="relative group cursor-pointer " v-for="(data,index) in anime.details.episodes" :key="index">
                <router-link class="h-full" :to="{name:'watch',params:{id:anime.details.id,episode_id:data.number}}">
                  <div class="p-2 absolute bg-slate-600 dark:bg-black transition rounded w-full h-full z-[999] opacity-0 group-hover:opacity-100">
                    <p class="text-[7px] lg:text-sm line-clamp-2 font-semibold text-gray-300 ">{{anime.details.title}}</p>
                    <p class="text-white font-semibold text-[9px] lg:text-lg mt-1">EP {{data.number}} - {{data.title}}</p>
                    <p class="absolute bottom-2 flex text-primary font-bold text-[9px] lg:text-md">
                      <Icon icon="mdi:play" class="text-sm  "/>
                      PLAY EP {{data.number}}
                    </p>
                  </div>

                  <div class="grid grid-cols-2 lg:grid-cols-1 gap-5">
                      <div class="image-container   w-full pb-[50%] relative overflow-hidden bg-secondary  ">
                        <img :src="anime.details.image" class="absolute z-10 top-0 left-0 right-0 bottom-0 h-full w-full object-cover"  :alt="data.title" />
                      </div>
                      <div>
                        <p class="text-sm mt-2">{{ data.title }}</p>
                        <p class="text-gray-400 text-xs mt-1">Episode {{data.number}}</p>
                      </div>
                  </div>
                 </router-link>
              </div>
             
          </div>
        </div>
      </div>

      <div class="" v-if="anime.details.malID != 0">
        <div v-if="anime.mal_details.trailer.embed_url">
          <div class="flex items-center gap-x-2 mt-20">
              <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
              <h1 class="text-lg font-semibold">TRAILER</h1>
            </div>
              <iframe :src="anime.mal_details.trailer.embed_url" class="mt-5 w-full h-[400px] lg:h-[700px]"></iframe>
          </div>
        </div>

      <div class="mt-20">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
           <h1 class="text-lg font-semibold">RECOMMENDATION</h1>
        </div>
        <div class="relative">
           <swiper
           :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
            class="mySwiper relative mt-5"
            :modules="modules"
            :breakpoints="{
                '0': {
                    slidesPerView: 2,
                    spaceBetween:10
                },
                '568': {
                    slidesPerView: 3,
                    spaceBetween:10
                },
                '768': {
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
          <swiper-slide v-for="(data,index) in anime.details.recommendations" :key="index">
              <router-link :to="{name:'info',params:{id:data.id}}">
                  <div class="relative group">
                    <div class="absolute z-10 transition  bg-opacity-0 group-hover:bg-muted/80 w-full h-full  bg-gray-100 dark:bg-transparent ">
                      <Icon icon="mdi:play-outline" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
                    </div>
                    <img :src="data.image" :alt="data.title" class="h-[280px] sm:h-[290px] lg:h-[350px] w-full overflow-hidden" />
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
         <div  class="custom-nav hidden lg:block">
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
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { onMounted, reactive, ref, watch } from 'vue';
import {useRoute} from 'vue-router';
import axios_instance from '@/plugin/axios.js';
import axios from 'axios';
import { useColorMode } from '@vueuse/core';


const mode = useColorMode();
const route  = useRoute();
const loading = ref(true);
const anime = reactive({
  details:{},
  mal_details:{},
  episodes:[]
});
const anime_id = ref(route.params.id);

const modules = [Navigation];

const get_anime_details = async () => {
  loading.value = true;
  await axios_instance.get("/info",{params:{
    id:anime_id.value
  }})
  .then(function(response){
      anime.details = response.data;
      if(anime.details.malID != 0){
          get_mal_details();
          get_mal_episode();
      }
      else{
        loading.value = false;
      }
  })
  .catch(function(error){
    console.log(error)
  })
} 


const get_mal_episode = async () => {
  await axios.get(`https://api.jikan.moe/v4/anime/${anime.details.malID}/episodes`)
  .then(function(response){
      anime.episodes = response.data.data;
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
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


watch(()=>route.params.id,(newV,oldV)=>{
  anime_id.value = route.params.id;
  get_anime_details()
})

onMounted(()=>{
  get_anime_details();
})

</script>
<style lang="">
  
</style>