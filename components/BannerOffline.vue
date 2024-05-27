<template>
  <div class="image-gallery w-full">
    <div v-for="(banner, index) in data" :key="index" class="image-item w-full">
      <NuxtImg :src="banner.image" class="w-full" loading="lazy" preload />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentIndex: 0,
      intervalId: null,
      banner: [
        {
          image:
            "https://res.cloudinary.com/dskhxnocs/image/upload/v1709179688/banner-1_o6yd9y.webp",
        },
        // tambahkan gambar lainnya sesuai kebutuhan
      ],
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
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 40px;
}

.image-item {
  flex: 1 1 100%; /* Menyesuaikan lebar gambar dengan layar */
}

.image-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
