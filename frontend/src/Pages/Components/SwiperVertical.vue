<template lang="">
     <div>
          <div class="swiper-container relative">
               <swiper class="mySwiper relative" v-bind="config">
                    <swiper-slide v-for="(data,index) in props.list" :key="index">
                         <slot :data="data" :index="index" />
                    </swiper-slide>
               </swiper>
               <div  class="custom-nav hidden lg:block">
                    <button :class="{
                         'custom-prev-light': mode === 'light',
                         'custom-prev': mode === 'dark',
                         'top-airing-prev' : true
                    }"><Icon class="text-primary dark:text-white" icon="material-symbols:arrow-left"/></button>
                    <button :class="{
                         'custom-next-light': mode === 'light',
                         'custom-next': mode === 'dark',
                         'top-airing-next' : true
                    }"><Icon class="text-primary dark:text-white" icon="material-symbols:arrow-right"/></button>
               </div>
          </div>
     </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useColorMode } from '@vueuse/core';

const props = defineProps({
     list:{
          type:Array,
          default:[]
     }
});
console.log(props.list)
const mode = useColorMode();
const config = {
     loop:true,
     modules:[Navigation],
     navigation:{ nextEl: '.top-airing-next', prevEl: '.top-airing-prev' },
     breakpoints:
     {
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
               spaceBetween:20
          },
     }
};

</script>
<style scoped>

</style>