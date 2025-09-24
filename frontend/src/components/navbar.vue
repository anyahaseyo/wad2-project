<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const search = ref('')

const tabs = [
  { to: '/dashboard', icon: 'mdi-view-dashboard', label: 'Dashboard' },
  { to: '/habits',    icon: 'mdi-check-all',      label: 'Habits' },
  { to: '/timer',     icon: 'mdi-timer-outline',  label: 'Timer' },
  { to: '/calendar',  icon: 'mdi-calendar-blank', label: 'Calendar' },
  { to: '/friends',   icon: 'mdi-account-group',  label: 'Friends' },
]
const active = computed(() => route.path)
</script>

<template>
  <v-app-bar flat height="64" class="elevation-1"
    :style="{ background: 'linear-gradient(90deg, rgba(124,131,253,0.15), rgba(123,237,159,0.10))' }">

    <v-app-bar-title class="d-flex align-center ga-2">
      <v-avatar size="32" class="bg-primary"><v-icon color="white">mdi-white-balance-sunny</v-icon></v-avatar>
      <span class="font-weight-bold">Tomodachi</span>
      <v-chip size="small" color="primary" variant="tonal" class="ms-2">beta</v-chip>
    </v-app-bar-title>

    <div class="d-none d-md-flex align-center ga-1">
      <v-btn v-for="t in tabs" :key="t.to" :to="t.to" variant="text" :color="active===t.to?'primary':undefined">
        <v-icon start>{{ t.icon }}</v-icon>{{ t.label }}
      </v-btn>
    </div>

    <v-spacer/>

    <v-btn variant="text" class="px-2">
      <v-avatar size="36" class="me-2"><v-img src="https://i.pravatar.cc/100?img=12" /></v-avatar>
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>

    <template #extension>
      <div class="d-none d-md-block w-100 py-2">
        <div class="mx-auto" style="max-width: 720px;">
          <v-text-field
            v-model="search" hide-details variant="solo-filled" rounded="pill"
            density="comfortable" prepend-inner-icon="mdi-magnify"
            placeholder="Search tasks, habits, events…"
          />
        </div>
      </div>
    </template>
  </v-app-bar>

  <v-bottom-navigation class="d-md-none" elevation="8" grow>
    <v-btn v-for="t in tabs" :key="t.to" :to="t.to" :color="active===t.to?'primary':undefined" variant="text">
      <v-icon>{{ t.icon }}</v-icon>
      <span>{{ t.label }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
