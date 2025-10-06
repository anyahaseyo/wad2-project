<template>
  <v-app>
    <ThemeToggle />
    <Navbar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from '@/components/navbar.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>