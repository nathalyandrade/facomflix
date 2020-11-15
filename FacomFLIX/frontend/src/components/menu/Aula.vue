<template>
    <v-container>
        <v-col>
            <v-row>
                <h1>{{aula.nome}}</h1>
            </v-row>
            <v-row>
                <iframe width="420" height="315"
                    :src="aula.link">
                </iframe>
            </v-row>
            <v-row>
                
                <v-container>
                    <v-col>
                        <v-row class="titulo-comentario">
                            <h3 v-if="comentarios.length == 1">{{comentarios.length}} Comentário</h3>
                            <h3 v-if="comentarios.length > 1">{{comentarios.length}} Comentários</h3>
                        </v-row>
                        <v-row v-for="(comentario, i) in comentarios" :key="i">
                            <div class="comentario">
                                <v-row>
                                    <v-col>
                                        <h4>{{comentario.detalhesUsuario.nome}}</h4>
                                    </v-col>
                                    <v-col v-if="comentario.detalhesUsuario.id == getIdUsuarioLogado()" style="padding-left:30px;padding-right:2px">
                                        <v-btn
                                                color="normal"
                                                x-small
                                                v-on:click="editar(comentario.id)"
                                                class="mr-2"
                                            >
                                            Editar
                                        </v-btn>
                                    </v-col>
                                    <v-col v-if="comentario.detalhesUsuario.id == getIdUsuarioLogado()" style="padding-left:2px;">
                                        <v-btn
                                                color="normal"
                                                x-small
                                                v-on:click="excluir(comentario.id)"
                                                class="mr-2"
                                            >
                                            Excluir
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <p>{{comentario.descricao}}</p>
                            </div>
                        </v-row>
                        <v-row>
                            <v-container>
                                <v-col>
                                    <v-row>
                                        <v-form
                                            ref="formComentario"
                                            v-model="valida"
                                            lazy-validation
                                            width="100%"
                                            max-width="1200"
                                            >
                                            <v-text-field
                                                v-model="comentario.descricao"
                                                :rules="comentarioRules"
                                                label="Adicionar um novo comentário"
                                                required
                                            ></v-text-field>
                                        </v-form>
                                    </v-row>
                                    <v-row>
                                        <div class="text-center">
                                            <v-btn
                                                color="success"
                                                :disabled="!valida"
                                                v-on:click="salvar()"
                                                class="mr-2"
                                            >
                                                Comentar
                                            </v-btn>
                                        </div> 
                                    </v-row>
                                </v-col>
                            </v-container>
                        </v-row>
                    </v-col>
                </v-container>
            </v-row>
        </v-col>
    </v-container>
</template>


<script>

import axios from '../../services/api';
import {getUsuarioLogado} from '../../services/auth';

function incrementarVisualizacoes(aulaId) {
    axios.post(`/aula/incrementarVisualizacoes/${aulaId}`);
}

export default {
    data: () => ({
        valida: true,
        aula: {},
        comentarios: [],
        comentario: {},
        comentarioRules: [(v) => !!v || "É necessário informar um comentário"]

    }),
    created() {
        this.carregarAula(this.$route.params.id);
        this.carregarComentarios(this.$route.params.id);
    },
    methods: {
        carregarAula(id) {
            axios.get(`/aula`)
            .then( r => {
                const aulas = r.data;
                aulas.forEach(a => {
                    if (a.id == id) {
                        this.aula = a;
                        this.aula.link = this.aula.link.replace("watch?v=", "embed/");
                        incrementarVisualizacoes(a.id);
                    }
                })
            })
        },
        carregarComentarios(id) {
            axios.get(`/aula/comentarios/${id}`)
            .then( r => {
                this.comentarios = r.data;
            })
        },
        salvar() {
            if (this.comentario.id) {
                console.log('.');
            } else {
                this.comentario.usuario = getUsuarioLogado().id;
                this.comentario.aula = this.$route.params.id;
                this.$http.post(`/comentario`, this.comentario)
                    .then(r => {
                        if (r.data.success) {
                            this.$toast.success("Comentário realizado!");
                        }
                        this.carregarComentarios(this.$route.params.id);
                    })
                    .catch(e => {
                        this.$toast.error("Erro ao salvar comentário");
                        console.error(e);
                    })
                    this.limpar();
                    
            }
        },
        limpar() {
            this.comentario = {};
            this.$refs.formComentario.resetValidation();
        },
        excluir(id) {
            this.$http.delete(`/comentario/${id}`)
                .then(r => {
                    this.$toast.success(r.data.message);
                    this.carregarComentarios(this.$route.params.id);
                })
                .catch( e => {
                    this.$toast.error("Não foi possível excluir o comentário, tente novamente");
                    console.error(e);
                })
        },
        editar(comentario) {
            console.log(comentario);
        },
        getIdUsuarioLogado() {
            return getUsuarioLogado().id;
        }
    }


}
</script>

<style scoped>
    .comentario {
        padding: 5px 0px 0px 5px;
    }
    .titulo-comentario {
        padding: 5px 0px 10px 0px;
    }
    .titulo-comentario h3{
        font-weight: normal;
    }
</style>