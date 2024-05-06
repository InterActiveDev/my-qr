<template>
  <div class="carousel carousel-home-screen w-full">
    <div v-for="(banner, index) in data" :key="index">
      <div :id="`item`+ index" class="carousel-item w-full">
        <NuxtImg
          src="https://res.cloudinary.com/dskhxnocs/image/upload/v1709179688/banner-1_o6yd9y.webp"
          class="w-full"
          loading="lazy"
          preload
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      intervalId: null,
      banner: [],
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
   
    startCarousel() {
      this.getData();
      let currentItem = 1;
      setInterval(() => {
        const currentItemElement = document.getElementById(
          `item${currentItem}`
        );
        currentItemElement.style.display = "none";
        currentItem = currentItem === 3 ? 1 : currentItem + 1;
        const nextItemElement = document.getElementById(`item${currentItem}`);
        nextItemElement.style.display = "block";
      }, 5000); //
    },
  },
};
</script>

<style>
.carousel-home-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.carousel-container {
  width: 100%;
  height: 300px; /* Adjust the height of the carousel container */
  overflow: hidden;
}

.carousel-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the entire container */
}
</style>
