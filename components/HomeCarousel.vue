<template>
  <div class="image-gallery w-full">
    <div v-for="(item, index) in banner" :key="index" class="image-item w-full">
      <NuxtImg
        class="img-home-carousel"
        :src="item.image"
        format="webp"
        width="1920"
        loading="lazy"
      />

      <span
        class="overlay-text-label" v-if="this.tableCode"
      >
        Table : {{ tableCode }}
      </span>
      <div class="overlay">
        <div class="overlay-logo">
          <img src="~/assets/images/gacoan.png" alt="Logo" />
        </div>
        <!-- atau untuk teks -->
        <span class="overlay-text">{{ locationName }}</span>
        <span class="overlay-text-light">{{ address }}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dragging: false,
      carouselInterval: null,
      banner: [],
      defaultImage:
        "https://dppkm.umubuton.ac.id/wp-content/uploads/2022/11/Image-Contact-1.jpg",
      appID: "",
      locationName: "",
      address: "",
      tableCode: "",
    };
  },
  async mounted() {
    // this.startCarousel();
    await this.getData();
  },
  beforeDestroy() {
    clearInterval(this.carouselInterval);
  },
  methods: {
    async getData() {
      // Simulate fetching banner data from localStorage
      this.banner = JSON.parse(localStorage.getItem("banner")) || [];
      const dataRestaurant = JSON.parse(localStorage.getItem("data_restaurant")) || [];
      this.appID = dataRestaurant.appid;
      this.locationName = dataRestaurant.loc_name;
      this.address = dataRestaurant.loc_addr;
      this.tableCode = localStorage.getItem("table_code")? atob(localStorage.getItem("table_code")) : "";
    },
    startCarousel() {
      this.getData();
      const inputs = this.$refs.carousel.querySelectorAll(".carousel-open");

      // Check if inputs with class .carousel-open exist
      if (inputs.length > 0) {
        let currentIndex = 0;

        this.carouselInterval = setInterval(() => {
          // Tambahkan pengecekan untuk memastikan inputs[currentIndex] tidak undefined
          if (inputs[currentIndex]) {
            inputs[currentIndex].checked = false;
            currentIndex = (currentIndex + 1) % inputs.length;
            inputs[currentIndex].checked = true;
          }
        }, 5000);
      }
    },
  },
};
</script>
