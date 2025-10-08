<template>
  <div class="check-in-page">
    <div class="header">
      <h1>Daily Check-in</h1>
      <p class="subtitle">Track your wellness and mood</p>
    </div>

    <div class="main-content">
       Wellness Overview Sidebar 
      <div class="wellness-overview">
        <h3 class="section-title">
          <span class="icon">📊</span> Wellness Overview
        </h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Streak</div>
            <div class="stat-value">{{ streak }}/7</div>
            <div class="stat-sublabel">This week</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Total</div>
            <div class="stat-value">{{ totalCheckIns }}</div>
            <div class="stat-sublabel">Check-ins</div>
          </div>
        </div>
      </div>

       Today's Check-in 
      <div class="check-in-card">
        <div v-if="!isCompleted">
          <h3 class="section-title">Today's Check-in</h3>
          <p class="section-subtitle">How are you feeling today?</p>

           Mood Slider 
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">
                <span class="emoji">😊</span> Mood
              </span>
              <span class="slider-value">{{ mood }}/10</span>
            </div>
            <input 
              type="range" 
              v-model.number="mood" 
              min="0" 
              max="10" 
              class="slider"
            />
            <p class="slider-feedback">{{ getMoodFeedback }}</p>
          </div>

           Energy Slider 
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">
                <span class="emoji">⚡</span> Energy
              </span>
              <span class="slider-value">{{ energy }}/10</span>
            </div>
            <input 
              type="range" 
              v-model.number="energy" 
              min="0" 
              max="10" 
              class="slider"
            />
            <p class="slider-feedback">{{ getEnergyFeedback }}</p>
          </div>

           Sleep Slider 
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">
                <span class="emoji">😴</span> Sleep
              </span>
              <span class="slider-value">{{ sleep }}/10</span>
            </div>
            <input 
              type="range" 
              v-model.number="sleep" 
              min="0" 
              max="10" 
              class="slider"
            />
            <p class="slider-feedback">{{ getSleepFeedback }}</p>
          </div>

           Stress Slider 
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">
                <span class="emoji">😰</span> Stress
              </span>
              <span class="slider-value">{{ stress }}/10</span>
            </div>
            <input 
              type="range" 
              v-model.number="stress" 
              min="0" 
              max="10" 
              class="slider"
            />
            <p class="slider-feedback">{{ getStressFeedback }}</p>
          </div>

           Notes 
          <div class="notes-section">
            <label class="notes-label">Notes (optional)</label>
            <textarea 
              v-model="notes" 
              class="notes-textarea"
              placeholder="How was your day? Any thoughts or reflections..."
              rows="4"
            ></textarea>
          </div>

           Complete Button 
          <button @click="completeCheckIn" class="complete-btn">
            <span class="heart-icon">❤️</span>
            Complete Check-in
          </button>
        </div>

        <div v-else class="completion-message">
          <div class="success-icon">✓</div>
          <h3>Check-in Complete!</h3>
          <p>Great job tracking your wellness today.</p>
          <button @click="resetCheckIn" class="reset-btn">Check in Again</button>
        </div>
      </div>
    </div>

     Check-in History 
    <div class="history-section">
      <h3 class="section-title">Check-in History</h3>
      <p class="section-subtitle">Click on any date to view your check-in</p>
      
      <div class="calendar">
        <div class="calendar-header">
          <button @click="previousMonth" class="nav-btn">‹</button>
          <span class="month-year">{{ currentMonthYear }}</span>
          <button @click="nextMonth" class="nav-btn">›</button>
        </div>
        
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="calendar-day-header">
            {{ day }}
          </div>
          <div 
            v-for="date in calendarDates" 
            :key="date.key"
            @click="selectDate(date)"
            :class="['calendar-date', {
              'other-month': date.isOtherMonth,
              'today': date.isToday,
              'selected': date.isSelected,
              'has-checkin': date.hasCheckIn
            }]"
          >
            {{ date.day }}
          </div>
        </div>
      </div>
    </div>

     Wellness Tips 
    <div class="wellness-tips">
      <h3 class="section-title">Wellness Tips</h3>
      
      <div class="tips-grid">
        <div class="tip-card">
          <h4 class="tip-title">
            <span class="tip-icon">😊</span> Mood Boosters:
          </h4>
          <ul class="tip-list">
            <li>Practice gratitude daily</li>
            <li>Connect with friends and family</li>
          </ul>
        </div>
        
        <div class="tip-card">
          <h4 class="tip-title">
            <span class="tip-icon">⚡</span> Energy Management:
          </h4>
          <ul class="tip-list">
            <li>Maintain regular sleep schedule</li>
            <li>Stay hydrated throughout the day</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const mood = ref(7)
const energy = ref(7)
const sleep = ref(7)
const stress = ref(3)
const notes = ref('')
const isCompleted = ref(false)
const streak = ref(0)
const totalCheckIns = ref(0)

// Calendar state
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Computed properties
const getMoodFeedback = computed(() => {
  if (mood.value >= 8) return 'Feeling great!'
  if (mood.value >= 6) return 'Pretty good'
  if (mood.value >= 4) return 'Okay'
  return 'Could be better'
})

const getEnergyFeedback = computed(() => {
  if (energy.value >= 8) return 'High energy!'
  if (energy.value >= 6) return 'Good energy'
  if (energy.value >= 4) return 'Moderate energy'
  return 'Low energy'
})

const getSleepFeedback = computed(() => {
  if (sleep.value >= 8) return 'Great sleep!'
  if (sleep.value >= 6) return 'Good sleep'
  if (sleep.value >= 4) return 'Okay sleep'
  return 'Poor sleep'
})

const getStressFeedback = computed(() => {
  if (stress.value >= 8) return 'Very stressed'
  if (stress.value >= 6) return 'Moderate stress'
  if (stress.value >= 4) return 'Some stress'
  return 'Low stress'
})

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  
  const dates = []
  
  // Previous month dates
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push({
      day: prevLastDate - i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      hasCheckIn: false,
      key: `prev-${prevLastDate - i}`
    })
  }
  
  // Current month dates
  const today = new Date()
  for (let i = 1; i <= lastDate; i++) {
    const isToday = i === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear()
    
    dates.push({
      day: i,
      isOtherMonth: false,
      isToday,
      isSelected: i === selectedDate.value.getDate() && 
                  month === selectedDate.value.getMonth() &&
                  year === selectedDate.value.getFullYear(),
      hasCheckIn: i === 8, // Example: Oct 8 has check-in
      key: `current-${i}`
    })
  }
  
  // Next month dates
  const remainingDays = 42 - dates.length
  for (let i = 1; i <= remainingDays; i++) {
    dates.push({
      day: i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      hasCheckIn: false,
      key: `next-${i}`
    })
  }
  
  return dates
})

// Methods
const completeCheckIn = () => {
  isCompleted.value = true
  totalCheckIns.value++
  streak.value++
}

const resetCheckIn = () => {
  isCompleted.value = false
  mood.value = 7
  energy.value = 7
  sleep.value = 7
  stress.value = 3
  notes.value = ''
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const selectDate = (date) => {
  if (!date.isOtherMonth) {
    selectedDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      date.day
    )
  }
}
</script>

<style scoped>
.check-in-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, rgba(170,196,188,0.08), rgba(215,203,178,0.05));
  min-height: 100vh;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Wellness Overview */
.wellness-overview {
  background: white;
  border: 1px solid rgba(170,196,188,0.3);
  border-radius: 12px;
  padding: 1.25rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  gap: 0.75rem;
}

.stat-card {
  background: linear-gradient(135deg, rgba(170,196,188,0.12), rgba(215,203,178,0.08));
  border: 1px solid rgba(170,196,188,0.25);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.4rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #5a8a7a;
  margin-bottom: 0.2rem;
}

.stat-sublabel {
  font-size: 0.75rem;
  color: #888;
}

/* Check-in Card */
.check-in-card {
  background: linear-gradient(135deg, rgba(170,196,188,0.15), rgba(215,203,178,0.1));
  border: 1.5px solid rgba(170,196,188,0.4);
  border-radius: 12px;
  padding: 2rem;
}

.section-subtitle {
  color: #666;
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
}

/* Sliders */
.slider-group {
  margin-bottom: 1.75rem;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.slider-label {
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.emoji {
  font-size: 1.1rem;
}

.slider-value {
  font-weight: 600;
  color: #5a8a7a;
  font-size: 0.95rem;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #e5e5e5 0%, #5a8a7a 100%);
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 0.5rem;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #5a8a7a;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #5a8a7a;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.slider-feedback {
  font-size: 0.85rem;
  color: #5a8a7a;
  margin: 0;
  font-weight: 500;
}

/* Notes */
.notes-section {
  margin-bottom: 1.5rem;
}

.notes-label {
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.notes-textarea {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  background: white;
}

.notes-textarea:focus {
  outline: none;
  border-color: #5a8a7a;
}

/* Complete Button */
.complete-btn {
  width: 100%;
  padding: 1rem;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.complete-btn:hover {
  background: #2a2a2a;
}

.heart-icon {
  font-size: 1.1rem;
}

/* Completion Message */
.completion-message {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #5a8a7a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
}

.completion-message h3 {
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.completion-message p {
  color: #666;
  margin: 0 0 1.5rem 0;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #5a8a7a;
  border: 1px solid #5a8a7a;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.reset-btn:hover {
  background: #f5f5f5;
}

/* Calendar */
.history-section {
  background: white;
  border: 1px solid rgba(170,196,188,0.3);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.calendar {
  max-width: 500px;
  margin-top: 1.5rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.month-year {
  font-weight: 600;
  color: #1a1a1a;
}

.nav-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #5a8a7a;
  padding: 0.25rem 0.75rem;
}

.nav-btn:hover {
  background: #f5f5f5;
  border-radius: 4px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.calendar-day-header {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  padding: 0.5rem;
}

.calendar-date {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.calendar-date:hover {
  background: #f5f5f5;
}

.calendar-date.other-month {
  color: #ccc;
}

.calendar-date.today {
  background: #1a1a1a;
  color: white;
  font-weight: 600;
}

.calendar-date.selected {
  background: #5a8a7a;
  color: white;
}

.calendar-date.has-checkin {
  position: relative;
}

.calendar-date.has-checkin::after {
  content: '';
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  background: #5a8a7a;
  border-radius: 50%;
}

.calendar-date.has-checkin.today::after {
  background: white;
}

/* Wellness Tips */
.wellness-tips {
  background: white;
  border: 1px solid rgba(170,196,188,0.3);
  border-radius: 12px;
  padding: 2rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tip-card {
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(170,196,188,0.08), rgba(215,203,178,0.05));
  border: 1px solid rgba(170,196,188,0.2);
  border-radius: 10px;
}

.tip-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tip-icon {
  font-size: 1.1rem;
}

.tip-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #666;
}

.tip-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.tip-list li:last-child {
  margin-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>