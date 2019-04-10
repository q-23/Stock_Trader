<template>
    <div class="container">
    <app-navbar></app-navbar>
        <transition
                mode="out-in"
                name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import appNavbar from "./components/Navbar.vue";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            appNavbar
        },
        computed: {
            ...mapGetters([
                'firstBrandPrice',
                'secondBrandPrice',
                'thirdBrandPrice',
                'fourthBrandPrice'
            ]),
            mode() {
                return this.$store.state.selectedMode;
            }
        },
        methods: {
            //Add random values to prices in 2s intervals
            increasePrice(i) {
                let k = 0;
                let intervalID;
                intervalID = setInterval(() => {
                    if (k <= 2) {
                        this.$store.dispatch('preventFromReachingZero', i);
                        k++;
                    } else {
                        clearInterval(intervalID);
                    }
                }, 2000);
            }
        },
        watch: {
            firstBrandPrice(val) {
                if (val < 50) {
                    this.increasePrice(0);
                }
            },
            secondBrandPrice(val) {
                if (val < 50) {
                    this.increasePrice(1);
                }
            },
            thirdBrandPrice(val) {
                if (val < 50) {
                    this.increasePrice(2);
                }
            },
            fourthBrandPrice(val) {
                if (val < 50) {
                    this.increasePrice(3);
                }
            },
            mode(val) {
                if (val === 'Dynamic mode') {
                    this.$store.dispatch('dynamicallyGeneratePrices');
                }
            }
        },
        created() {
            //Generate random stock prices between 100 and 200 at component creation
            this.$store.dispatch('generateStockPrices');
        }
    }
</script>

<style>
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity .4s;
    }
    .fade-leave-active {
        transition: opacity .4s;
        opacity: 0;
    }
</style>
