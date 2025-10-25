<template lang="">
  <div class="w-full">

    <Video v-if="!video_loading" :episode_details="episode_details" />
    <div class="relative w-full h-[800px]" v-else>
      <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
        <span class="animate-spin border-2 border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
      </span>
    </div>
    <div class="flex justify-center">
    <div class="max-w-7xl grid grid-cols-2 gap-20 px-10 mt-[50px]">
      <div>
        <p class="mt-5 text-lg font-semibold text-primary">{{anime_details.title}}</p>
        <p v-if="single_episode" class="mt-4 text-3xl font-semibold">EP{{single_episode?.number}} - {{single_episode?.title}}</p>
        <div class="mt-4 flex gap-x-2">
          <div class="flex items-center text-gray-400 ">
            <Icon icon="mdi:play" class="text-xl"/>
            {{ anime_details.type }}
          </div>
          <span class="text-gray-400">•</span>
          <div class="flex items-center text-gray-400 ">
            {{ anime_details.subOrDub }}
          </div>
          <span class="text-gray-400">•</span>
          <div class="flex items-center text-gray-400 ">
            {{ anime_details.status }}
          </div>
          <span class="text-gray-400">•</span>
          <div class="flex items-center text-gray-400 ">
            {{ anime_details.season }}
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-400 ">{{anime_details.description}}</p>
        <div class="mt-10">
          
            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li class="pb-3 sm:pb-4">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Japanse Title
                        </p>
                    </div>
                    <div class="inline-flex items-center text-xs w-[300px] font-semibold text-gray-900 dark:text-white">
                        {{anime_details.japaneseTitle}}
                    </div>
                  </div>
              </li>
              <li class="pb-3 sm:pb-4">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Total Episodes
                        </p>
                    </div>
                    <div class="inline-flex items-center text-[] font-semibold text-gray-900 dark:text-white">
                        {{anime_details.totalEpisodes}} Episode/s
                    </div>
                  </div>
              </li>

              <li  v-if="anime_details.genres" class="pb-3 sm:pb-4">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Genre
                        </p>
                    </div>
                    <div class="inline-flex items-center text-[] font-semibold text-gray-900 dark:text-white">
                        {{anime_details.genres.join(" • ")}}
                    </div>
                  </div>
              </li>

            </ul>

        </div>
      </div>
      <div>
        <p class="text-xl font-semibold mb-2">Episode List</p>
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-slate-800">
          <li @click="change_episode(episode)" :class="episode.number == episode_details.number ? 'bg-slate-100 dark:bg-primary ' : '' " class=" p-2 cursor-pointer transition dark:hover:bg-primary hover:bg-slate-100 " v-for="(episode,index) in episode_list">
            <div class="flex  space-x-4 rtl:space-x-reverse">
                <div class="shrink-0">
                    <img class="w-[180px] h-[80px] object-cover" :src="anime_details.image"  alt="Neil image">
                </div>
                <div class="flex-1 min-w-0 mt-2">
                    <p :class="episode.number == episode_details.number ? 'text-black' : 'dark:text-white  text-gray-900'" class="text-lg font-medium  truncate">
                      EP{{episode.number}} - {{episode.title}}
                    </p>
                    <p :class="episode.number == episode_details.number ? ' text-gray-500 dark:text-gray-200' : 'dark:text-gray-400  text-gray-500'" class="text-sm truncate">
                        {{episode.isSubbed ? 'Sub' : ''}} {{episode.isSubbed && episode.isDubbed ? '|' : ''}} {{episode.isDubbed ? 'Dub' : ''}}
                    </p>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>

import Video from "@/Pages/Watch/video.vue";

import axios_instance from "@/plugin/axios.js";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from 'vue-router';
const video_loading = ref(false);
const route = useRoute();
const anime_details = ref({});
const episode_list = ref([]);
const single_episode = ref({});
const episode_details = reactive({
  id:route.params.episode_id != '' ? route.params.episode_id  : '' ,
  number:1,
  intro:{},
  outro:{},
  source:[],
  subtitles:[],
});

const get_anime_info = async () => {
  const anime_id = route.params.id;
  await axios_instance.get("/info",{params:{
    id:anime_id
  }})
  .then(function(response){
    anime_details.value = response.data;
    episode_list.value = response.data.episodes;
    get_episode_info();
  })
  .catch(function(error){
    console.log(error)
  })
}


const get_episode_info = async () => {
    video_loading.value = true;
    await axios_instance.get("/watch/"+episode_details.id)
    .then(response => {
      const data = response.data;
      episode_details.intro = data.intro;
      episode_details.outro = data.outro;
      episode_details.source = data.sources;
      episode_details.subtitles = data.subtitles;
      single_episode.value = episode_list.value.find(item => item.number == episode_details.number);
    })
    .catch(error=>{
      console.log(error)
    })

    video_loading.value = false;
    
}


const change_episode =  (episode) => {
  episode_details.id = episode.id
  episode_details.number = episode.number;
  get_episode_info();
}

onMounted(()=>{
  get_anime_info();
})

</script>
<style lang="">
  
</style>