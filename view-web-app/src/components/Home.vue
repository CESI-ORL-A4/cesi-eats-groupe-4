<script setup lang="ts">
import Map from "./map/Map.vue";

</script>

<template>
  <div class="home-wrapper">
    <p>Retrouvez <span>2300</span> restaurants partout en France :</p>
    <div class="map-container">
        <Map/>
    </div>
  </div>
</template>

<style>
.home-wrapper {
  height: 100%;
  padding-top: 30px;
}

p {
  margin-left: 20px;
}

p span {
  font-weight: bold;
}

.map-container {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border-top: solid 1px #a8a8a8;
}
</style>
