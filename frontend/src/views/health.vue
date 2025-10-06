<script setup>
const days = ['S','M','T','W','T','F','S']
const habits = ['Exercise?', 'Drink 2L H2O?', 'Stretch?', 'Eat fruit?', 'Eat veggies?', 'Clean?']
// hardcoded grid (false = unchecked)
const sheet = [
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
]
const weekLabel = new Date().toLocaleDateString()
</script>

<template>
  <v-container class="py-6">
    <v-row class="mb-4" align="center" justify="space-between">
      <v-chip color="primary" variant="tonal">Week of {{ weekLabel }}</v-chip>
      <v-btn variant="tonal" disabled><v-icon start>mdi-playlist-plus</v-icon>Add Habit</v-btn>
    </v-row>

    <v-card elevation="6" rounded="xl" class="pa-4" style="background:#f8f1f6; border:2px solid #e9d8ff;">
      <div class="text-h6 text-center font-italic mb-1">Your Habits</div>
      <div class="text-subtitle-2 text-center mb-4" style="letter-spacing:6px;">
        <span v-for="d in days" :key="d" class="mx-1">{{ d }}</span>
      </div>

      <div v-for="(h, hi) in habits" :key="`${h}-${hi}`" class="d-flex align-center mb-2">
        <div class="text-body-2" style="min-width: 130px">{{ h }}</div>
        <div class="d-flex ga-2">
          <v-checkbox-btn v-for="(_, di) in days" :key="`${hi}-${di}`" :model-value="sheet[hi][di]" disabled/>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
