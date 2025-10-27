<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

  // import required modules
import { EffectFade,Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';


import axios_instance from '@/plugin/axios.js';
import { onMounted, reactive, ref } from 'vue';
import { useColorMode } from '@vueuse/core';
const mode = useColorMode();

const modules = [Autoplay,EffectFade,Pagination,Navigation];

const spotlight_list = ref([]);
const loading = ref(false);

const swiper_config = reactive({
    spaceBetween:10,
    slidesPerView:1,
    centeredSlides:true,
    effect:'fade',
    loop:false,
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination:{
      clickable:true,
    },
    mousewheel:true,
    navigation:true,
    modules:modules,
})

const get_spotlight = async () => {
  loading.value = true;
  await axios_instance.get("/spotlight")
  .then(function(response){
    spotlight_list.value = response.data.results;
    swiper_config.loop = true;
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
    <div class="relative" v-if="!loading">
    <div class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"></div>
    <div>
      <swiper 
            :style="{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
              }"
              v-bind="swiper_config"
              class="mySwiper h-[300px] md:h-[900px] mt-0 md:mt-10">
            <swiper-slide class="relative" v-for="(spotlight,index) in spotlight_list" :key="index">
              <div lass="relative">
                <img :src="spotlight.banner" class="rounded !object-inherit md:!object-cover !h-[500px] md:!h-[900px] overflow-hidden" :alt="spotlight.title" />
                    <div 
                    :class="{
                      'inset-shadow-custom-light': mode === 'light',
                      'inset-shadow-custom-dark': mode === 'dark',
                    }"
                    class="absolute top-0 left-0 h-full w-full "></div>
                    <div 
                    :class="{
                      'inset-shadow-custom2-light': mode === 'light',
                      'inset-shadow-custom2-dark': mode === 'dark',
                    }"
                    class="absolute top-0 left-0 h-full w-full inset-shadow-custom2"></div>
                    <div class="absolute top-0 left-0 w-full h-full ">
                      <div class="flex items-center h-full  w-[300px] md:w-[600px]">
                        <div class="ml-10 space-y-3 md:space-y-5">
                          <p class="text-primary font-semibold text-md lg:text-xl">#{{ index +1 }} Spotlight</p>
                          <h1 class="text-sm md:text-4xl dark:text-white text-primary font-bold">{{ spotlight.title }}</h1>
                          <div class="flex gap-x-5">
                            <div class="flex items-center text-gray-800 dark:text-gray-200 text-xs md:text-xl" v-if="spotlight.type">
                              <Icon icon="mdi:play" class="text-base md:text-xl"/>
                              {{ spotlight.type }}
                            </div>
                            <div class="flex items-center text-gray-800 dark:text-gray-200 text-xs md:text-xl" v-if="spotlight.duration">
                              <Icon icon="mdi:clock" class="text-xs  md:text-xl"/>
                              {{ spotlight.duration }}
                            </div>
                            <div class="badge badge-outline-primary text-xs md:text-lg" v-if="spotlight.quality">
                              {{ spotlight.quality }}
                            </div>
                          </div>
                          <p class="text-gray-800 dark:text-gray-200 text-xs md:text-lg line-clamp-3 md:line-clamp-4">{{ spotlight.description }}</p>
                          <div>
                            <router-link :to="{name:'info',params:{id:spotlight.id}}">
                              <button class="btn btn-primary btn-sm sm:btn-lg">
                                <Icon icon="mdi:play" class="text-xl mr-1"/>
                                  Start Watching
                              </button>
                            </router-link>
                          </div>
                        </div>
                      </div>
                  </div>
                  </div>
            </swiper-slide>
      </swiper>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
    </div>
    <div class="relative h-[500px] lg:h-[900px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>

<style>
.swiper-button-prev,.swiper-button-next{
  height: 20px !important;
  width: 10px !important;
}
</style>
<style scoped>
:root {
  background-color: #242424;
}

.inset-shadow-custom-dark{
  box-shadow: inset 400px -100px 1500px 100px rgba(0, 0, 0, .8);
}
.inset-shadow-custom2-dark{
  box-shadow: inset 100px -40px 50px 30px rgba(0, 0, 0,1);
}

.inset-shadow-custom-light{
  box-shadow: inset 400px -100px 1500px 100px rgba(255, 255, 255, .8);
}
.inset-shadow-custom2-light{
  box-shadow: inset 100px -40px 50px 30px rgba(255, 255, 255,1);
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}




@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes img-border-animation {
  from {
    @apply border-t-primary/10;
  }

  to {
    @apply border-t-primary/60;
  }
}
</style>