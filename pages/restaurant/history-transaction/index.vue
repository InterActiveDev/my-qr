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
              <div @click="setType('proses')" :class="type == 'proses'? 'border-b-2 border-b-[#A00703] text-black':'border-b-2 border-b-[#fff] text-gray-600'" class="cursor-pointer pt-2 pb-2 w-full text-center hover:text-black hover:bg-gray-200">Dalam Proses</div>              
              <div @click="setType('lunas')" :class="type == 'lunas'? 'border-b-2 border-b-[#A00703] text-black':'border-b-2 border-b-[#fff] text-gray-600'" class="cursor-pointer pb-2 pt-2 w-full text-center hover:text-black hover:bg-gray-200">Selesai</div>
            </div>

            <!-- sisi proses -->
            <div v-if="type === 'proses'" v-for="(data) in dataPending" :key="data.nota" class="h-full border-2 border-[#00000020] mb-4 mx-3 rounded-sm">
              <div class="flex flex-col">
                <div class="flex justify-between items-center px-3 text-black pt-4 pb-3">
                  <span>{{ data.orderType.name.toUpperCase() }}</span>
                  <span> {{this.formatDate(data.data.guest_detail.guest_addr.dateadd)}} </span>
                </div>
                <hr class="mx-3">
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Meja</span>
                  <span>{{ data.data.restaurant_table }}</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">No Nota</span>
                  <span>{{ data.notaShort }}</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Jumlah Pesanan</span>
                  <span>{{ data.data.data.length }} Item</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Status Pembayaran</span>
                  <span class="font-bold text-red-700">PENDING</span>
                </div>
                <div class="flex justify-between items-center px-3 font-bold py-3">
                  <span class="text-gray-600">Grand Total</span>
                  <span class="text-black">{{ formatCurrency(data.data.payment.gtotal) }}</span>
                </div>
                <button @click="toDetail(data.nota)" class="border border-red-600 mx-3 py-2 mb-4 rounded-lg hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-200">
                  <span>LIHAT DETAIL</span>
                </button>
              </div>
            </div>

            <!-- sisi lunas -->
            <div v-else-if="type === 'lunas'" v-for="(dataLunas) in dataSuccess" :key="dataLunas.nota" class="h-full border-2 border-[#00000020] mb-4 mx-3 rounded-sm">
              <div class="flex flex-col">
                <div class="flex justify-between items-center px-3 text-black pt-4 pb-3">
                  <span>{{ dataLunas.orderType.name.toUpperCase() }}</span>
                  <span>{{ this.formatDate(dataLunas.data.guest_detail.guest_addr.dateadd) }} </span>
                </div>
                <hr class="mx-3">
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Meja</span>
                  <span>{{ dataLunas.data.restaurant_table }}</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">No Nota</span>
                  <span>{{ dataLunas.notaShort }}</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Jumlah Pesanan</span>
                  <span>{{ dataLunas.data.data.length }} Item</span>
                </div>
                <div class="flex justify-between items-center px-3 text-black py-3">
                  <span class="text-gray-500">Status Pembayaran</span>
                  <span class="font-bold text-green-700">SUKSES</span>
                </div>
                <div class="flex justify-between items-center px-3 font-bold py-3">
                  <span class="text-gray-600">Grand Total</span>
                  <span class="text-black">{{ formatCurrency(dataLunas.data.payment.gtotal) }}</span>
                </div>
                <button @click="toDetail(dataLunas.nota)" class="border border-red-600 mx-3 py-2 mb-4 rounded-lg hover:bg-red-600 text-red-600 hover:text-white ease-linear duration-200">
                  <span>LIHAT DETAIL</span>
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
  import FetchData from "~/middleware/services/Fetch.js";
    
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
        dataCheck: null,
      };
    },
    mounted() {
      this.locId = localStorage.getItem("location") === null? null: atob(localStorage.getItem("location"));
      const historyTemp = localStorage.getItem("history") === null? null: JSON.parse(localStorage.getItem("history"));
      this.history = historyTemp[this.locId]
      if(this.history !== null){
        this.dataPending = this.history.filter((item) => item.status === "pending"); 
        this.dataSuccess = this.history.filter((item) => item.status === "selesai"); 
        // this.dataCheck = this.dataPending.map((item) => item.nota); 
        // if(this.dataCheck.length > 0){
          // const url_check = "/qr_myorder/check_history";
          // FetchData.createData(url_check, this.dataCheck)
          // console.log('this.dataCheck', this.dataCheck)
        // }
      }

      const location = localStorage.getItem("location");
      const tableCode = localStorage.getItem("table_code");
      const urlTable = tableCode? "?table_code=" + btoa(tableCode): '';
      console.log('tableCode', urlTable)

      this.navbarTo = "/restaurant/detail/" + location + urlTable;

    },
    methods: {
      setType(type) {
        this.type = type;
      },
      toDetail(nota){
        this.$router.push(
          "/site/receipt/" + nota
        );
      },
      formatCurrency(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
        return formatter.format(amount);
      },
      formatDate(dateString) {
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${day} ${month} ${year} - ${hours}:${minutes}`;
      },
    },
  });
</script>