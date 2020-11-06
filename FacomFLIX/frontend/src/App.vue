<template>
  <div id="app">
    <Navbar />
    <Home v-if="page == '/'" />
    <Aulas v-if="page == '/aulas'" />
    <Series v-if="page == '/series'" />
    <Login v-if="page == '/login'" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import Aulas from './components/Aulas.vue';
import Series from './components/Series.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  data: function() {
    return {
      page: window.location.pathname
    }
  },
  components: {
    Navbar,
    Home,
    Aulas,
    Series,
    Login,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
