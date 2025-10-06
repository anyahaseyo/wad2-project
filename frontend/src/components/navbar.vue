<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref({
  name: 'sandra',
  level: 1,
  avatar: '👑',
  streaks: {
    study: 0,
    checkin: 0,
    wellness: 0
  }
})

const menuItems = [
  { to: '/dashboard', icon: 'mdi-view-dashboard', label: 'Dashboard' },
  { to: '/timer', icon: 'mdi-timer-outline', label: 'Study Timer' },
  { to: '/tasks', icon: 'mdi-checkbox-marked-outline', label: 'Tasks' },
  { to: '/progress', icon: 'mdi-chart-bar', label: 'Progress' },
  { to: '/health', icon: 'mdi-heart-outline', label: 'Daily Check-in' },
  { to: '/social', icon: 'mdi-account-group', label: 'Social' },
  { to: '/profile', icon: 'mdi-account', label: 'Profile' },
]

const active = computed(() => route.path)
</script>

<template>
  <v-navigation-drawer
    permanent
    width="240"
  >
    <!-- Header -->
    <div class="pa-4 d-flex align-center ga-2 border-b">
      <span class="text-h6">🐱</span>
      <span class="font-weight-bold text-h6">TomoPomo</span>
    </div>

    <!-- User Profile Section -->
    <div class="pa-4 border-b">
      <div class="d-flex align-center ga-3">
        <v-avatar size="40" color="orange">
          <span class="text-h6">{{ user.avatar }}</span>
        </v-avatar>
        <div>
          <div class="font-weight-medium text-body-2">{{ user.name }}</div>
          <div class="text-caption text-grey">Level {{ user.level }}</div>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <v-list nav density="compact" class="pa-2">
      <v-list-item
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :active="active === item.to"
        rounded="lg"
        class="mb-1"
      >
        <template #prepend>
          <v-icon size="20">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-body-2">{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer />

    <!-- Daily Streaks Footer -->
    <div class="pa-4 border-t">
      <v-card variant="flat" color="grey-lighten-4">
        <v-card-text class="pa-3">
          <div class="text-body-2 font-weight-medium mb-2">Daily Streaks</div>
          <div class="d-flex justify-space-around">
            <div class="text-center">
              <div class="text-caption text-grey-darken-1">Study</div>
              <div class="font-weight-bold text-body-2">{{ user.streaks.study }}</div>
            </div>
            <div class="text-center">
              <div class="text-caption text-grey-darken-1">Check-in</div>
              <div class="font-weight-bold text-body-2">{{ user.streaks.checkin }}</div>
            </div>
            <div class="text-center">
              <div class="text-caption text-grey-darken-1">Wellness</div>
              <div class="font-weight-bold text-body-2">{{ user.streaks.wellness }}</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-navigation-drawer>
</template>