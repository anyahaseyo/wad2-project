<script setup>
import { ref } from 'vue'

const friends = ref([
  { id: 'f1', name: 'Alex',  avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 'f2', name: 'Sam',   avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: 'f3', name: 'Jamie', avatar: 'https://i.pravatar.cc/100?img=25' },
])

// simple profile dialog 
const profileOpen = ref(false)
const selected = ref(null)

const days = ['S','M','T','W','T','F','S']
const habits = ['Exercise?', 'Drink 2L H2O?', 'Stretch?']
const friendSheet = [
  [true,false,true,false,true,false,true],
  [false,true,false,true,false,true,false],
  [false,false,true,true,false,false,true],
]

function openProfile(f){ selected.value = f; profileOpen.value = true }
function closeProfile(){ profileOpen.value = false; selected.value = null }
</script>

<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="8" class="pa-5">
          <div class="text-subtitle-1 font-weight-medium mb-2">Friends</div>
          <v-list>
            <v-list-item v-for="f in friends" :key="f.id" @click="openProfile(f)" class="cursor-pointer">
              <template #prepend><v-avatar><v-img :src="f.avatar"/></v-avatar></template>
              <v-list-item-title>{{ f.name }}</v-list-item-title>
              <template #append><v-icon>mdi-chevron-right</v-icon></template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="8" class="pa-5">
          <div class="text-subtitle-1 font-weight-medium mb-2">Activity Feed (demo)</div>
          <v-list>
            <v-list-item title="You nudged Alex" :subtitle="new Date().toLocaleString()">
              <template #prepend><v-icon color="secondary">mdi-hand-wave-outline</v-icon></template>
            </v-list-item>
            <v-list-item title="Sam hit a 5-day streak" :subtitle="new Date().toLocaleString()">
              <template #prepend><v-icon color="primary">mdi-fire</v-icon></template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Friend profile dialog -->
    <v-dialog v-model="profileOpen" max-width="720">
      <v-card v-if="selected">
        <v-card-title class="d-flex align-center ga-3">
          <v-avatar><v-img :src="selected.avatar"/></v-avatar>
          <span>{{ selected.name }}’s Habits</span>
        </v-card-title>
        <v-card-text>
          <div class="text-subtitle-2 text-center mb-3" style="letter-spacing:6px;">
            <span v-for="d in days" :key="d" class="mx-1">{{ d }}</span>
          </div>
          <div v-for="(h, hi) in habits" :key="h" class="d-flex align-center mb-2">
            <div class="text-body-2" style="min-width: 130px">{{ h }}</div>
            <div class="d-flex ga-2">
              <v-checkbox-btn v-for="(_, di) in days" :key="di" :model-value="friendSheet[hi][di]" disabled/>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/><v-btn variant="text" @click="closeProfile">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
