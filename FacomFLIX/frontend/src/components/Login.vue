<template>
  <v-app>
    <!-- <form>
            <div class="container">
                <label for="username">Login</label>
                <input type="text" name="username" required>
                <label for="passwd">Senha</label>
                <input type="password" name="passwd" required>
                <input type="submit" value="Login">
            </div>
        </form> -->

    <!-- <v-card class="mx-auto my-12" max-width="374">
      <v-row align="center" justify="space-around">
        <v-btn text> Normal </v-btn>
        <v-btn text color="primary"> Primary </v-btn>
        <v-btn text color="error"> Error </v-btn>
        <v-btn text disabled> Disabled </v-btn>
      </v-row>
    </v-card> -->
    <v-card class="mx-auto my-12" width="500px" height="400px">
      <v-row class="text-center">
        <div align="center" class="text-center justify-center">
          <v-btn text color="primary"> Login </v-btn>
          <v-btn text color="primary" class="text-center"> Cadastrar-se </v-btn>
        </div>
      </v-row>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="login"
          :rules="loginRules"
          label="Login"
          required
        ></v-text-field>

        <v-text-field
          v-model="senha"
          :rules="senhaRules"
          type="password"
          label="Senha"
          required
        ></v-text-field>

        <v-select
          v-model="perfilUsuario"
          :items="items"
          :rules="[(v) => !!v || 'Perfil é necessário']"
          label="Perfil"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2"> Reserve </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
    login: "",
    loginRules: [(v) => !!v || "Login é necessário"],
    senha: "",
    senhaRules: [(v) => !!v || "Senha é necessário"],
    perfilUsuario: null,
    items: ["Aluno", "Professor", "Administrador"],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
/* input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
input[type="submit"] {
  background: #444;
  color: white;
  cursor: pointer;
  width: 100px;
}
input[type="submit"]:hover {
  background: #333;
}
.container {
  padding: 14px;
  width: 400px;
} */
</style>