<script setup>
import { ref } from 'vue'
import { VCalendar } from 'vuetify/labs/VCalendar'

// Use real Date objects; no storage yet
const events = ref([
  { id: 'e1', title: 'Math study',  start: new Date('2025-09-25T10:00:00'), end: new Date('2025-09-25T11:00:00'), color: 'primary' },
  { id: 'e2', title: 'Gym',         start: new Date('2025-09-26T18:00:00'), end: new Date('2025-09-26T19:00:00'), color: 'success' },
  { id: 'e3', title: 'Group proj',  start: new Date('2025-09-27T14:00:00'), end: new Date('2025-09-27T15:30:00'), color: 'secondary' },
])

const type = ref('week')     // 'day' | 'week' | 'month'
const focus = ref(new Date())

function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate()+n); return x }
</script>

<template>
  <v-container class="py-6">
    <v-card rounded="xl" elevation="8" class="pa-3">
      <div class="d-flex align-center justify-space-between px-2">
        <div class="d-flex align-center ga-2">
          <v-btn icon @click="focus = addDays(focus, type==='month' ? -28 : -7)"><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-btn icon @click="focus = addDays(focus, type==='month' ? 28 : 7)"><v-icon>mdi-chevron-right</v-icon></v-btn>
          <v-btn variant="tonal" @click="focus = new Date()">Today</v-btn>
        </div>
        <v-segmented-buttons v-model="type">
          <v-btn value="day">Day</v-btn>
          <v-btn value="week">Week</v-btn>
          <v-btn value="month">Month</v-btn>
        </v-segmented-buttons>
      </div>

      <v-divider class="my-3" />

      <v-calendar
        :model-value="focus"
        :type="type"
        :events="events"
        event-color="color"
        color="primary"
      >
        <template #event="{ event }">
          <v-chip :color="event.color" size="small" class="ma-1" variant="elevated">
            {{ event.title }}
          </v-chip>
        </template>
      </v-calendar>
    </v-card>
  </v-container>
</template>
