<template>
    <v-container class="lighten-5">
        <v-row no-gutters>
            <v-col cols="12">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    
                    <v-text-field
                        v-model="nome"
                        :rules="nomeRules"
                        label="Nome da Aula"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="link"
                        :rules="linkRules"
                        label="Endereço da Aula"
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

                    <v-btn
                        class="mr-4"
                        type="submit"
                        :disabled="!valid"
                        @click="validate">
                        Cadastrar
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

import axios from '../../services/api';

function cadastrarAula(aula) {
    aula.usuarioUpload = 8;
    aula.categoria = 2;
    axios.post('/api/aula', aula).then(r => {
        if (r.data.sucess) {
            alert(r.data.message);
        }
    });
}

export default {
    data: () => ({
        valid: true,
        nome: '',
        nomeRules: [
            v => !!v || 'Nome é obrigatório'
        ],
        link: '',
        linkRules: [
            v => !!v || 'Link é obrigatório',
            v => /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/.test(v) || 'Endereço precisa ser do Youtube',
        ],
        series: [],
        serie: {}
    }),
    created() {
        this.buscarSeries();
    },
    methods: {
        validate () {
            this.$refs.form.validate();
            cadastrarAula({
                nome: this.nome,
                link: this.link,
                serie: this.serie
            });
            this.$refs.form.reset();
        },
        buscarSeries() {
            axios.get('/api/serie').then(r => {
                this.series = r.data;
            });
        }
    }
}
</script>