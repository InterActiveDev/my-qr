<template>
  <div class="carousel relative shadow-2xl bg-white" ref="carousel">
    <div class="carousel-inner relative overflow-hidden w-full">
      <!-- Loop through each banner item -->
      <template v-for="(item, index) in banner" :key="index">
        <input
          :id="'carousel-' + (index + 1)"
          class="carousel-open"
          type="radio"
          name="carousel"
          aria-hidden="true"
          hidden=""
          :checked="index === 0"
        />
        <div
          class="carousel-item absolute opacity-0"
          :class="{ 'opacity-100': index === 0 }"
        >
          <img
            class="img-home-carousel"
            :key="index"
            provider="cloudinary"
            :src="item.image"
            format="webp"
            :alt="'banner-' + (index + 1)"
            width="1920"
            loading="lazy"
            @error="handleImageError"
          />
          <!-- Overlay elements -->
          <span class="overlay-text-label" v-if="this.tableCode">
            Table : {{ tableCode }}
          </span>
          <div class="overlay">
            <div class="overlay-logo">
              <img :src="logo" alt="Logo" />
            </div>
            <span class="overlay-text">{{ locationName }}</span>
            <span class="overlay-text-light">{{ address }}</span>
          </div>
        </div>
      </template>

      <!-- Add additional indicators for each slide-->
      <ol class="carousel-indicators">
        <template v-for="(item, index) in banner" :key="index">
          <li class="inline-block mr-3">
            <label
              :for="'carousel-' + (index + 1)"
              class="carousel-bullet cursor-pointer block text-4xl text-white text-red-900"
            >
              •
            </label>
          </li>
        </template>
      </ol>
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
      appID: "",
      tableCode: "", // Tambahkan data yang diperlukan
      logo: "", // Tambahkan data yang diperlukan
      locationName: "", // Tambahkan data yang diperlukan
      address: "", // Tambahkan data yang diperlukan
      defaultImage:
        "https://dppkm.umubuton.ac.id/wp-content/uploads/2022/11/Image-Contact-1.jpg", // URL gambar default
    };
  },
  mounted() {
    this.startCarousel();
  },
  beforeDestroy() {
    clearInterval(this.carouselInterval);
  },
  methods: {
    getData() {
      // Simulate fetching banner data from localStorage
      this.banner = JSON.parse(localStorage.getItem("banner")) || [];
      const dataRestaurant =
        JSON.parse(localStorage.getItem("data_restaurant")) || [];
      this.appID = dataRestaurant.appid;
      this.locationName = dataRestaurant.loc_name;
      this.address = dataRestaurant.loc_addr;
      this.tableCode = atob(localStorage.getItem("table_code")) || "";
      this.logo = dataRestaurant.loc_logo;
      const tableUrl = this.$route.query.table_code;
      if(tableUrl){
        this.isTableUrl = true;
      }else{
        this.isTableUrl = false;
      }

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
