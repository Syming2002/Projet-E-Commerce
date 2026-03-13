import {mount} from "@vue/test-utils"
import {test, expect} from "vitest"
import App from "@/App.vue"

test("removeFromCart decrease the counter of object inside the cart", () => {
    const wrapper = mount(App);
    const fakeDiv = document.createElement("div");
    fakeDiv.id = "wrapper-div";
    document.body.appendChild(fakeDiv);

    wrapper.vm.cartProducts = [{
        id: 1,
        title: "Test Product",
        quantity: 2,
        price: 100
    }]

    const product = wrapper.vm.cartProducts[0];

    wrapper.vm.removeFromCart(product);

    expect(wrapper.vm.cartProducts[0].quantity).toBe(1);

    fakeDiv.remove();
})