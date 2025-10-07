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

function updateProfileSettings() {
  // Update profile settings to match theme toggle
  const preferences = JSON.parse(localStorage.getItem('user_preferences') || '{}')
  preferences.theme = darkOn.value ? 'dark' : 'light'
  localStorage.setItem('user_preferences', JSON.stringify(preferences))
}

onMounted(() => {
  // Check if profile settings exist first
  const profilePrefs = JSON.parse(localStorage.getItem('user_preferences') || '{}')
  
  if (profilePrefs.theme) {
    // Use profile settings
    darkOn.value = profilePrefs.theme === 'dark'
    theme.global.name.value = darkOn.value ? 'sbDark' : 'sbLight'
    updateHtmlTheme()
  } else {
    // Fallback to old system
    const saved = localStorage.getItem('sb_theme')
    theme.global.name.value = saved || 'sbLight'
    darkOn.value = theme.global.name.value === 'sbDark'
    updateHtmlTheme()
    
    // Save to profile settings
    updateProfileSettings()
  }
})

watch(darkOn, (val) => {
  theme.global.name.value = val ? 'sbDark' : 'sbLight'
  updateHtmlTheme()
  updateProfileSettings()
  
  // Also save to old system for compatibility
  localStorage.setItem('sb_theme', theme.global.name.value)
})
</script>
