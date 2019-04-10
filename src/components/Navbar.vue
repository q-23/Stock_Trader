<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" tag="a" to="/" active-class="active">Stock Trader</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" tag="a" to="/sell" active-class="active">Portfolio</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" tag="a" to="/buy" active-class="active">Stocks</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
               <ul class="navbar-nav mr-auto">
                   <li class="nav-item">
                       <transition mode="out-in"
                                   name="fade">
                           <a @click="mutateStockPrices" class="nav-link pointer" v-if="static">End day</a>
                       </transition>
                   </li>
                   <li class="nav-item dropdown">
                       <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Save&Load
                       </a>
                       <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                           <a @click="save" class="dropdown-item pointer">Save data</a>
                           <a @click="load" class="dropdown-item pointer">Load data</a>
                       </div>
                   </li>
                   <li class="nav-item">
                       <span class="navbar-text">
                       Funds: {{ balance | currency('$', 0, { thousandsSeparator: '.' }) }}
                      </span>
                   </li>
               </ul>
            </form>
            <select class="form-control form-control-sm col-md-2 col-xs-auto ml-md-3"
                    v-model="selectedMode"
            >
                <option v-for="mode in modes"
                >{{mode}}
                </option>
            </select>
        </div>
    </nav>
</template>

<script>
    //Declare variable used as interval ID
    let intervalID;
    export default {
        name: "Navbar",
        data() {
            return {
                modes: ['Static mode', 'Dynamic mode'],
                selectedMode: 'Static mode',
                static: true
            }
        },
        computed: {
            balance(){
                return this.$store.state.balance;
            },
            brands() {
                return this.$store.state.market;
            },
            saved() {
                return this.$store.state.savedMarket !== '';
            }
        },
        watch: {
            selectedMode(val) {
                //Enable mode selection
                if (val === 'Static mode') {
                    clearInterval(intervalID);
                    this.static = true;
                } else {
                    this.startInterval();
                    this.static = false;
                }
            }
        },
        methods: {
            mutateStockPrices() {
                this.$store.dispatch('mutateStockPrices');
            },
            save() {
                this.$store.dispatch('save');
            },
            load() {
                //Trigger loading stock state data
                if (this.saved) {
                    this.$store.dispatch('load');
                } else {
                    alert('No stock state saved!');
                }
            },
            //Generate new prices in one second periods
            startInterval() {
                intervalID = setInterval(() => {
                    this.$store.dispatch('mutateStockPrices')
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    nav {
        margin-top: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .pointer {
        cursor: pointer;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity .4s;
    }

    .fade-leave {

    }

    .fade-leave-active {
        transition: opacity .4s;
        opacity: 0;
    }
</style>