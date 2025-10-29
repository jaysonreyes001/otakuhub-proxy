<script setup>
import { onMounted, ref } from 'vue';
import Image from '../Components/Image.vue';
import SwiperVertical from '../Components/SwiperVertical.vue';
import axios_instance from "@/plugin/axios.js";

const data_list = ref([]);
const loading = ref(false);

const get_data = async () => {
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
  get_data()
})
</script>

<template>
  <div>
    <div class="relative mt-10" v-if="!loading">
      <div class="flex items-center gap-x-2 mb-4">
        <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
          <h1 class="text-lg font-bold">TOP AIRING</h1>
      </div>
      <SwiperVertical :list="data_list">
          <template v-slot="{data,index}">
              <router-link :to="{name:'info',params:{id:data.id}}">
                  <Image :url="data.image">
                    <template #footer>
                      <p class="break-words text-sm lg:text-lg font-semibold mt-2">{{ data.title }}</p>
                        <div class="flex justify-between ">
                          <p class="text-gray-400 text-xs mt-1">Episode {{ data.sub }}</p>
                          <p class="text-gray-400 text-xs mt-1 ">{{ data.sub > 1 ? 'Sub' : '' }} 
                            {{ data.sub > 1 && data.dub > 1 ? '|' :'' }} 
                            {{ data.dub > 1 ? 'Dub' : '' }}  
                          </p>
                        </div>
                    </template>
                  </Image>
                </router-link>
          </template>
      </SwiperVertical>
    </div>
    <div class="relative h-[250px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>