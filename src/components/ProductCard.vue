<script>
    export default {
        name: "ProductCard",
        props: {
            id: Number,
            title: String,
            price: Number,
            description: String,
            category: String,
            image: String,
            rating: Number,
        },
        data() {
            return{
                title: this.title,
                description: this.description,
                image: this.image,
                price: this.price
            }
        },
        methods: {
            addToCart() {
                this.$emit("add-to-cart");
            }
        },
        watch: {

        }
    }
</script>

<template>
    <div class="product">
        <h2 class="product-title">{{ title }}</h2>
        <p>{{ price }} €</p>
        <img class="product-image" :src="this.image" :alt="this.title">
        <p class="product-rate">{{ rating }}</p>
        <button id="btn-add" class="btn-add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
</template>

<style>
    .product {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 225px;
        padding: 25px;
        gap: 25px;
        border: 2px solid blue;
        margin: 10px;
    }
    .product-title {
        font-size: 15px;
        text-align: center;
        margin-top: auto;
    }
    .product-image {
        width: 75px;
    }
    .product-rate {
        text-align: center;
    }
    .btn-add-to-cart {
        width: 90px;
    }
</style>