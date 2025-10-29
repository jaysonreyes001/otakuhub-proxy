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
    // autoplay:{
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    pagination:{
      clickable:true,
      renderBullet: function (index, className) {
        return '<span  class="' + className + ' !bg-primary "></span>';
      }
    },
    mousewheel:false,
    allowTouchMove:false,
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
    <!-- <div class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"></div> -->
    <div class="swiper-container relative">
        <swiper :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }" v-bind="swiper_config">
          <swiper-slide class="relative" v-for="(spotlight,index) in spotlight_list" :key="index">
            <div lass="relative">
              <div class="image-container w-full relative overflow-hidden block bg-secondary pb-[70%] lg:pb-[45%]">
              <div class="z-[99] absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-[#ffffff] via-transparent to-[#ffffff]  dark:from-[#000000] dark:via-transparent dark:to-[#000000]"></div>
              <div class="z-[99] absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-[#ffffff] via-transparent to-100% dark:from-[#000000] dark:via-transparent dark:to-100%"></div>
              <div class="z-[99] absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-l dark:from-[#000000] dark:via-transparent dark:to-5%"></div>
                <!-- <img :src="spotlight.banner" class="w-full !object-inherit md:!object-cover !h-[350px] lg:!h-[1000px] overflow-hidden" :alt="spotlight.title" /> -->
                <img :src="spotlight.banner" class="absolute z-2 top-0 left-0 right-0 bottom-0 h-full w-full object-cover"  :alt="spotlight.title" />
              </div>
              
                  <!-- <div 
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
                  class="absolute top-0 left-0 h-full w-full inset-shadow-custom2"></div> -->
                  <div class="absolute z-[999] top-0 left-0 w-full h-full ">
                    <div class="flex items-center h-full  w-[300px] md:w-[600px]">
                      <div class="ml-16 space-y-3 md:space-y-5">
                        <p class="text-primary font-semibold text-md lg:text-xl">#{{ index +1 }} Spotlight</p>
                        <h1 class="text-sm md:text-xl lg:text-4xl dark:text-white text-primary font-bold">{{ spotlight.title }}</h1>
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
                        <div class="text-gray-900 dark:text-gray-100 text-xs hidden lg:masonry lg:text-lg line-clamp-none lg:line-clamp-4">{{ spotlight.description }}</div>
                        <div>
                          <router-link :to="{name:'info',params:{id:spotlight.id}}">
                            <button class="btn btn-primary btn-sm md:btn-md lg:btn-lg">
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
        <div  class="custom-nav">
            <button :class="{
                'custom-prev-light': mode === 'light',
                'custom-prev': mode === 'dark',
              }"><Icon class="text-primary dark:text-white" icon="material-symbols:chevron-left-rounded"/></button>
            <button :class="{
                'custom-next-light': mode === 'light',
                'custom-next': mode === 'dark',
              }"><Icon class="text-primary dark:text-white" icon="material-symbols:chevron-right-rounded"/></button>
        </div>
    </div>
    <!-- <div class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div> -->
    </div>
    <div class="relative h-[500px] lg:h-[900px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>
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