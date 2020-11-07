<template>
    <ul class="menu">
        <li><a class="active" href="/">Home</a></li>
        <li><a href="/aulas">Aulas</a></li>
        <li><a href="/series">Séries</a></li>
        <li style="float: right;"><a href="/login">Login</a></li>
    </ul>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #444;
    overflow: hidden;
}

.menu li {
    float: left;
}

.menu li a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 14px 16px;
}

.menu li a:hover:not(.active) {
    background-color: #111;
}

li .active {
    background-color: #661;
}
</style>