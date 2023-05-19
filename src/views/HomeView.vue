<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
<template>
  <div class="h-screen flex">
    <nav class="m-auto flex flex-col gap-4 underline">
      <RouterLink to="/with-flowbite">with flowbite</RouterLink>
      <RouterLink to="/with-primevue">with primevue</RouterLink>
    </nav>
  </div>
</template>

