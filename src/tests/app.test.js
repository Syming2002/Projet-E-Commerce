import {mount} from "@vue/test-utils"
import {test, expect, beforeEach} from "vitest"
import Cart from "@/components/Cart.vue"
import ProductCard from "@/components/ProductCard.vue"
import App from "@/App.vue"

test("removeFromCart decrease the counter of object inside the cart", () => {
    const cart = {quantity: 0}

    const updated = App.methods.removeFromCart(cart);

    expect(updated.quantity).toBe(0);
})