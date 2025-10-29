<template lang="">
     <div>
          <div class="group">
               <div class="image-container w-full relative overflow-hidden block" :class="containerClass">
                    <div class="z-[99] absolute top-0 left-0 bottom-0 right-0" :class="imageClass"></div>
                    <img :src="props.url" class="absolute z-2 top-0 left-0 right-0 bottom-0 h-full w-full object-cover"  :alt="props.url" />
                    <div class="absolute z-10 transition  bg-opacity-0 group-hover:bg-muted/90 w-full h-full  bg-gray-100 dark:bg-transparent ">
                         <Icon icon="ic:baseline-airplay" class="hidden text-primary group-hover:block text-5xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "/>
                    </div>
               </div>
               <slot name="footer"></slot>
          </div>
     </div>
</template>
<script setup>

const props = defineProps({
     url:String,
     containerClass:{
          type:String,
          default:"bg-secondary pb-[150%]"
     },
     imageClass:{
          type:String,
          default:"bg-gradient-to-t from-[#ffffff] via-transparent to-50%  dark:from-[#000000] dark:via-transparent dark:to-30%"
     }
});

</script>
<style lang="">
     
</style>