<template>
    <v-container>
        <v-col>
            <v-row v-for="aula in aulas" :key="aula.id">
                <v-card
                    @click="abrirAula(aula.id)"
                    class="mx-auto"
                    width="444"
                    outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">
                                {{aula.nome}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                    Visualizações: {{aula.quantidadeDeVisualizacoes}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="60"
                            color="grey">
                            <img :src="aula.videoThumbnail">
                        </v-list-item-avatar>
                    </v-list-item>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>

import axios from '../../services/api';

export default {
    data: () => ({
        aulas: []
    }),
    created() {
        this.buscarAulas();
    },
    methods: {
        buscarAulas() {
            axios.get('/api/aula').then(r => {
                this.aulas = r.data;
                this.aulas.forEach(aula => {
                    let video_id = aula.link.split('v=')[1];
                    const ampersandPosition = video_id.indexOf('&');
                    console.log(video_id)
                    if(ampersandPosition != -1) {
                        aula.videoThumbnail = `https://img.youtube.com/vi/${video_id.substring(0, ampersandPosition)}/0.jpg`;
                    } else {
                        aula.videoThumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
                    }
                })
            });
        },
        abrirAula(id) {
            this.$router.push({ path: `/aulas/${id}` })
        }
    }
}
</script>