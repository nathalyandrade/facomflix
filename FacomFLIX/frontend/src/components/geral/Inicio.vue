<template>
  <v-app>
    <h3 class="ml-2">Bem vindo, {{ nomeUsuarioLogado }}</h3>
    <div class="text-center">
      <h3>Professor em destaque</h3>
      <v-card class="mx-auto my-6" max-width="350" v-if="professorEmDestaque != ''">
        <v-card-title>Nome: {{professorEmDestaque.nome}}</v-card-title>
          <div class="my-4 subtitle-1">Contato: {{professorEmDestaque.email}}</div>
          <div>
            <p>Suas aulas são as mais vistas!! 
            No total de <strong>{{professorEmDestaque.quantidadeDeVisualizacoes}} </strong> visualizações</p>
          </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { getUsuarioLogado } from "../../services/auth";

export default {
  name: "Inicio",
  data: () => ({
    nomeUsuarioLogado: "",
    professorEmDestaque: "",
  }),
  created() {
    this.nomeUsuarioLogado = getUsuarioLogado().nome;
    this.buscarProfessorDestaque();
  },
  methods: {
    buscarProfessorDestaque() {
      this.$http
        .get("/aula/quantidadeAula/destaque")
        .then((response) => {
          this.professorEmDestaque = response.data;
        })
        .catch((error) => {
          this.$toast.error("Erro ao buscar professor em destaque");
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>