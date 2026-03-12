<script>
    export default {
        name: "Cart",
        props: {
            id: Number,
            title: String,
            price: Number,
            image: String,
            quantity: Number
        },
        data() {
            return{
                title: this.title,
                description: this.description,
                image: this.image,
                price: this.price,
                quantity: this.quantity
            }
        },
        methods: {
            removeFromCart() {
                this.$emit("remove-from-cart");
            }
        },
        watch: {

        }
    }
</script>

<template>
    <div class="cart">
        <h2 class="product-title">{{ this.title }}</h2>
        <p>{{ this.price }} €</p>
        <img class="product-image" :src="this.image" :alt="this.title">
        <p>{{ this.quantity }}</p>
        <button @click="removeFromCart()">Supprimer</button>
    </div>
</template>

<style>
    .cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
    }
</style>