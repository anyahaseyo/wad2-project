<script setup>
import { ref, computed, onUnmounted } from 'vue'

const presets = { 'Focus': 25, 'Short Break': 5, 'Long Break': 15 }
const mode = ref('Focus')
const minutes = ref(presets[mode.value])
const secs = ref(0)
const running = ref(false)
let t = null

const total = computed(() => minutes.value * 60)
const pct = computed(() => Math.floor(100 * (total.value - secs.value) / total.value))
const label = computed(() => new Date(secs.value * 1000).toISOString().substr(14,5))

function switchMode(m) { if (running.value) return; mode.value = m; minutes.value = presets[m]; secs.value = 0 }
function start(){ if (running.value) return; running.value = true; t = setInterval(() => { secs.value++; if (secs.value>=total.value){ clearInterval(t); running.value=false; secs.value=0 } }, 1000) }
function stop(){ running.value=false; clearInterval(t) }
function reset(){ stop(); secs.value=0 }
onUnmounted(() => clearInterval(t))
</script>

<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12" md="8" lg="7">
        <v-card rounded="xl" elevation="10" class="pa-8 d-flex flex-column align-center">
          <div class="d-flex ga-2 mb-4">
            <v-chip v-for="m in Object.keys(presets)" :key="m"
                    :color="mode===m?'primary':undefined" variant="elevated"
                    class="cursor-pointer" @click="switchMode(m)">
              {{ m }} • {{ presets[m] }}m
            </v-chip>
          </div>

          <v-progress-circular :model-value="pct" size="220" width="14" color="primary">
            <div class="text-h3 font-weight-bold">{{ label }}</div>
          </v-progress-circular>

          <div class="mt-6 d-flex ga-3">
            <v-btn color="primary" @click="start" :disabled="running"><v-icon start>mdi-play</v-icon>Start</v-btn>
            <v-btn variant="tonal" @click="stop" :disabled="!running"><v-icon start>mdi-pause</v-icon>Pause</v-btn>
            <v-btn variant="text" @click="reset"><v-icon start>mdi-restore</v-icon>Reset</v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" lg="5">
        <v-card rounded="xl" elevation="8" class="pa-6">
          <div class="text-subtitle-1 font-weight-medium">Session Stats (demo)</div>
          <v-divider class="my-3"/>
          <div class="text-body-2 text-medium-emphasis">Static preview — no persistence.</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
