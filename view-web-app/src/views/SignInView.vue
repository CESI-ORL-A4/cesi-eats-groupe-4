<script setup lang="ts">
import SignIn from '@/components/SignIn.vue'
import Banner from '@/components/Banner.vue'
</script>

<template>
  <Banner/>
  <SignIn/>
</template>


<style scoped>
.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #151515;
  height: 100%;
  gap: 5px;

}

.flex-container > div {
  border-radius: 5px;
  padding: 8px;
}


.item {
  /* flex:0 1 auto; */
  flex-shrink: 1;
  align-self: center;
  color: white;
}

.item-x {
  /* flex:0 1 auto; */
  align-self: center;
  color: white;
}
</style>