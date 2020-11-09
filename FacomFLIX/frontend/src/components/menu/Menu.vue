<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <div class="d-flex align-center">
        <v-img
        alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div> -->

      <router-link
        to="/series/nova"
        v-slot="{ href, navigate, isActive}"
      >
        <v-btn :active="isActive" :href="href" text @click="navigate">
          <span class="mr-2">Cadastro Serie</span>
        </v-btn>
        

      </router-link>

      <router-link
        to="/aulas/nova"
        v-slot="{ href, navigate, isActive}"
      >
        <v-btn :active="isActive" :href="href" text @click="navigate">
          <span class="mr-2">Cadastro Aula</span>
        </v-btn>
        

      </router-link>

      <router-link
        to="/aulas"
        v-slot="{ href, navigate, isActive}"
      >
        <v-btn :active="isActive" :href="href" text @click="navigate">
          <span class="mr-2">Aulas</span>
        </v-btn>
        

      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="deslogar" text>
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div>
          <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import { logout } from "../../services/auth";

export default {
    name: "Menu",
    methods: {
      deslogar: function() {
        logout();
        this.$router.push('login');
      }
    }
}
</script>

<style>

</style>