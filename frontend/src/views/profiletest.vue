<template>
    <v-container class="py-8">
      <v-card class="rounded-xl mb-4" elevation="0" variant="outlined">
        <v-card-title class="pb-0">Profile</v-card-title>
        <v-card-text>
          <div class="d-flex align-center ga-4 mb-4">
            <v-avatar size="64" color="secondary" variant="tonal">🐱</v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-semibold">{{ user.name || 'qw' }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ user.email || 'user@example.com' }}</div>
            </div>
          </div>
  
          <v-divider class="my-4" />
  
          <div class="d-flex ga-3">
            <v-btn color="primary" variant="tonal">Edit Profile</v-btn>
            <v-btn color="error" variant="flat" class="text-white" @click="logout">
              Logout
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const user = reactive({ name: 'qw', email: '' })
  
  onMounted(() => {
    try {
      const data = JSON.parse(localStorage.getItem('demo_user') || '{}')
      if (data?.email) user.email = data.email
      if (data?.name) user.name = data.name
    } catch {}
  })
  
  function logout() {
    localStorage.removeItem('demo_user')
    router.push('/login')
  }
  </script>
  