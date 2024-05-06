<template>
  <div class="product">
    <div class="carousel rounded-box">
      <div
        class="carousel-item"
        v-for="product in displayedProducts"
        :key="product.product_id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "~/components/ProductCard.vue";

export default {
  name: "BestOffer",
  components: {
    ProductCard,
  },
  data(props) {
    // console.log('first', props.products);
    return {
      productPlaceholder:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E',
      showAddProductModal: false,
      displayLimit: 6,
    };
  },
  computed: {
    displayedProducts() {
      // Slice array products untuk membatasi jumlah data yang ditampilkan menjadi 6
      return this.products.slice(0, this.displayLimit);
    },
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  async mounted() {},
  methods: {
    moveToProduct(index) {
      this.currentIndex = index;
      const carouselItemWidth =
        this.$refs.carousel.querySelector(".carousel-item").offsetWidth;
      this.$refs.carousel.scrollLeft = index * carouselItemWidth;
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
};
</script>
