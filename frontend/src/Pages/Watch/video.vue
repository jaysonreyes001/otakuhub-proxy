<template lang="">
  <div class="w-full">
     <video ref="video" class="w-full h-[400px] lg:h-[800px]" controls autoplay></video>
  </div>
</template>
<script setup>
import axios from 'axios';
import Hls from 'hls.js';
import { onBeforeMount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  episode_details:Object
});
const hls = ref(null);
const video = ref(null);
const source = ref("");
const subtitle = ref("");

const parseVTT = (vttText) => {
  const cues = [];
  const lines = vttText.split('\n');
  let cue = null;

  lines.forEach(line => {
    line = line.trim();

    // Match cue time range (00:00:01.500 --> 00:00:05.000)
    const timeMatch = line.match(/^([\d:.]+) --> ([\d:.]+)$/);
    if (timeMatch) {
      if (cue) {
        cues.push(cue);
      }
      cue = {
        start: timeToSeconds(timeMatch[1]),
        end:  timeToSeconds(timeMatch[2]),
        text: '',
      };
    } else if (cue) {
      if(cue.text !="" && line != "" ){
        cue.text = cue.text+"\n"+line;
      }
      else{
        cue.text+=line;
      } 
    }

  });

  if (cue) {
    cues.push(cue);
  }
  return cues;
}
const timeToSeconds = (time) => {
    const parts = time.split(':');
    let seconds = 0;
    if (parts.length === 3) {
      seconds += parseFloat(parts[0]) * 3600; // hours
      seconds += parseFloat(parts[1]) * 60;   // minutes
    }
    else if (parts.length === 2) {
      seconds += parseFloat(parts[0]) * 60;
    }
    seconds += parseFloat(parts[parts.length - 1]); // seconds and milliseconds
    return seconds;
}


const render_video = () => {
  if (Hls.isSupported()) {
      hls.value = new Hls();
      hls.value.loadSource(`http://localhost:3001/proxy?url=${encodeURIComponent(source.value)}`);
      hls.value.attachMedia(video.value);
      hls.value.on(Hls.Events.MANIFEST_PARSED, async () => {
        const track = video.value.addTextTrack('subtitles', 'English', 'en');
        track.mode = 'showing';
        await fetch(subtitle.value.url)
          .then(response => response.text())
          .then(subtitles => {
            const cues = parseVTT(subtitles);
            // Add the cue to the text track
            cues.forEach(cue => {
              const cueElement = new VTTCue(cue.start, cue.end, cue.text);
              cueElement.position = 50;
              cueElement.line = 100;
              track.addCue(cueElement);
            });
          })
      });
      video.value.addEventListener('play', () => {
          video.value.requestFullscreen();
        })
    }
}

function clearVideo(){
  source.value = "";
  subtitle.value = "";
  video.value.pause();
  video.value.src = "";
  video.currentTime = 0;
  if(hls.value){
     hls.value.destroyed();
  }
}
onMounted(()=>{
  clearVideo();
  if(props.episode_details.source.length > 0){
    const episode_details = props.episode_details;
    source.value = episode_details.source[0].url;
    subtitle.value = episode_details.subtitles.find(item => item.lang == 'English');
    render_video();
  }
})


</script>
<style lang="">
  
</style>