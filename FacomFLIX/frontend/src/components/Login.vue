<template>
  <v-app>
    <v-card class="mx-auto my-12">
      <v-row align="center" class="mx-0 text-center">
        <div class="text-center">
          <v-btn depressed class="text-center"> Normal </v-btn>
          <v-btn elevation="2" color="secondary" small>Cadastrar-se</v-btn>
        </div>
      </v-row>

      <v-card-text>
        <v-row align="center" class="mx-0"> </v-row>

        <div class="my-4 subtitle-1 text-center">$ • Italian, Cafe</div>

        <div>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <!-- <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group> -->
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.centro {
  align-content: center;
  align-items: center;
  text-align: center;
}

</style>