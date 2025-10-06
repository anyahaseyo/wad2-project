<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('dark')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<template>
  <v-btn
    class="theme-toggle"
    icon
    variant="flat"
    @click="toggleTheme"
  >
    <v-icon v-if="theme === 'dark'">mdi-white-balance-sunny</v-icon>
    <v-icon v-else>mdi-moon-waning-crescent</v-icon>
  </v-btn>
</template>