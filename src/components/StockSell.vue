<template>
    <div class="col-md-6 col-sm-12">
        <div class="wrapper">
            <div class="alert alert-primary">
                <span class="lead" style="margin-right: 10px"> <slot name="brand"></slot></span>
                <small>
                    (Price:
                    <slot name="price"></slot>
                    | Quantity:
                    <slot name="quantity"></slot>
                    )
                </small>
            </div>
                <div class="form-row">
                    <input class="form-control" min="1" placeholder="Quantity" type="number" v-model="value">
                    <button @click="returnValue" class="btn btn-danger ml-auto">Sell</button>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StockBuy",
        data() {
            return {
                value: null
            }
        },
        methods: {
            //Trigger stockSold custom action and clear input
            returnValue() {
                this.$emit("stockSold", this.value);
                this.value = null;
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        border: 1px solid #d4edda;
        margin: 15px 0 15px 0;
        border-radius: .25rem;
    }
    .alert {
        height: 55px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    input {
        width: 200px;
        transform: translate(10px, -8px);
    }
    button {
        transform: translate(-10px, -8px);
    }
</style>