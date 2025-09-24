<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

function continueDemo() {
  login('Demo Student')
  router.push('/dashboard')
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="5">
        <v-card elevation="10" rounded="xl" class="pa-8">
          <div class="text-center mb-6">
            <v-avatar size="72" class="mb-2">
              <v-img src="https://i.imgur.com/1XK5QvC.png" alt="Logo" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">Tomodachi Wellness</div>
            <div class="text-body-2 text-medium-emphasis">Your playful study + wellness companion</div>
          </div>

          <v-btn block color="primary" size="large" class="mb-3" @click="continueDemo">
            <v-icon start>mdi-account</v-icon>
            Continue as Demo
          </v-btn>

          <v-divider class="my-4" />

          <v-alert type="info" variant="tonal" border="start" prominent>
            This is a <strong>frontend-only</strong> demo. No real sign-in happens.
          </v-alert>

          <div class="mt-6 text-center text-caption text-medium-emphasis">
            By continuing you agree to our friendly vibes ✨
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
