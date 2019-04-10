<template>
    <div class="container">
        <div class="col">
            <h1>Trade or View your Portfolio</h1>
            <br>
            <p>You may Save & Load your Data</p>
            <p>Click on "End Day" to begin a new Day!</p>
            <br>
            <p>You can select dynamic and static trading mode</p>
            <hr>
            <h3>Your funds: {{ balance | currency('$', 0, { thousandsSeparator: '.' }) }}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main",
        computed: {
            balance() {
                return this.$store.state.balance;
            }
        }
    }
</script>

<style scoped>
    .container{
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 15px;
    }
    h1{
        margin-top: 30px;
    }
    h3{
        margin-bottom: 30px;
    }
</style>