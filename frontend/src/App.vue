<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <div class=" lg:max-w-screen-2xl mx-auto px-5 lg:px-5 py-10">
    <RouterView/>
  </div>
  <Footer />
</template>
