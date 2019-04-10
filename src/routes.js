import appMain from "./components/Main.vue";
import StockBuyHolder from "./components/StockBuyHolder.vue";
import StockSellHolder from "./components/StockSellHolder.vue";

export const routes = [
    {
        path: '',
        components: {
            default: appMain
        }
    },
    {
        path: '/buy',
        components: {
            default: StockBuyHolder
        }
    },
    {
        path: '/sell',
        components: {
            default: StockSellHolder
        }
    },
    {path: '*', redirect: '/'}
];


