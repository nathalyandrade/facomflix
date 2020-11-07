<template>
    <div>
        <form>
            <div class="container">
                <label for="username">Login</label>
                <input type="text" name="username" required>
                <label for="passwd">Senha</label>
                <input type="password" name="passwd" required>
                <input type="submit" value="Login">
            </div>
        </form>
    </div>
</template>

<style scoped>
    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    input[type=submit] {
        background: #444;
        color: white;
        cursor: pointer;
        width:100px;
    }
    input[type=submit]:hover {
        background: #333;
    }
    .container {
        padding: 14px;
        width: 400px;
    }
</style>