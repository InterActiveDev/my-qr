<template>
  <!-- modal add product -->
  <dialog id="changeMenu" class="modal" ref="modal" @show="handleDialogShow">
    <div class="modal-box">
      <!-- head -->
      <div class="head-fix">
        <div class="cart-wrapper">
          <div class="card-cart">
            <div class="head">
              <div></div>
              <div class="description">
                <span>Details Menu</span>
              </div>
              <button @click="closeModalChangeMenu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  />
                </svg>
              </button>
            </div>

            <div class="product-head">
              <NuxtLazyHydrate>
                <img
                  v-if="getProduct.product.product_images"
                  :src="getProduct.product.product_images"
                  preload
                  loading="lazy"
                />
                <NuxtImg
                  v-else
                  :src="productPlaceholder"
                  preload
                  loading="lazy"
                />
              </NuxtLazyHydrate>
              <div class="description">
                <h2>{{ getProduct.product.product_name }}</h2>

                <p>
                  {{ getProduct.product.product_description }}
                </p>
                <span class="price">{{
                  formatCurrency(getProduct.product.product_pricenow)
                }}</span>

                <!-- <span
                  v-if="getProduct.product.product_stockstat === 'yes'"
                  class="text-black font-medium text-center"
                  :class="
                    getProduct.product.product_stock <= 0 ? 'text-red-500' : ''
                  "
                >
                  {{
                    getProduct.product.product_stock > 0
                      ? "Stock : " + getProduct.product.product_stock
                      : "Habis"
                  }}
                </span> -->

                <div class="split-item">
                  <div class="btn-minus">
                    <button class="btn" @click="decrementValue">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 21 5"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.192383 2.5C0.192383 1.39543 1.08781 0.5 2.19238 0.5H18.1924C19.297 0.5 20.1924 1.39543 20.1924 2.5C20.1924 3.60457 19.297 4.5 18.1924 4.5H2.19238C1.08781 4.5 0.192383 3.60457 0.192383 2.5Z"
                          fill="#DA2424"
                        />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="1"
                    class="input input-ghost w-full max-w-xs"
                    v-model="quantity"
                    readonly
                  />
                  <div class="btn-plus">
                    <button class="btn" @click="incrementValue">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.192383 10.498C0.192383 9.39348 1.08781 8.49805 2.19238 8.49805H18.1924C19.297 8.49805 20.1924 9.39348 20.1924 10.498C20.1924 11.6026 19.297 12.498 18.1924 12.498H2.19238C1.08781 12.498 0.192383 11.6026 0.192383 10.498Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.1924 0.5C11.297 0.5 12.1924 1.39543 12.1924 2.5L12.1924 18.5C12.1924 19.6046 11.297 20.5 10.1924 20.5C9.08781 20.5 8.19238 19.6046 8.19238 18.5L8.19238 2.5C8.19238 1.39543 9.08781 0.5 10.1924 0.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text text-lg text-black">Bungkus</span>
                    <input
                      type="checkbox"
                      class="toggle toggle-success toggle-md"
                      v-model="wrap"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="textarea">
              <textarea
                v-model="note"
                class="textarea textarea-bordered"
                placeholder="Tambahkan Catatan (Opsional)"
                @beforeinput="handleInput($event)"
              ></textarea>
            </div>

            <!-- <div class="warning">
              <img
                src="~/assets/icons/icon-warning.png"
                alt=""
                loading="lazy"
                preload
              />
              <div class="description">
                <span>PERHATIAN !</span>
                <p>Lengkapi Toping menu untuk menyimpan pesanan</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <!-- end head -->
      <div class="overflow-auto">
        <!-- <div class="spacer"></div> -->

        <div v-if="getProduct.product.modifier.length > 0" class="cart-wrapper">
          <div class="card-cart">
            <div class="head-topping">
              <span class="border-b-4 pb-2">Pilih Topping (Opsional)  </span>
              <div v-for="modifier in modifiers" :key="modifier.mdf_id" class="mb-2">
                <div class="text-important">
                  <span class="dark ">{{ modifier.mdf_name }} ({{ modifier.mdf_type }}) </span>
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                  >
                    <circle
                      cx="3.20239"
                      cy="3.20239"
                      r="3.20239"
                      transform="matrix(1 0 0 -1 0 7.20239)"
                      fill="#B1B1B1"
                    />
                  </svg> -->
                  <!-- <span class="muted">Pilih item</span> -->
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div
                  class="flex gap-4 items-center pt-1"
                  v-for="perModifier in modifier.children"
                  :key="perModifier.mdf_id"
                >
                  <div v-if="modifier.mdf_type === 'justone'">
                    <input
                      type="radio"
                      :name="modifier.mdf_id"
                      :id="'radio-' + perModifier.mdf_id"
                      class="radio radio-info"
                      :checked="isSelected(perModifier.mdf_id)"
                      @change="
                        addTopping(
                          perModifier.mdf_parent,
                          perModifier.mdf_id,
                          perModifier.mdf_name,
                          perModifier.mdf_price,
                          perModifier.mdf_type
                        )
                      "
                    />
                  </div>
                  <div v-else-if="modifier.mdf_type === 'multiple'">
                    <input
                      type="checkbox"
                      :id="'checkbox-' + perModifier.mdf_id"
                      class="checkbox checkbox-info"
                      :checked="isSelected(perModifier.mdf_id)"
                      @change="addTopping(
                        perModifier.mdf_parent,
                        perModifier.mdf_id,
                        perModifier.mdf_name,
                        perModifier.mdf_price,
                        modifier.mdf_type
                      )"
                    />
                  </div>
                
                  <label
                    :for="modifier.mdf_type === 'justone' ? 'radio-' + perModifier.mdf_id : 'checkbox-' + perModifier.mdf_id"
                    class="cursor-pointer"
                  >
                    <p class="text-black font-semibold">{{ perModifier.mdf_name }}</p>
                    <small class="text-black font-semibold">{{ formatCurrency(perModifier.mdf_price) }}</small>
                  </label>
                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="button-cart">
          <button class="btn btn-cart" @click="handlePaymentCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
            >
              <path
                d="M22.9744 9.25387L22.0302 5.87012C21.6658 4.56468 21.4836 3.91261 21.1099 3.42031C20.7373 2.93122 20.2313 2.55444 19.6497 2.3331C19.0646 2.10968 18.3731 2.10968 16.99 2.10968M3.02637 9.25387L3.97058 5.87012C4.33496 4.56468 4.51715 3.91261 4.89085 3.42031C5.26344 2.93122 5.76948 2.55444 6.35104 2.3331C6.93619 2.10968 7.62772 2.10968 9.01078 2.10968"
                stroke="white"
                stroke-width="1.48451"
              />
              <path
                d="M9.01074 2.10882C9.01074 1.76432 9.15085 1.43393 9.40025 1.19033C9.64965 0.946728 9.98791 0.809875 10.3406 0.809875H15.6601C16.0128 0.809875 16.3511 0.946728 16.6005 1.19033C16.8499 1.43393 16.99 1.76432 16.99 2.10882C16.99 2.45332 16.8499 2.78371 16.6005 3.02731C16.3511 3.27091 16.0128 3.40776 15.6601 3.40776H10.3406C9.98791 3.40776 9.64965 3.27091 9.40025 3.02731C9.15085 2.78371 9.01074 2.45332 9.01074 2.10882Z"
                stroke="white"
                stroke-width="1.48451"
              />
              <path
                d="M7.68213 13.7991V18.9949M18.3211 13.7991V18.9949M13.0016 13.7991V18.9949"
                stroke="white"
                stroke-width="1.48451"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.18088 18.2865C2.90699 21.1221 3.27004 22.5392 4.35123 23.3653C5.43374 24.1902 6.92985 24.1902 9.92205 24.1902H16.0794C19.0716 24.1902 20.5677 24.1902 21.6515 23.3653C22.7327 22.5392 23.0957 21.1221 23.8205 18.2865C24.9616 13.8285 25.5321 11.6008 24.3352 10.1018C23.137 8.60284 20.7831 8.60284 16.0807 8.60284H9.92072C5.21564 8.60284 2.86443 8.60284 1.66622 10.1018C0.962719 10.9812 0.868298 12.1126 1.14225 13.7986"
                stroke="white"
                stroke-width="1.48451"
                stroke-linecap="round"
              />
            </svg>
            Masukkan Keranjang
          </button>
        </div>
        <form method="dialog">
          <button class="btn btn-cancel" @click="closeModalChangeMenu">
            Batalkan
          </button>
        </form>
      </div>
    </div>
  </dialog>
  <!-- end modal add product -->

  <!-- modal waiting product -->
  <dialog id="modalWaitingProduct" class="modal" v-if="showModalWaitingProduct">
    <div class="modal-box">
      <img src="~/assets/icons/cart.gif" alt="" preload loading="lazy" />
      <h2>Menu Tersimpan di Keranjang</h2>
    </div>
  </dialog>
  <!-- end modal waiting product -->
</template>

<script>
import CarouselCart from "@/components/CarouselCart.vue";
import QuantityInput from "@/components/QuantityInput.vue";

export default {
  components: {
    CarouselCart,
    QuantityInput,
  },
  props: {
    getProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    const modifiers = this.getProduct.product.modifier;
    // Create a map to store nodes by their id
    const map = {};

    // Populate the map with all nodes
    modifiers.forEach(item => {
        map[item.mdf_id] = { ...item, children: [] };
    });

    const result = [];

    modifiers.forEach(item => {
        if (item.mdf_parent === 0) {
            result.push(map[item.mdf_id]);
        } else {
            if (map[item.mdf_parent]) {
                map[item.mdf_parent].children.push(map[item.mdf_id]);
            }
        }
    });
    return {
      showModalCart: false,
      modifiers: result,
      note: "",
      notes: "",
      itemToCart: [],
      wrap: false,
      wrapDefault: null,
      topping: [],
      quantity: 1,
      showModalWaitingProduct: false,
      cartItems: [],
      showBottomCart: false,
      modalVisible: false,
      productPlaceholder:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" wæsvg%3E',
    };
  },
  computed: {
    // Computed property untuk mengambil nilai awal dari getProduct.istakeaway
    initialWrap: {
      get() {
        return this.getProduct.istakeaway === 1; // Mengasumsikan 1 adalah true dan 0 adalah false
      },
      set(value) {
        this.wrap = value; // Perbarui nilai wrap berdasarkan input pengguna
      },
    },
    initialNote: {
      get() {
        return this.getProduct.note || ""; // Ambil nilai note dari getProduct atau string kosong jika undefined
      },
      set(value) {
        this.note = value; // Perbarui nilai note berdasarkan input pengguna
      },
    },
    initialTopping: {
      get() {
        return this.getProduct.topping || {}; // Ambil nilai topping dari getProduct atau objek kosong jika undefined
      },
      set(value) {
        this.topping = value; // Perbarui nilai topping berdasarkan input pengguna
      },
    },
    initialQuantity: {
      get() {
        return this.getProduct.quantityItem || 1; // Ambil nilai topping dari getProduct atau objek kosong jika undefined
      },
      set(value) {
        this.quantity = value; // Perbarui nilai topping berdasarkan input pengguna
      },
    },
  },
  watch: {
    // Watcher untuk menginisialisasi nilai wrap berdasarkan nilai awal
    getProduct: {
      handler(newVal) {
        this.wrap = this.initialWrap;
        this.note = this.initialNote;
        this.topping = this.initialTopping;
        this.quantity = this.initialQuantity;
      },
      immediate: true, // Memastikan watcher dipanggil saat komponen diinisialisasi
    },
    note: {
      // Watcher untuk menginisialisasi nilai wrap berdasarkan nilai awal
      handler(newNote) {
        // const emojiRegex =
        //   /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|["'])/g;
        const emojiRegex = /[^a-zA-Z0-9,.&() \-]/g;

        if (emojiRegex.test(newNote)) {
          // Jika emoji terdeteksi, tidak ada yang dilakukan (atau bisa memberikan pesan kesalahan)
          this.note = this.note.replace(emojiRegex, "");
        }
      },
      deep: true,
    },
  },
  methods: {
    checkType() {
      const check = JSON.parse(localStorage.getItem("type_order"));
      check.name === "Take away" ? (this.wrap = true) : (this.wrap = false);
      check.name === "Take away"
        ? (this.wrapDefault = true)
        : (this.wrapDefault = false);
    },
    isSelected(mdf_id) {
      if(this.topping != ''){
        const isFound = this.topping.find(x => x.id === mdf_id);
        return isFound? true:false; // Convert to boolean
      }
    },
    showchangeMenuModal() {
      this.modalVisible = true;
    },
    handlePaymentCart() {
      let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
      let wrapStatus = 0;

      if (this.wrap === true) {
        wrapStatus = 1;
      } else {
        wrapStatus = 0;
      }
      const newItem = {
        product: this.getProduct.product,
        note: this.note,
        topping: this.topping,
        quantityItem: this.quantity,
        istakeaway: wrapStatus,
      };

      const index = cartItems.findIndex(
        (item) => item.product.product_id === newItem.product.product_id
      );

      if (index !== -1) {
        cartItems[index] = newItem;
      } else {
        cartItems.push(newItem);
      }

      localStorage.setItem("cart_items", JSON.stringify(cartItems));
      localStorage.removeItem("temporary_item_cart");

      this.showModalWaitingProduct = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalWaitingProduct");
        this.modalVisible = true;
      });

      setTimeout(() => {
        let modal = document.getElementById("modalWaitingProduct");
        modal.close();
        this.$refs.modal.close();
        this.note = "";
        this.topping = "";
        this.showBottomCart = true;
        // this.$router.push("/home", cart);
      }, 1000);
    },
    incrementValue() {
      this.quantity++;
    },
    decrementValue() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addTopping(mdf_parent, mdf_id, mdf_name, mdf_price, mdf_type) {
      const item = {
        parentId: mdf_parent,
        id: mdf_id,
        name: mdf_name,
        price: mdf_price,
        type: mdf_type,
      };

      if (mdf_type === 'justone') {
        // Remove all items with the same parentId
        this.topping = this.topping.filter(t => t.parentId !== mdf_parent || t.id === mdf_id);
        
        // Add the new item
        this.topping.push(item);
      } else if (mdf_type === 'multiple') {
        // Check if the item already exists in the array
        const index = this.topping.findIndex(t => t.id === mdf_id);

        if (index === -1) {
          // If the item doesn't exist, add it to the array
          this.topping.push(item);
        } else {
          // If the item exists, remove it from the array
          this.topping.splice(index, 1);
        }
      }
    },
    showModal() {
      // Fungsi untuk menampilkan modal tambahan
      this.$refs.modal.showModal();
    },
    hideModal() {
      this.$refs.modal.close();
    },
    closeModalChangeMenu() {
      let modalchangeMenu = document.getElementById("changeMenu");
      localStorage.removeItem("temporary_item_cart");
      this.modalVisible = false;
      modalchangeMenu.close();
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    updateQuantity() {
      const newValue = parseInt(this.quantity);
      if (!isNaN(newValue) && newValue > 0) {
        this.quantity = newValue;
      }
    },
    handleInput(e) {
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const newText = e.data || "";

      const newLength = this.note.length - selectedText.length + newText.length;

      if (newLength > 150 && e.inputType !== "deleteContentBackward") {
        e.preventDefault();
      }
    },
  },
  beforeDestroy() {
    EventBus.$off("open-add-product");
  },
};
</script>
