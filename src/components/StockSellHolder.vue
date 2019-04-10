<template>
    <div class="container">
        <div class="row">
            <stockSell
                    v-for="brand in brands"
                    v-if="brand.owned > 0"
                    @stockSold="sold(brand, $event)"
            >
                <p slot="brand">{{brand.brand}}</p>
                <p slot="price">{{brand.price}}</p>
                <p slot="quantity">{{brand.owned}}</p>
            </stockSell>
        </div>
    </div>
</template>

<script>
    import StockSell from "./StockSell.vue";

    export default {
        name: "StockSellHolder",
        components: {
            StockSell
        },
        computed: {
            brands() {
                return this.$store.state.market;
            }
        },
        methods: {
            //calculate total transaction price and substract it's value from current balance in vuex
            addBalance(amount) {
                this.$store.dispatch('addBalance', amount);
            },
            //Turn price string into integer and substract from owned property, add total income to balance
            sold(brand, $event) {
                let stockQuantity = parseInt($event);
                let totalIncome = $event * brand.price;
                if ($event <= brand.owned) {
                    brand.owned -= stockQuantity;
                    this.addBalance(totalIncome);
                } else {
                    alert('Not enough stocks!');
                }
            }
        }
    }
</script>

<style scoped>
    p {
        display: inline-block;
    }
</style>