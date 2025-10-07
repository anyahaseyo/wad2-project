<!-- <template>
  <v-app-bar flat color="surface" class="px-4" elevation="1">
    <v-app-bar-title class="font-weight-semibold text-primary">
      🐱 StudyBuddy
    </v-app-bar-title>

    <v-spacer />

    <v-btn variant="text" color="primary" to="/dashboard">Dashboard</v-btn>
    <v-btn variant="flat" color="primary" @click="logout" class="ml-2">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('demo_user')
  router.push('/login')
}
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.85) !important;
}
</style> -->
