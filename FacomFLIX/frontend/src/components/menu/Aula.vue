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
        </v-col>
    </v-container>
</template>


<script>

import axios from '../../services/api';

export default {
    data: () => ({
        aula: {}
    }),
    created() {
        axios.get(`/api/aula`)
            .then( r => {
                const aulas = r.data;
                aulas.forEach(a => {
                    if (a.id == this.$route.params.id) {
                        this.aula = a;
                        this.aula.link = this.aula.link.replace("watch?v=", "embed/");
                    }
                })
            })
    }
}
</script>