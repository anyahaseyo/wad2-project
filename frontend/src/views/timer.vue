<script setup>
import { ref, computed, onUnmounted } from 'vue'

const presets = { 'Focus': 25, 'Short Break': 5, 'Long Break': 15 }
const mode = ref('Focus')
const minutes = ref(presets[mode.value])
const timeLeft = ref(presets[mode.value] * 60) // countdown in seconds
const running = ref(false)
let t = null

const total = computed(() => minutes.value * 60)
const pct = computed(() => Math.floor(100 * (total.value - timeLeft.value) / total.value))
const label = computed(() => {
  const mins = Math.floor(timeLeft.value / 60)
  const secs = timeLeft.value % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
})

function switchMode(m) { 
  if (running.value) return
  mode.value = m
  minutes.value = presets[m]
  timeLeft.value = presets[m] * 60
}

function start(){ 
  if (running.value) return
  running.value = true
  t = setInterval(() => { 
    timeLeft.value--
    if (timeLeft.value <= 0){ 
      clearInterval(t)
      running.value = false
      timeLeft.value = 0
    } 
  }, 1000) 
}

function stop(){ 
  running.value = false
  clearInterval(t) 
}

function reset(){ 
  stop()
  timeLeft.value = minutes.value * 60
}

onUnmounted(() => clearInterval(t))
</script>

<template>
  <v-container class="py-8" style="max-width: 1400px;">
    <v-row>
      <!-- Main Timer Card -->
      <v-col cols="12" md="7" lg="8">
        <v-card rounded="xl" elevation="0" class="timer-card pa-10">
          <div class="mb-2">
            <h2 class="text-h5 font-weight-medium mb-1" style="color: #6A7A5A;">Study Timer</h2>
            <p class="text-body-2 text-medium-emphasis">Focus with the Pomodoro Technique</p>
          </div>

          <!-- Study Session Section -->
          <div class="session-box mt-6 pa-6 rounded-lg">
            <div class="d-flex justify-space-between align-center mb-6">
              <div>
                <div class="text-subtitle-2 text-medium-emphasis mb-1">Study Session</div>
                <div class="text-caption text-medium-emphasis">Set your timer</div>
              </div>
              <v-chip color="#6A7A5A" size="small" variant="flat" class="px-4">Ready</v-chip>
            </div>

            <!-- Mode Selection Pills -->
            <div class="d-flex ga-2 mb-8 flex-wrap">
              <v-chip v-for="m in Object.keys(presets)" :key="m"
                      :color="mode===m?'#6A7A5A':'#BED2BA'" 
                      :variant="mode===m?'flat':'tonal'"
                      class="cursor-pointer px-4"
                      :class="{'text-white': mode===m}"
                      @click="switchMode(m)">
                {{ m }} • {{ presets[m] }}m
              </v-chip>
            </div>

            <!-- Timer Display -->
            <div class="text-center mb-8">
              <div class="timer-display mb-4">{{ label }}</div>
              <v-progress-linear :model-value="pct" height="8" rounded color="#6A7A5A" 
                                 bg-color="#E8EDE7" class="mb-2"/>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex ga-3 justify-center">
              <v-btn color="#6A7A5A" size="large" rounded="lg" @click="start" :disabled="running" 
                     class="px-8 text-none" elevation="0">
                <v-icon start>mdi-play</v-icon>Start
              </v-btn>
              <v-btn color="#8DAF9B" size="large" rounded="lg" variant="tonal" @click="stop" 
                     :disabled="!running" class="px-6 text-none" elevation="0">
                <v-icon start>mdi-pause</v-icon>Pause
              </v-btn>
              <v-btn size="large" rounded="lg" variant="text" @click="reset" 
                     class="text-none" style="color: #6A7A5A;">
                <v-icon start>mdi-restore</v-icon>Reset
              </v-btn>
            </div>

            <!-- Session Stats -->
            <div class="d-flex justify-space-around mt-8 pt-6" style="border-top: 1px solid #E8EDE7;">
              <div class="text-center">
                <div class="text-h4 font-weight-medium" style="color: #6A7A5A;">0</div>
                <div class="text-caption text-medium-emphasis">Sessions Today</div>
              </div>
              <div class="text-center">
                <div class="text-h4 font-weight-medium" style="color: #6A7A5A;">70%</div>
                <div class="text-caption text-medium-emphasis">Focus Score</div>
              </div>
            </div>
          </div>

          <!-- Focus Tips Section -->
          <div class="tips-section mt-6 pa-6 rounded-lg">
            <div class="text-subtitle-2 font-weight-medium mb-4" style="color: #6A7A5A;">Focus Tips</div>
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2 font-weight-medium mb-2">During Study Sessions:</div>
                <ul class="text-caption text-medium-emphasis" style="line-height: 1.8;">
                  <li>Turn off notifications</li>
                  <li>Keep water nearby</li>
                  <li>Use comfortable lighting</li>
                  <li>Take notes by hand when possible</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-body-2 font-weight-medium mb-2">During Breaks:</div>
                <ul class="text-caption text-medium-emphasis" style="line-height: 1.8;">
                  <li>Step away from your desk</li>
                  <li>Do light stretching</li>
                  <li>Get some fresh air</li>
                  <li>Avoid social media</li>
                </ul>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>

      <!-- Session Details Sidebar -->
      <v-col cols="12" md="5" lg="4">
        <v-card rounded="xl" elevation="0" class="details-card pa-6 mb-4">
          <div class="text-subtitle-1 font-weight-medium mb-1" style="color: #6A7A5A;">Session Details</div>
          <p class="text-caption text-medium-emphasis mb-4">Set up your study session</p>
          
          <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Subject</label>
            <v-select density="comfortable" variant="outlined" rounded="lg" 
                      placeholder="Select subject" hide-details/>
          </div>

          <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Task/Topic</label>
            <v-text-field density="comfortable" variant="outlined" rounded="lg" 
                          placeholder="What will you work on?" hide-details/>
          </div>

          <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Notes (optional)</label>
            <v-textarea density="comfortable" variant="outlined" rounded="lg" rows="3"
                        placeholder="Any additional notes..." hide-details/>
          </div>

          <v-btn block color="#6A7A5A" rounded="lg" variant="tonal" class="text-none mt-2">
            <v-icon start>mdi-cog</v-icon>Timer Settings
          </v-btn>
        </v-card>

        <!-- Daily Streaks Card -->
        <v-card rounded="xl" elevation="0" class="streaks-card pa-6">
          <div class="text-subtitle-2 font-weight-medium mb-4" style="color: #6A7A5A;">Daily Streaks</div>
          <v-row dense>
            <v-col cols="4" class="text-center">
              <div class="text-h5 font-weight-bold" style="color: #6A7A5A;">0</div>
              <div class="text-caption text-medium-emphasis">Study</div>
            </v-col>
            <v-col cols="4" class="text-center">
              <div class="text-h5 font-weight-bold" style="color: #6A7A5A;">0</div>
              <div class="text-caption text-medium-emphasis">Check-in</div>
            </v-col>
            <v-col cols="4" class="text-center">
              <div class="text-h5 font-weight-bold" style="color: #6A7A5A;">0</div>
              <div class="text-caption text-medium-emphasis">Wellness</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.timer-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FBF7 100%);
  border: 1px solid #E8EDE7;
}

.details-card, .streaks-card {
  background: #FFFFFF;
  border: 1px solid #E8EDE7;
}

.session-box {
  background: #FFFFFF;
  border: 1px solid #E8EDE7;
}

.tips-section {
  background: #F8FBF7;
  border: 1px solid #E8EDE7;
}

.timer-display {
  font-size: 72px;
  font-weight: 600;
  color: #6A7A5A;
  letter-spacing: -2px;
}

.cursor-pointer {
  cursor: pointer;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 4px;
}
</style>