<template>
  <div class="d-flex align-center justify-space-between">
    <v-icon :icon="darkOn ? 'mdi-weather-night' : 'mdi-white-balance-sunny'" size="18" />
    <v-switch
      v-model="darkOn"
      hide-details
      density="compact"
      color="primary"
      inset
      class="ma-0 pa-0"
    />
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { ref, onMounted, watch } from 'vue'

const theme = useTheme()
const darkOn = ref(false)

function updateHtmlTheme() {
  const html = document.documentElement
  if (darkOn.value) html.setAttribute('data-theme', 'dark')
  else html.removeAttribute('data-theme')
}

onMounted(() => {
  const saved = localStorage.getItem('sb_theme')
  theme.global.name.value = saved || 'sbLight'
  darkOn.value = theme.global.name.value === 'sbDark'
  updateHtmlTheme()
})

watch(darkOn, (val) => {
  theme.global.name.value = val ? 'sbDark' : 'sbLight'
  localStorage.setItem('sb_theme', theme.global.name.value)
  updateHtmlTheme()
})
</script>
