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
      <div v-if="tipoUsuario == 'PROFESSOR'">
        <!-- colocar coisas que so professor pode ver  -->

        <router-link to="/series/gerenciar" v-slot="{ href, navigate, isActive }">
          <v-btn :active="isActive" :href="href" text @click="navigate">
            <span class="mr-2">Gerenciar Series</span>
          </v-btn>
        </router-link>

         <router-link to="/aulas/gerenciar" v-slot="{ href, navigate, isActive }">
          <v-btn :active="isActive" :href="href" text @click="navigate">
            <span class="mr-2">Gerenciar Aulas</span>
          </v-btn>
        </router-link>
      </div>

      <div v-if="tipoUsuario == 'ALUNO'">
        <!-- colocar coisas que so aluno pode ver  -->
      </div>

      <div v-if="tipoUsuario == 'ADMINISTRADOR'">
        <!-- colocar coisas que so administrador pode ver  -->
        <router-link to="/gerenciar-categoria" v-slot="{ href, navigate, isActive }">
          <v-btn :active="isActive" :href="href" text @click="navigate">
            <span class="mr-2">Gerenciar Categorias</span>
          </v-btn>
        </router-link>

        <router-link to="/gerenciar-etiqueta" v-slot="{ href, navigate, isActive }">
          <v-btn :active="isActive" :href="href" text @click="navigate">
            <span class="mr-2">Gerenciar Etiquetas</span>
          </v-btn>
        </router-link>

      </div>

      <router-link to="/aulas" v-slot="{ href, navigate, isActive }">
        <v-btn :active="isActive" :href="href" text @click="navigate">
          <span class="mr-2">Aulas</span>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="alterarDados()" text>
        <span class="mr-2">Alterar Dados</span>
      </v-btn>
      
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
import { logout, verificarTipoUsuario } from "../../services/auth";

export default {
  name: "Menu",
  created() {
    this.tipoUsuario = verificarTipoUsuario();
  },
  data: () => ({
    tipoUsuario: "",
  }),
  methods: {
    deslogar: function () {
      logout();
      this.$router.push("/login");
      this.$toast.info("Usuário deslogado.");
    },
    alterarDados () {
      this.$router.push('/gerenciar-usuario');
    }
  },
};
</script>

<style>
</style>