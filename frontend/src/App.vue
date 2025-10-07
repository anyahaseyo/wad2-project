<template>
  <v-app>
    <!-- Login route renders only the view (no navbar, no sidebar) -->
    <router-view v-if="isLogin" />

    <!-- Authenticated layout: permanent sidebar, scrollable main -->
    <template v-else>
      <v-navigation-drawer
        app
        permanent
        width="260"
        class="sb-drawer"
      >
        <Sidebar />
      </v-navigation-drawer>

      <v-main class="sb-main">
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/sidebar.vue'

const route = useRoute()
const isLogin = computed(() => route.name === 'Login')
</script>

<style scoped>
.sb-drawer {
  border-right: 1px solid var(--surface-lighter);
  background: #fff;
}
.sb-main {
  min-height: 100vh;              /* content area scrolls */
  background: var(--background);
}
</style>
