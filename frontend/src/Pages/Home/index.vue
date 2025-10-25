<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';
const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/800/600`,
}))

const config = {
  itemsToShow: 1,
  gap: 10,
  autoplay: 8000,
  pauseAutoplayOnHover: false,
  wrapAround:true,
  mouseDrag:false
}


const spotlight_list = ref([]);
const get_spotlight = async () => {
  await axios_instance.get("/spotlight")
  .then(function(response){
    console.log(response.data)
    spotlight_list.value = response.data.results;
  })
  .catch(function(error){
    console.log(error)
  })
}

onMounted(()=>{
  get_spotlight()
})
</script>

<template>
  <div class="relative group">
    asdasd
  <div class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"></div>
  <Carousel v-bind="config">
    <Slide class="relative" v-for="(spotlight,index) in spotlight_list" :key="index">
        <img :src="spotlight.banner" class=" h-[500px] lg:h-[900px] overflow-hidden" alt="image" />
        <div class="absolute h-full w-full inset-shadow-custom"></div>
        <div class="absolute h-full w-full inset-shadow-custom2"></div>
        <div class="absolute w-full h-full ">
          <div class="flex items-center h-full  w-[400px] lg:w-[600px]">
            <div class="ml-10 space-y-5">
              <p class="text-primary font-semibold text-xl">#{{ index +1 }} Spotlight</p>
              <h1 class="text-3xl lg:text-4xl dark:text-white text-primary font-bold">{{ spotlight.title }}</h1>
              <div class="flex gap-x-5">
                <div class="flex items-center text-gray-200" v-if="spotlight.type">
                  <Icon icon="mdi:play" class="text-xl"/>
                  {{ spotlight.type }}
                </div>
                <div class="flex items-center text-gray-200" v-if="spotlight.duration">
                  <Icon icon="mdi:clock" class="text-xl"/>
                  {{ spotlight.duration }}
                </div>
                <div class="badge badge-outline-primary" v-if="spotlight.quality">
                  {{ spotlight.quality }}
                </div>
              </div>
              <p class="text-gray-200 line-clamp-4">{{ spotlight.description }}</p>
              <div>
                <router-link :to="{name:'watch',params:{id:spotlight.id}}">
                  <button class="btn btn-primary">
                    <Icon icon="mdi:play" class="text-xl mr-1"/>
                      Start Watching
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  <div class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
  </div>
</template>

<style scoped>
:root {
  background-color: #242424;
}

.inset-shadow-custom{
  box-shadow: inset 400px -100px 1500px 100px rgba(0, 0, 0, .8);
}
.inset-shadow-custom2{
  box-shadow: inset 100px -40px 50px 30px rgba(0, 0, 0,1);
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
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