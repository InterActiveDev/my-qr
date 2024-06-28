<template>
      <div class="flex justify-center">
        <section id="history">
          <div class="frame">
            <Navbar :to="navbarTo" />
  
            <div class="head-title">
              <h2>RIWAYAT PESANAN</h2>
            </div>
  
            <div class="spacer "></div>
            <div class="flex justify-around items-center mx-3 mb-3 font-bold">
              <div @click="setType('proses')" :class="type == 'proses'? 'border-b-2 border-b-[#A00703]':'border-b-2 border-b-[#fff]'" class="cursor-pointer pt-2 pb-2 w-full text-center text-black">Dalam Proses</div>              
              <div @click="setType('sukses')" :class="type == 'sukses'? 'border-b-2 border-b-[#A00703]':'border-b-2 border-b-[#fff]'" class="cursor-pointer pb-2 pt-2 w-full text-center text-gray-600 hover:text-black hover:bg-gray-200">Selesai</div>
            </div>

            <!-- sisi proses -->
            <div v-if="type === 'proses'" class="h-full border-2 border-[#00000020] mb-4 mx-3 rounded-sm">
              <div class="flex flex-col">
                <div class="flex justify-between items-center px-3 text-black pt-4 pb-3">
                  <span>Dine in</span>
                  <span>2024-06-28 10:07:10 WIB</span>
                </div>
                <hr class="mx-3">
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Meja</span>
                  <span>Bungkus</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">No Nota</span>
                  <span>HL-51203G-667E291A2BAFA</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Detail Pesanan</span>
                  <span>(1 Item) ES NDESO (1)</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Status Pembayaran</span>
                  <span class="font-bold text-red-700">PENDING</span>
                </div>
                <div class="flex justify-between items-center px-3 font-bold py-3">
                  <span class="text-gray-600">Grand Total</span>
                  <span class="text-black">Rp. 1</span>
                </div>
                <button class="border border-red-600 mx-3 py-2 mb-4 rounded-lg hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-200">
                  <span >LIHAT DETAIL</span>
                </button>
              </div>
            </div>

            <!-- sisi lunas -->
            <div v-else-if="type === 'sukses'" class="h-full border-2 border-[#00000020] mb-4 mx-3 rounded-sm">
              <div class="flex flex-col">
                <div class="flex justify-between items-center px-3 text-black pt-4 pb-3">
                  <span>Dine in</span>
                  <span>2024-06-28 10:07:10 WIB</span>
                </div>
                <hr class="mx-3">
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Meja</span>
                  <span>Bungkus</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">No Nota</span>
                  <span>HL-51203G-667E291A2BAFA</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Detail Pesanan</span>
                  <span>(1 Item) ES NDESO (1)</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Status Pembayaran</span>
                  <span class="font-bold text-green-700">SUKSES</span>
                </div>
                <div class="flex justify-between items-center px-3 font-bold py-3">
                  <span class="text-gray-600">Grand Total</span>
                  <span class="text-black">Rp. 1</span>
                </div>
                <button class="border border-red-600 mx-3 py-2 mb-4 rounded-lg hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-200">
                  <span >LIHAT DETAIL</span>
                </button>
              </div>
            </div>

            <div v-if="history === null" class="h-full border-2 border-[#00000020] mb-4 mx-3 rounded-sm">
              <div class="flex flex-col">
                <div class="flex justify-center items-center px-3 text-black pt-4 pb-3">
                  <span>DATA KOSONG</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  
    <dialog id="modalWaiting" class="modal" v-if="showModalWaiting">
      <div class="modal-box">
        <span class="loading loading-spinner"></span>
        <h2>Menyiapkan ...</h2>
      </div>
    </dialog>
  
</template>
  
<script>
  import { defineComponent } from "@vue/composition-api";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
    
  export default defineComponent({
    component: {
        Navbar,
        Footer,
    },
    data() {
      return {
        navbarTo: "/",
        type: "proses",
        history: null,
        showModalWaiting: false,
        dataPending: null,
        dataSuccess: null,
      };
    },
    mounted() {
      this.locId = localStorage.getItem("location") === null? null: atob(localStorage.getItem("location"));
      const historyTemp = localStorage.getItem("history") === null? null: JSON.parse(localStorage.getItem("history"));
      this.history = historyTemp[this.locId]
      this.dataPending = this.history.filter((item) => item.status === "proses"); 
      this.dataSuccess = this.history.filter((item) => item.status === "sukses"); 

      console.log('locId', this.locId)
      console.log('history', this.history)
    },
    methods: {
      setType(type) {
        this.type = type;
      },
    },
  });
</script>