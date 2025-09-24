// import { ref, watch } from 'vue'

// const LS = {
//   habits: 'demo_habits',
//   tasks: 'demo_tasks',
//   checkin: 'demo_checkin',
//   pet: 'demo_pet',
//   meta: 'demo_meta'
// }

// function read(k, fallback) {
//   try { return JSON.parse(localStorage.getItem(k)) ?? fallback }
//   catch { return fallback }
// }
// function write(k, v) { localStorage.setItem(k, JSON.stringify(v)) }

// export function useDemoData() {
//   const meta = ref(read(LS.meta, { exp: 30, level: 2, streak: 3 }))
//   const checkin = ref(read(LS.checkin, { date: null, mood: 3, energy: 3 }))
//   const habits = ref(read(LS.habits, [
//     { id: 'h1', name: 'Hydrate', icon: 'mdi-water', streak: 3, doneToday: false },
//     { id: 'h2', name: 'Walk 15m', icon: 'mdi-walk', streak: 1, doneToday: false },
//     { id: 'h3', name: 'Sleep 7h', icon: 'mdi-weather-night', streak: 5, doneToday: false },
//   ]))
//   const tasks = ref(read(LS.tasks, [
//     { id: 't1', title: 'BIO110 reading', completed: false },
//     { id: 't2', title: 'Submit CS lab 2', completed: false },
//   ]))
//   const pet = ref(read(LS.pet, {
//     species: 'Tomodachi',
//     mood: 72, hunger: 65, energy: 60, cleanliness: 80,
//     avatar: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=200&auto=format&fit=crop'
//   }))

//   // persist
//   watch([meta, checkin, habits, tasks, pet], () => {
//     write(LS.meta, meta.value)
//     write(LS.checkin, checkin.value)
//     write(LS.habits, habits.value)
//     write(LS.tasks, tasks.value)
//     write(LS.pet, pet.value)
//   }, { deep: true })

//   // simple “award” helpers
//   function awardEXP(points) {
//     meta.value.exp += points
//     meta.value.level = Math.floor(Math.sqrt(meta.value.exp) / 2)
//   }

//   function doHabit(id) {
//     const h = habits.value.find(x => x.id === id)
//     if (!h) return
//     if (!h.doneToday) {
//       h.doneToday = true
//       h.streak += 1
//       awardEXP(10)
//       pet.value.mood = Math.min(100, pet.value.mood + 5)
//       pet.value.energy = Math.min(100, pet.value.energy + 3)
//     }
//   }

//   function addTask(title) {
//     tasks.value.unshift({ id: crypto.randomUUID(), title, completed: false })
//   }
//   function toggleTask(id) {
//     const t = tasks.value.find(x => x.id === id)
//     if (!t) return
//     t.completed = !t.completed
//     if (t.completed) awardEXP(5)
//   }

//   function doCheckin(mood, energy) {
//     const today = new Date().toISOString().slice(0,10)
//     if (checkin.value.date !== today) {
//       meta.value.streak += 1
//       awardEXP(15)
//     }
//     checkin.value = { date: today, mood, energy }
//     pet.value.mood = Math.min(100, Math.round((pet.value.mood*0.6) + mood*8))
//   }

//   return { meta, checkin, habits, tasks, pet, doHabit, addTask, toggleTask, doCheckin }
// }
