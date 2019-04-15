<template>
    <div class="container">
        <div class="row">
            <stockBuy @stockBought="bought(brand, $event)"
                      v-for="brand in brands"
                      :key="brand.name"
            >
                <p slot="brand">{{brand.brand}}</p>
                <p slot="price">{{brand.price}}</p>
            </stockBuy>
        </div>
    </div>
</template>

<script>
    import StockBuy from "./StockBuy.vue";

    export default {
        name: "StockBuyHolder",
        components: {
            stockBuy: StockBuy
        },
        computed: {
            balance() {
                return this.$store.state.balance;
            },
            brands() {
                return this.$store.state.market;
            }
        },
        methods: {
            //calculate total transaction price and substract it's value from current balance in vuex
            substractBalance(amount) {
                this.$store.dispatch('substractBalance', amount);
            },
            //Turn price string into integer and add to owned property
            bought(brand, $event) {
                //Turn input value into integer
                let stockQuantity = parseInt($event);
                //Add given integer as stock quantity to selected company
                brand.owned += stockQuantity;
                let totalCost = $event * brand.price;
                //Prevent blank entries resulting in invalid state mutation
                if ($event === null) {
                    alert('Please enter valid amount of stocks');
                } else {
                    //Allow buying only if account balance is sufficient
                    if (this.balance > totalCost) {
                        this.substractBalance(totalCost);
                    } else {
                        alert('Not sufficient funds!');
                    }
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