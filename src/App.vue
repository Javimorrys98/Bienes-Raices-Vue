<script setup>
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/authStore';

const auth = useAuthStore()
//Te permite aplicar destructuring sin perder la reactividad en el store
const { isAuth } = storeToRefs(auth)
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:append>
          <div v-if="isAuth">
            <v-btn :to="{ name: 'admin-propiedades' }">
              Admin
            </v-btn>
            <v-btn @click="auth.logout">
              Cerrar sesión
            </v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">
              Inicio
            </v-btn>
            <v-btn :to="{ name: 'login' }">
              Iniciar sesión
            </v-btn>
          </div>
        </template>
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raices - VueFire
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
