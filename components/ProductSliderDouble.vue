<template>
  <div class="product-double">
    <swiper
      :slidesPerView="4"
      :spaceBetween="30"
      :grid="{
        rows: 1,
      }"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
      class="mySwiper"
    >
      <swiper-slide v-for="(product) in products" :key="product.id">
          <ProductCard :product="product" />
          <ProductCard :product="product" />
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import ProductCard from "~/components/ProductCard.vue";

export default {
  name: "BestOffer",
  components: {
    ProductCard,
  },
  data() {
    let storedProducts = localStorage.getItem('data_menu');
    let productsArray = [];

    if (storedProducts) {
      productsArray = JSON.parse(storedProducts);
    }
    const halfLength = Math.ceil(productsArray[1].product_details.length / 2);
    return {
      products: productsArray[1].product_details,
      halfLength: halfLength,
    };
  },
  mounted() {},
  methods: {},
};
</script>
