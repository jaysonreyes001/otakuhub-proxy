<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <div class="mx-auto px-5 lg:px-5 ">
      <router-view />
  </div>
  <Footer />
</template>