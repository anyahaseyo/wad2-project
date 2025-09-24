// // simple front-end only auth using localStorage
// import { ref, computed } from 'vue'

// const LS_KEY = 'demo_user'
// const _user = ref(JSON.parse(localStorage.getItem(LS_KEY) || 'null'))

// export function useAuth() {
//   const user = computed(() => _user.value)

//   function login(displayName = 'Demo Student') {
//     _user.value = {
//       uid: 'demo-uid',
//       displayName,
//       photoURL: 'https://i.pravatar.cc/100?img=12',
//     }
//     localStorage.setItem(LS_KEY, JSON.stringify(_user.value))
//     return _user.value
//   }

//   function logout() {
//     _user.value = null
//     localStorage.removeItem(LS_KEY)
//   }

//   const isAuthed = computed(() => !!_user.value)

//   return { user, isAuthed, login, logout }
// }
