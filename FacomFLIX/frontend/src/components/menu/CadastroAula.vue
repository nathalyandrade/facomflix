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
    aula.serie = 2;
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
        ]
    }),
    methods: {
        validate () {
            this.$refs.form.validate();
            cadastrarAula({
                nome: this.nome,
                link: this.link
            });
            this.$refs.form.reset();
        }
    }
}
</script>