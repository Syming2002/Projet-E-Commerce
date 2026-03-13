<script>
import { onMounted, ref } from 'vue';
import Cart from './components/Cart.vue';
import ProductCard from './components/ProductCard.vue';

export default {
  name: "App",
  components: {
    ProductCard,
    Cart
  },
  setup() {
    const carts = ref([]);

    onMounted(() => {
      const storedCart = localStorage.getItem("cartProducts");
      if (storedCart) {
        carts.value = JSON.parse(storedCart);
      }
    });
    return {carts}
  },
  data() {
    return {
      products: [],
      search: "",
      cartProducts: [],
      sortProduct: ""
    };
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    const storedCart = localStorage.getItem("cartProducts");

    if(storedCart) {
      this.cartProducts = JSON.parse(storedCart);
    }
  },
  methods: {
    fetchProducts() {
      fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error("Error fetching products: ", error);
      });
    },
    addProductToCart(product) {
      const existingProduct = this.cartProducts.find(
        p => p.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
         this.cartProducts.push(({...product, quantity: 1}));
      }
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));

      const wrapperDiv = document.getElementById("wrapper-div");
      const snackBar = document.createElement("div");

      snackBar.textContent = `You added ${product.title} to your cart`;
      snackBar.classList.add("snack-bar-added");

      wrapperDiv.appendChild(snackBar);

      setTimeout(() => {
        snackBar.remove();
      }, 3000);
    },
    removeFromCart(product) {
      const index = this.cartProducts.findIndex(cart => cart.id === product.id);

      if (index >= 0) {
        if (this.cartProducts[index].quantity > 1) {
        this.cartProducts[index].quantity--;
      } else {
        this.cartProducts.splice(index, 1);
      }
    }

      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));

      const wrapperDiv = document.getElementById("wrapper-div");
      const snackBar = document.createElement("div");

      snackBar.textContent = `You removed ${product.title} to your cart`;
      snackBar.classList.add("snack-bar-remove");

      wrapperDiv.appendChild(snackBar);

      setTimeout(() => {
        snackBar.remove();
      }, 3000);
    },
    deleteAllProduct() {
      this.cartProducts.forEach(c => {
        this.cartProducts.splice(c, c.quantity);
        c.quantity -= c.quantity;

        localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));

        const wrapperDiv = document.getElementById("wrapper-div");
        const snackBar = document.createElement("div");

        snackBar.textContent = `You removed all your product from the cart`;
        snackBar.classList.add("snack-bar-remove");

        wrapperDiv.appendChild(snackBar);

        setTimeout(() => {
          snackBar.remove();
        }, 3000);
      })
    },
    isEmpty() {
      this.cartProducts === 0;
    },
    total() {
      return this.cartProducts.reduce((acc, cart) => acc + cart.quantity * cart.price, 0); 
    }
  },
  computed: {
    filteredProducts() {
      const mensClothingReg = /^men's clothing$/;

      if (this.sortProduct !== "all") {
        if (mensClothingReg.test(this.sortProduct)) {
          return this.products.filter(p => p.category.match(mensClothingReg))
        }
        return this.products.filter(p => p.category.toLowerCase().includes(this.sortProduct));
      }
      return this.products.filter(p => p.title.toLowerCase().includes(this.search.toLowerCase()));
    }
  }
}

</script>

<template>
  <div id="wrapper-div">
    <header class="header">
      <h1 class="main-title">Site E-commerce Made in Simon</h1>
      <input type="text" id="product-input" v-model="search" placeholder="Search a product">
      <select id="filter-category" v-model="sortProduct">
        <option value="all">
          all
        </option>
        <option value="men's clothing">
          men's clothing
        </option>
        <option value="jewelery">
          jewelery
        </option>
        <option value="electronics">
          electronics
        </option>
        <option value="women's clothing">
          women's clothing
        </option>
      </select>
    </header>
    <div class="main">
      <div class="article-div">
        <ProductCard @add-to-cart="addProductToCart(product)" v-for="product in filteredProducts" :key="product.id" :id="product.id" :title="product.title" :price="product.price" :description="product.description" :category="product.category" :image="product.image" :rating="product.rating.rate"/>
        <p v-if="isInCart">This article is already in your cart</p>
      </div>
      <div v-if="!isEmpty()" class="cart-div">
        <Cart v-model="cartProducts" @remove-from-cart="removeFromCart(cartProduct)" v-for="cartProduct in cartProducts" :key="cartProduct.id" :id="cartProduct.id" :title="cartProduct.title" :price="cartProduct.price" :image="cartProduct.image" :quantity="cartProduct.quantity"/>
        <p>Total price in €: {{ total() }} €</p>
        <button @click="deleteAllProduct()">Delete all cart</button>
      </div>
    </div>
  </div>
</template>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .header {
    background-color: orange;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  .main-title {
    text-align: center;
  }
  #product-input {
    display: flex;
    align-self: center;
    margin-bottom: 25px;
  }
  #filter-category {
    display: flex;
    align-self: center;
    margin-bottom: 25px;
  }
  .main {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    gap: 25px;
  }
  .article-div {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 5px solid orange;
    
  }
  .cart-div {
    width: 500px;
    border: 5px solid blue;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
  .snack-bar-added {
    min-width: 250px;
    margin-left: -125px;
    background-color: #fff;
    border: 10px solid green;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    right: 50px;
    bottom: 50px;
  }

  .snack-bar-remove {
    min-width: 250px;
    margin-left: -125px;
    background-color: #fff;
    border: 10px solid red;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    right: 50px;
    bottom: 50px;
  }
</style>
