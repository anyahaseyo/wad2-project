<script setup>
const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
</script>

<template>
  <v-container class="py-6">
    <!-- Hero -->
    <v-card rounded="xl" elevation="8" class="pa-6"
            :style="{ background: 'linear-gradient(135deg,#7C83FD22,#7BED9F22)' }">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div>
          <div class="text-overline text-medium-emphasis">{{ today }}</div>
          <div class="text-h5 font-weight-bold">Keep the streak alive 🔥</div>
          <div class="text-body-2 text-medium-emphasis">Small wins fuel your Tomodachi.</div>
        </div>
        <div class="d-flex align-center ga-4">
          <v-progress-circular :model-value="68" size="72" width="8" color="primary">
            <div class="text-caption">EXP</div>
          </v-progress-circular>
          <v-avatar size="64">
            <v-img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=200&auto=format&fit=crop" />
          </v-avatar>
        </div>
      </div>
    </v-card>

    <v-row class="mt-4" align="stretch">
      <v-col cols="12" md="8" class="d-flex flex-column ga-4">
        <!-- Daily Check-in  -->
        <v-card class="pa-4" rounded="xl" elevation="6">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div class="text-subtitle-1 font-weight-medium">Daily Check-in</div>
            <div class="text-caption text-medium-emphasis">Last: —</div>
          </div>
          <v-row class="mt-2">
            <v-col cols="12" md="6">
              <div class="text-caption mb-1">Mood</div>
              <v-slider :model-value="4" :min="1" :max="5" :step="1" show-ticks="always" tick-size="3" disabled />
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-caption mb-1">Energy</div>
              <v-slider :model-value="3" :min="1" :max="5" :step="1" show-ticks="always" tick-size="3" disabled />
            </v-col>
          </v-row>
          <v-btn color="primary" disabled><v-icon start>mdi-check-decagram</v-icon> Save Check-in</v-btn>
        </v-card>

        <!-- Tasks  -->
        <v-card class="pa-4" rounded="xl" elevation="6">
          <div class="text-subtitle-1 font-weight-medium mb-2">Tasks</div>
          <v-list lines="one">
            <v-list-item title="BIO110 reading" subtitle="Due today">
              <template #prepend><v-checkbox-btn disabled/></template>
            </v-list-item>
            <v-list-item title="Submit CS lab 2" subtitle="Due tomorrow">
              <template #prepend><v-checkbox-btn disabled/></template>
            </v-list-item>
            <v-list-item title="Laundry + clean desk">
              <template #prepend><v-checkbox-btn model-value disabled/></template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="d-flex flex-column ga-4">
        <!-- Pet panel -->
        <v-card rounded="xl" elevation="8" class="pa-5">
          <div class="d-flex align-center justify-space-between">
            <div class="text-subtitle-1 font-weight-medium">Your Tomodachi</div>
            <v-chip color="secondary" variant="tonal">Lv 3</v-chip>
          </div>
          <div class="d-flex align-center ga-3 mt-3">
            <v-avatar size="72"><v-img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=200&auto=format&fit=crop"/></v-avatar>
            <v-chip color="success" variant="flat"><v-icon start>mdi-emoticon</v-icon>72%</v-chip>
          </div>
          <v-progress-linear class="mt-4" :model-value="65" height="12" rounded>Hunger</v-progress-linear>
          <v-progress-linear class="mt-3" :model-value="60" height="12" rounded>Energy</v-progress-linear>
          <v-progress-linear class="mt-3" :model-value="80" height="12" rounded>Cleanliness</v-progress-linear>
          <div class="d-flex ga-2 mt-4">
            <v-btn block variant="elevated" disabled>Feed</v-btn>
            <v-btn block variant="elevated" disabled>Rest</v-btn>
            <v-btn block variant="elevated" disabled>Clean</v-btn>
          </div>
        </v-card>

        <!-- Timer  -->
        <v-card rounded="xl" elevation="6" class="pa-5">
          <div class="text-subtitle-1 font-weight-medium mb-3">Study Timer</div>
          <v-progress-circular :model-value="0" size="120" width="12">
            <span class="text-h6">25:00</span>
          </v-progress-circular>
          <div class="d-flex ga-2 mt-3">
            <v-btn color="primary" to="/timer">Open Timer</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
