<template>
  <div class="carousel carousel-center rounded-box gap-4">
    <div
      v-for="(topping, index) in toppings"
      :key="index"
      class="carousel-item"
    >
      <NuxtLazyHydrate>
        <NuxtImg
          provider="cloudinary"
          src="v1709535527/product-1_tqah3b.webp"
          alt="Pizza"
          width="327"
          height="322"
          loading="lazy"
          preload
        />
      </NuxtLazyHydrate>
      <div class="body">
        <span class="title">{{ topping.product_name }}</span>
        <span class="price">{{ formatCurrency(topping.product_pricenow) }}</span>

        <button class="btn btn-add-item">Tambahkan</button>
        <!-- <QuantityInput /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import QuantityInput from "@/components/QuantityInput.vue";

export default defineComponent({
  components: {
    QuantityInput,
  },
  data() {
    const storedProducts = localStorage.getItem('data_menu');
    const productsArray = JSON.parse(storedProducts);
    let randomNumber = (Math.floor(Math.random() * (productsArray.length)));
    let top = productsArray[randomNumber].product_details;
    return {
      toppingsOld: [0, 1, 2, 3, 4, 5],
      toppings: productsArray[randomNumber].product_details,
    };
  },
  methods: {
    getImageSource(topping) {
      return `v1709535527/product-${topping}_tqah3b.webp`;
    },
    getToppingName(topping) {
      const toppingNames = [
        "BEEF",
        "CHICKEN",
        "VEGETABLES",
        "MUSHROOM",
        "PEPPERONI",
        "CHEESE",
      ];
      return toppingNames[topping];
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
  },
});
</script>
