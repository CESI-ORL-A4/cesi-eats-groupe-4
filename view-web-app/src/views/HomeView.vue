<script setup lang="ts">
import Banner from  '@/components/Banner.vue'
import addressAutocomplete from '@/components/addressAutocomplete.vue'
</script>

<template>
  <main>
    <Banner/>
    <addressAutocomplete/>
  </main>
</template>

<style scoped>
.getAddress{
  height: 20px;
  width: 120px;
}

</style>