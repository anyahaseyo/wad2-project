// import { ref, computed, watch } from 'vue'
// export const days = ['S','M','T','W','T','F','S']
// const LS_KEY = 'demo_my_habits'

// function mondayOf(d = new Date()) {
//   const date = new Date(d)
//   const day = date.getDay()
//   const diff = (day === 0 ? -6 : 1) - day
//   date.setDate(date.getDate() + diff)
//   date.setHours(0,0,0,0)
//   return date
// }
// function weekKeyFrom(d = new Date()) { return mondayOf(d).toISOString().slice(0,10) }

// const DEFAULT = {
//   habits: ['Exercise?', 'Drink 2L H2O?', 'Stretch?', 'Eat fruit?', 'Eat veggies?', 'Clean?'],
//   weeks: {}
// }

// // --- load + migrate if an old structure is detected
// let initial
// try {
//   const parsed = JSON.parse(localStorage.getItem(LS_KEY) || 'null')
//   if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) || parsed.people) {
//     initial = DEFAULT
//   } else {
//     initial = parsed
//   }
// } catch { initial = DEFAULT }

// const state = ref(initial)
// const weekKey = ref(weekKeyFrom())
// const ready = ref(false)

// function ensureWeek() {
//   if (!state.value.weeks[weekKey.value]
//       || !Array.isArray(state.value.weeks[weekKey.value])
//       || state.value.weeks[weekKey.value].length !== state.value.habits.length) {
//     state.value.weeks[weekKey.value] = state.value.habits.map(() => Array(7).fill(false))
//   }
//   ready.value = true
// }
// ensureWeek()

// watch([state, weekKey], () => {
//   ensureWeek()
//   localStorage.setItem(LS_KEY, JSON.stringify(state.value))
// }, { deep: true })

// export function useHabits() {
//   const sheet = computed(() => state.value.weeks[weekKey.value] || [])
//   function toggle(h, d) { if (sheet.value[h]) sheet.value[h][d] = !sheet.value[h][d] }
//   function addHabit(label) {
//     const name = (label || '').trim()
//     if (!name) return
//     state.value.habits.push(name)
//     state.value.weeks[weekKey.value].push(Array(7).fill(false))
//   }
//   function nextWeek(){ weekKey.value = weekKeyFrom(new Date(mondayOf().getTime() + 7*86400000)) }
//   function prevWeek(){ weekKey.value = weekKeyFrom(new Date(mondayOf().getTime() - 7*86400000)) }
//   function getFriendHabits(name) {
//     return {
//       name,
//       habits: state.value.habits.slice(),
//       sheet: state.value.habits.map(() => Array.from({ length: 7 }, () => Math.random() < 0.3))
//     }
//   }
//   return { state, days, weekKey, sheet, ready, toggle, addHabit, nextWeek, prevWeek, getFriendHabits }
// }
