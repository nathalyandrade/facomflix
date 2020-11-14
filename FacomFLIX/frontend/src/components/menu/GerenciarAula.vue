<template>
  <v-app>
    <h3 class="ml-2">Gerenciar Aulas</h3>
    <v-row>
      <v-col cols="6">
        <v-simple-table max-width="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nome</th>
                <th class="text-left">Editar</th>
                <th class="text-left">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(aula, i) in listaAulas" :key="i">
                <td>{{ aula.id }}</td>
                <td>{{ aula.nome }}</td>
                <td>
                  <v-btn
                    color="success"
                    v-on:click="editarAula(aula)"
                  >
                    Editar
                  </v-btn>
                </td>
                <td>
                  <v-btn color="error" v-on:click="excluirAula(aula)">
                    Excluir
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols="6">
        <v-btn color="primary" v-on:click="novoCadastro()">
          Nova Aula
        </v-btn>

        <v-card class="mx-auto my-12" width="350px" max-height="550px">
          <div class="pa-2" max-width="300">
            <div class="text-center">
              <h4 v-if="cadastroAula">Cadastrar Aula</h4>
              <h4 v-else>Editar Aula</h4>
            </div>

            <v-form
              ref="formEditar"
              v-model="valida"
              lazy-validation
              max-width="300"
            >
              <v-text-field
                v-model="aulaSelecionada.nome"
                :rules="aulaRules"
                label="Aula"
                required
              ></v-text-field>

              <v-text-field
                v-model="aulaSelecionada.link"
                :rules="linkRules"
                label="Link"
                required
              ></v-text-field>

              <v-select
                v-model="serie"
                :items="series"
                item-text="nome"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                label="Série"
                hint="Selecione a Série"
                persistent-hint
                ></v-select>

                <v-select
                        v-model="categoria"
                        :items="categorias"
                        item-text="nome"
                        item-value="id"
                        :menu-props="{ maxHeight: '400' }"
                        label="Categoria"
                        hint="Selecione a Categoria"
                        persistent-hint
                        ></v-select>
            </v-form>
            <div class="text-center">
              <v-btn
                color="success"
                :disabled="!valida"
                v-on:click="salvar()"
                class="mr-2"
              >
                Salvar
              </v-btn>

              <v-btn color="error" v-on:click="cancelarOperacao()">
                Cancelar
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { getUsuarioLogado } from "../../services/auth";

export default {
  name: "GerenciarAula",
  data: () => ({
    listaAulas: [],
    aulaSelecionada: new Object(),
    aulaRules: [(v) => !!v || "Aula é necessário"],
    linkRules: [(v) => !!v || "Link é necessário"],
    valida: true,
    cadastroAula: true,
    series: [],
    serie: {},
    categorias: [],
    categoria: {},
  }),
  created() {
    this.buscarAulas();
    this.buscarSeries();
    this.buscarCategorias();
  },
  methods: {
    buscarAulas() {
      let usuario = getUsuarioLogado();
      this.$http
        .get("/aula/" + usuario.id)
        .then((response) => {
          this.listaAulas = response.data;
        })
        .catch((error) => {
          this.$toast.error("Erro ao buscar aulas");
          console.log(error);
        });
    },
    editarAula(aula) {
      this.cadastroAula = false;
      this.aulaSelecionada = aula;
      this.setSerie(this.aulaSelecionada.serie);
      this.setCategoria(this.aulaSelecionada.categoria);
    },
    setSerie(id) {
        this.$http.get('/serie/')
            .then(r => {
                r.data.forEach(serie => {
                    if (serie.id == id) {
                        this.serie = serie;
                    }
                })
            })
    },
    setCategoria(id) {
        this.$http.get('/categoria/')
            .then(r => {
                r.data.forEach(c => {
                    if (c.id == id) {
                        this.categoria = c;
                    }
                })
            })
    },
    cancelarOperacao() {
      this.limparAulaSelecionada();
      this.cadastroAula = true;
      this.resetValidation();
    },
    excluirAula(aula) {
      this.$http
        .delete("/aula/" + aula.id)
        .then((response) => {
          this.buscarAulas();
          this.$toast.success(response.data.message);
        })
        .catch((error) => {
          this.$toast.error("Erro ao excluir aula");
          console.log(error);
        });
    },
    novoCadastro() {
      this.limparAulaSelecionada();
      this.cadastroAula = true;
    },
    resetValidation() {
      this.$refs.formEditar.resetValidation();
    },
    limparAulaSelecionada() {
      this.aulaSelecionada = new Object();
    },
    salvar() {
      console.log(this.serie.id);
      if (this.cadastroAula) {
        this.$http
          .post("/aula", {
            nome: this.aulaSelecionada.nome,
            link: this.aulaSelecionada.link,
            serie: this.serie.id,
            categoria: this.categoria
          })
          .then((response) => {
            this.buscarAulas();
            this.limparAulaSelecionada();
            this.resetValidation();
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            this.$toast.error("Erro ao cadastrar aula");
            console.log(error);
          });
      } else {
        this.$http
          .put("/aula", {
            id: this.aulaSelecionada.id,
            nome: this.aulaSelecionada.nome,
            serie: this.serie.id,
            categoria: this.categoria
          })
          .then((response) => {
            this.buscarAulas();
            this.limparAulaSelecionada();
            this.resetValidation();
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            this.$toast.error("Erro ao cadastrar aula");
            console.log(error);
          });
      }
    },
    buscarSeries() {
        this.$http.get('/serie').then(r => {
            this.series = r.data;
        });
    },
    buscarCategorias() {
        this.$http.get('/categoria').then(r => {
            this.categorias = r.data;
        });
    }
  },
};
</script>

<style>
</style>