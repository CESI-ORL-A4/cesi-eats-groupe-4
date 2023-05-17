<script setup lang="ts">
import * as L from 'leaflet';
import { onMounted } from 'vue';
onMounted(() => {
var map = L.map('map').setView([51.505, -0.09], 13);
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    maxZoom: 19,
//    attribution: '© OpenStreetMap'
//}).addTo(map);
L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=kILBKCmtFFrLRPi89NAKi0YgTCraZyPAfOHncLCV1Rp7Tc3Aw5XvnLLxKOgw8emx', {}).addTo(map);
map.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")
})
</script>

<template>
    <section id="map">
    </section>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
