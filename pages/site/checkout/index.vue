<template>
  <div class="bg-black/50">
    <div class="flex justify-center">
      <section id="checkout">
        <div class="frame">
          <Navbar :to="navbarTo" />

          <div class="head-title">
            <h2>CHECKOUT PESANAN</h2>
          </div>

          <div class="spacer"></div>

          <div class="type-order">
            <span class="">Jenis Pesanan</span>

            <div class="type-order-data" v-if="orderTypes">
              <div
                class="type-order-option"
                :class="{ active: index === 0 }"
                v-for="(order, index) in orderTypes"
                :key="index"
                @click="typeOrderSelect(order.name, order.code_type)"
              >
                <h2>{{ order.name }}</h2>
              </div>
            </div>
          </div>

          <div class="spacer"></div>

          <div class="item-order">
            <div class="head">
              <span>Pesanan Anda </span>
              <span>Harga</span>
            </div>

            <div class="list-item-order">
              <div v-if="products">
                <div v-for="(items, index) in products" :key="items.uuid">
                  <!-- {{ currentTime <= items.orderTimeEnd && currentTime >= items.orderTimeStart }} -->
                  <div class="item mb-2">
                    <div class="col-1">
                      <span class="item-name">
                        <span
                          >({{ items.quantityItem }}x)
                          {{ items.product.product_name }}</span
                        >
                        <small
                          class="italic ml-2 text-red-700"
                          v-if="
                            (items.orderTimeStart < items.orderTimeEnd &&
                              currentTime < items.orderTimeStart) ||
                            (items.orderTimeStart > items.orderTimeEnd &&
                              currentTime < items.orderTimeStart &&
                              currentTime > items.orderTimeEnd)
                          "
                          >*Tidak tersedia diwaktu
                        </small>

                        <p class="font-grey">
                          {{ formatCurrency(items.product.product_pricenow) }}
                        </p>
                        <p class="topping" v-for="topping in items.topping">
                          {{
                            topping.name != undefined
                              ? "( " +
                                topping.name +
                                " - " +
                                formatCurrency(topping.price) +
                                " )"
                              : ""
                          }}
                        </p>
                        <p class="font-grey">
                          {{
                            items.note.length > 50
                              ? "Notes: " + items.note.slice(0, 30) + "..."
                              : items.note
                              ? "Notes: " + items.note
                              : ""
                          }}
                        </p>
                        <span class="font-bold">
                          {{ items.istakeaway == 1 ? "[ Bungkus ]" : "" }}
                        </span>
                      </span>

                      <div class="qty">
                        <div class="split-item">
                          <div class="btn-minus">
                            <button class="btn" @click="decrementValue(index)">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="5"
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
                            :value="items.quantityItem"
                            @input="updateQuantity(index, $event)"
                            readonly
                          />
                          <div class="btn-plus">
                            <button class="btn" @click="incrementValue(index)">
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

                        <div class="btn-edit" @click="handleMenuChange(items)">
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022"
                                />
                                <path d="m14.5 6.5l3 3" />
                              </g>
                            </svg>
                          </button>
                        </div>

                        <div>
                          <button @click="removeItem(index)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 34 34"
                              fill="none"
                            >
                              <path
                                d="M13.964 7.28585H20.0354C20.0354 6.48073 19.7156 5.70859 19.1463 5.13928C18.577 4.56997 17.8048 4.25014 16.9997 4.25014C16.1946 4.25014 15.4225 4.56997 14.8531 5.13928C14.2838 5.70859 13.964 6.48073 13.964 7.28585ZM12.1426 7.28585C12.1426 5.99766 12.6543 4.76223 13.5652 3.85134C14.4761 2.94044 15.7115 2.42871 16.9997 2.42871C18.2879 2.42871 19.5233 2.94044 20.4342 3.85134C21.3451 4.76223 21.8569 5.99766 21.8569 7.28585H29.4462C29.6877 7.28585 29.9193 7.3818 30.0901 7.5526C30.2609 7.72339 30.3569 7.95503 30.3569 8.19657C30.3569 8.4381 30.2609 8.66975 30.0901 8.84054C29.9193 9.01133 29.6877 9.10728 29.4462 9.10728H27.8554L26.3777 26.8395C26.2701 28.1295 25.6818 29.3319 24.7293 30.2084C23.7767 31.0849 22.5296 31.5715 21.2352 31.5716H12.7643C11.4699 31.5715 10.2227 31.0849 9.27019 30.2084C8.31766 29.3319 7.72931 28.1295 7.62179 26.8395L6.14401 9.10728H4.55329C4.31176 9.10728 4.08011 9.01133 3.90932 8.84054C3.73853 8.66975 3.64258 8.4381 3.64258 8.19657C3.64258 7.95503 3.73853 7.72339 3.90932 7.5526C4.08011 7.3818 4.31176 7.28585 4.55329 7.28585H12.1426ZM9.43715 26.6877C9.50659 27.5224 9.88719 28.3006 10.5035 28.8678C11.1197 29.435 11.9267 29.75 12.7643 29.7501H21.2352C22.0727 29.75 22.8797 29.435 23.496 28.8678C24.1123 28.3006 24.4929 27.5224 24.5623 26.6877L26.0292 9.10728H7.97151L9.43715 26.6877ZM14.2676 13.3573C14.5091 13.3573 14.7408 13.4532 14.9116 13.624C15.0823 13.7948 15.1783 14.0265 15.1783 14.268V24.5894C15.1783 24.831 15.0823 25.0626 14.9116 25.2334C14.7408 25.4042 14.5091 25.5001 14.2676 25.5001C14.026 25.5001 13.7944 25.4042 13.6236 25.2334C13.4528 25.0626 13.3569 24.831 13.3569 24.5894V14.268C13.3569 14.0265 13.4528 13.7948 13.6236 13.624C13.7944 13.4532 14.026 13.3573 14.2676 13.3573ZM20.6426 14.268C20.6426 14.0265 20.5466 13.7948 20.3758 13.624C20.205 13.4532 19.9734 13.3573 19.7319 13.3573C19.4903 13.3573 19.2587 13.4532 19.0879 13.624C18.9171 13.7948 18.8212 14.0265 18.8212 14.268V24.5894C18.8212 24.831 18.9171 25.0626 19.0879 25.2334C19.2587 25.4042 19.4903 25.5001 19.7319 25.5001C19.9734 25.5001 20.205 25.4042 20.3758 25.2334C20.5466 25.0626 20.6426 24.831 20.6426 24.5894V14.268Z"
                                fill="#DA2424"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <p class="">&nbsp;</p>
                      <p>
                        {{
                          formatCurrency(
                            (items.product.product_pricenow + items.topping.reduce((acc, mdf) => acc + mdf.price, 0) ) *
                              parseInt(items.quantityItem)
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-add-more" @click="backtoHome">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                >
                  <path
                    d="M23.4744 9.25381L22.5302 5.87006C22.1658 4.56462 21.9836 3.91255 21.6099 3.42025C21.2373 2.93115 20.7313 2.55438 20.1497 2.33304C19.5646 2.10962 18.8731 2.10962 17.49 2.10962M3.52637 9.25381L4.47058 5.87006C4.83496 4.56462 5.01715 3.91255 5.39085 3.42025C5.76344 2.93115 6.26948 2.55438 6.85104 2.33304C7.43619 2.10962 8.12772 2.10962 9.51078 2.10962"
                    stroke="white"
                    stroke-width="1.48451"
                  />
                  <path
                    d="M9.51074 2.10876C9.51074 1.76426 9.65085 1.43387 9.90025 1.19027C10.1497 0.946667 10.4879 0.809814 10.8406 0.809814H16.1601C16.5128 0.809814 16.8511 0.946667 17.1005 1.19027C17.3499 1.43387 17.49 1.76426 17.49 2.10876C17.49 2.45326 17.3499 2.78365 17.1005 3.02725C16.8511 3.27085 16.5128 3.4077 16.1601 3.4077H10.8406C10.4879 3.4077 10.1497 3.27085 9.90025 3.02725C9.65085 2.78365 9.51074 2.45326 9.51074 2.10876Z"
                    stroke="white"
                    stroke-width="1.48451"
                  />
                  <path
                    d="M8.18164 13.7991V18.9948M18.8206 13.7991V18.9948M13.5011 13.7991V18.9948"
                    stroke="white"
                    stroke-width="1.48451"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.68088 18.2864C3.40699 21.122 3.77004 22.5391 4.85123 23.3653C5.93374 24.1901 7.42985 24.1901 10.4221 24.1901H16.5794C19.5716 24.1901 21.0677 24.1901 22.1515 23.3653C23.2327 22.5391 23.5957 21.122 24.3205 18.2864C25.4616 13.8284 26.0321 11.6007 24.8352 10.1018C23.637 8.60278 21.2831 8.60278 16.5807 8.60278H10.4207C5.71564 8.60278 3.36443 8.60278 2.16622 10.1018C1.46272 10.9811 1.3683 12.1125 1.64225 13.7986"
                    stroke="white"
                    stroke-width="1.48451"
                    stroke-linecap="round"
                  />
                </svg>
                Tambah Pesanan Lainya
              </button>
            </div>

            <div class="promo-option">
              <div class="promo-container">
                <span>{{ promos.length }} Promo tersedia</span>
                <span class="flex see-all" @click="listPromo()"
                  >Lihat Semua
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#d9a727"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div class="promo-items" v-if="selectedPromo != ''">
                <div class="close-promo">
                  <span class="promo-text"
                    >{{ selectedPromo.promo_description }}
                    {{
                      selectedPromo.disc_type == "%"
                        ? `(${selectedPromo.disc_amount}%)`
                        : `Rp. ${selectedPromo.disc_amount}`
                    }}
                  </span>
                </div>
                <button class="cancel-btn" @click="removePromo()">
                  Batalkan
                </button>
              </div>
            </div>

            <div class="payment-detail">
              <p class="label-text">Detail Pembayaran</p>

              <div class="detail-item">
                <span class="detail-text">Sub Total</span>

                <span class="detail-text">{{ formatCurrency(subTotal) }}</span>
              </div>

              <div class="detail-item" v-if="promo">
                <span class="detail-text">Promo</span>

                <span class="detail-text">- {{ formatCurrency(promo) }}</span>
              </div>

              <div class="detail-item" v-if="serviceFee">
                <span class="detail-text">{{ serviceFeeName }} </span>

                <span class="detail-text">{{
                  formatCurrency(serviceFee)
                }}</span>
              </div>

              <div class="detail-item" v-if="tax">
                <span class="detail-text">{{ taxName }} </span>

                <span class="detail-text">{{ formatCurrency(tax) }}</span>
              </div>

              <div class="detail-item" v-if="deliveryFee">
                <span class="detail-text">Delivery Cost</span>

                <span class="detail-text">{{
                  formatCurrency(deliveryFee)
                }}</span>
              </div>

              <div class="detail-item" v-if="roundingType != 'none'">
                <span class="detail-text">Rounding</span>

                <span class="detail-text">{{ formatCurrency(rounding) }}</span>
              </div>

              <p class="detail-text"></p>
            </div>
          </div>
          <!-- <div class="spacer"></div> -->

          <!-- summary pay -->
          <div class="card-summary">
            <div class="card-item">
              <div class="item">
                <h2>Total</h2>
                <div class="price">{{ formatCurrency(totalPay) }}</div>
              </div>
            </div>

            <div class="btn-group">
              <button
                class="btn btn-pay"
                :class="this.totalPay <= 0 ? ' cursor-not-allowed' : ''"
                @click="openModalDataCustomer"
              >
                BAYAR
              </button>
            </div>
          </div>
          <!-- end summary pay -->
        </div>
      </section>
    </div>

    <!-- modal select payments -->
    <dialog
      id="modalSelectPayments"
      class="modal"
      style="border: 3px solid #808080"
    >
      <div class="modal-box">
        <div class="title">Pilih Metode pembayaran</div>

        <div
          v-for="(payment, index) in paymentMethod"
          :key="index"
          class="row-item"
        >
          <!-- ini qris buat test data lokal -->
          <!-- <div class="item" @click="openModal('e-money')">
            <div class="col-1">
              <img
                src="~/assets/icons/qris.png"
                loading="lazy"
                preload
                alt=""
              />
              <span>QRIS </span>
            </div>
          </div> -->
          <!-- :class="payment.payment_category === 'e-money'? 'bg-gray-200':'' " -->
          <div class="item" @click="openModal(payment)">
            <div class="col-1">
              <img
                v-if="payment.payment_category === 'e-money'"
                src="~/assets/icons/qris.png"
                loading="lazy"
                alt=""
              />
              <img
                v-else-if="
                  payment.payment_category === 'cash' &&
                  payment.payment_method === 'EDC'
                "
                src="~/assets/icons/edc.png"
                loading="lazy"
                alt=""
              />

              <img v-else src="~/assets/icons/cash.png" loading="lazy" alt="" />
              <span>{{ payment.payment_method }} </span>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal select payments -->

    <!-- modal qris method -->
    <dialog id="modalQrisMethod" class="modal">
      <div class="modal-box">
        <img
          src="~/assets/images/buble.png"
          loading="lazy"
          preload
          class="buble-img"
          alt="Buble"
        />
        <div class="head">
          <div></div>
          <div class="description">
            <span>Pembayaran</span>
          </div>
          <form method="dialog">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 2.5C10.25 2.5 2.5 10.25 2.5 20C2.5 29.75 10.25 37.5 20 37.5C29.75 37.5 37.5 29.75 37.5 20C37.5 10.25 29.75 2.5 20 2.5ZM26.75 28.75L20 22L13.25 28.75L11.25 26.75L18 20L11.25 13.25L13.25 11.25L20 18L26.75 11.25L28.75 13.25L22 20L28.75 26.75L26.75 28.75Z"
                  fill="#DA2424"
                />
              </svg>
            </button>
          </form>
        </div>

        <div class="total-price">
          <span class="title">Total Pembayaran</span>
          <span class="price">{{ formatCurrency(totalPay) }}</span>
        </div>

        <div class="alert">
          <div class="head">
            <img
              src="~/assets/icons/warning.png"
              loading="lazy"
              preload
              alt=""
              srcset=""
            />
            <p>
              Mohon segera membayar pesanan dan tunggu sampai muncul halaman
              pembayaran berhasil
            </p>
          </div>
        </div>

        <div class="qris" @click="toInputTable">
          <!-- terapkan qr disini -->
          <template v-if="qrCodeImage">
            <!-- Tampilkan QR code jika sudah digenerate -->
            <img :src="qrCodeImage" alt="QR Code" />
          </template>
          <template v-else>
            <!-- Placeholder blur ketika QR code belum tergenerate -->
            <div
              style="
                width: 400px;
                height: 400px;
                background-color: #f0f0f0;
                filter: blur(5px);
              "
            ></div>
          </template>
          <span>QRIS MIE GACOAN</span>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal qris method -->

    <!-- modal promo -->
    <dialog id="modalPromo" class="modal bg-black/50" :open="showModalPromo">
      <div class="modal-box">
        <div class="modal-header">
          <h1>Pilih Promo</h1>
          <button @click="closeListPromo()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        <div class="promo-item" v-for="(promo, index) in promos" :key="index">
          <div class="promo-item-img">
            <img
              v-if="promo.promo_img != null && promo.promo_img != ''"
              :src="promo.promo_img"
              alt="img"
            />
            <img
              v-else
              src="http://hungryline.interactiveholic.net/images/restaurant/7.jpg"
              alt="img"
            />
          </div>

          <div class="promo-detail">
            <div class="promo-detail-info">
              <span class="promo-name">{{ promo.promo_title }}</span>
              <div
                class="promo-info"
                v-if="
                  promo.promo_description.toUpperCase() !=
                  promo.promo_title.toUpperCase()
                "
              >
                {{ promo.promo_description }}
              </div>
              <div class="promo-info" v-if="promo.disc_type == '%'">
                Discount {{ promo.disc_amount }} {{ promo.disc_type }}
              </div>
              <div class="promo-info" v-else-if="promo.disc_type == 'Rp'">
                Discount {{ promo.disc_type }} {{ promo.disc_amount }}
              </div>
              <div class="promo-info" v-else></div>
            </div>

            <button @click="openDetailPromo(promo.promo_id)">Lihat</button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal promo -->

    <!-- modal detail promo -->
    <dialog
      id="modalPromoDetail"
      class="modal bg-black/50"
      :open="showModalPromoDetail"
    >
      <div class="modal-box">
        <div class="modal-header">
          <h1>Pilih Promo</h1>
          <button @click="closePromoDetail()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        <hr />

        <div class="modal-promo">
          <div class="modal-promo-detail-header">
            <span>{{ prTitle }}</span>
            <span>{{ prDescription }}</span>
          </div>

          <div class="modal-promo-detail">
            <div class="detail-container">
              <span class="promo-title">Promo Mulai</span>
              <span class="promo-value">{{ formatDate(prDateBegin) }}</span>
            </div>

            <div class="detail-container">
              <span class="promo-title">Jam Berlaku</span>
              <span class="promo-value">{{ prHourBegin }}</span>
            </div>

            <div class="detail-container">
              <span class="promo-title" style="color: red !important"
                >Item yang Tersedia</span
              >
              <ul>
                <li v-for="(item, index) in filteredProducts" :key="index">
                  • {{ item }}
                </li>
              </ul>
            </div>

            <div class="detail-container">
              <span class="promo-title">Maksimal Pesanan</span>
              <span class="promo-value">{{ maximalOrderItems }}</span>
            </div>

            <div class="detail-container">
              <span class="promo-title">Jumlah Total Maksimal</span>
              <span class="promo-value" v-if="maximumAmount > 0">
                {{ formatCurrency(maximumAmount) }}</span
              >
              <span class="promo-value" v-else> Tanpa jumlah maksimal</span>
            </div>

            <div class="detail-container">
              <span class="promo-title">Pembayaran yang tersedia</span>
              <ul>
                <li v-for="(data, index) in paymentsPromo" :key="index">
                  • {{ data.payment_method }}
                </li>
              </ul>
            </div>

            <div class="detail-container">
              <span class="promo-title">Promo Berakhir</span>
              <span class="promo-value">{{ formatDate(prDateEnd) }}</span>
            </div>

            <div class="detail-container">
              <span class="promo-title">Hari Berlaku</span>
              <ul>
                <li v-for="(data, index) in validDays" :key="index">
                  • {{ data }}
                </li>
              </ul>
            </div>

            <div class="detail-container">
              <span class="promo-title">Kategori Item</span>
              <ul>
                <li v-for="(data, index) in categories" :key="index">
                  • {{ data.category_name }}
                </li>
              </ul>
            </div>

            <div class="detail-container">
              <span class="promo-title">Jumlah Total Minimal</span>
              <span class="promo-value" v-if="minimumAmount > 0">{{
                formatCurrency(minimumAmount)
              }}</span>
              <span class="promo-value" v-else>Tidak ada minimal</span>
            </div>

            <button @click="selectPromo(idPromo)">Pilih</button>
          </div>
        </div>

        <!-- modal error -->
        <div></div>
        <!-- pass some data to here -->
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal detail promo -->

    <!-- modal error promo -->
    <dialog :open="showModalErrorPromo" class="modal bg-black/50">
      <div class="modal-box flex flex-col">
        <div class="flex flex-row justify-end items-center">
          <button @click="closeErrorModal()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        <div class="mt-7 text-center">
          <h1>
            Produk yang anda pilih tidak memenuhi kriteria untuk menggunakan
            Promo ini
          </h1>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal promo -->

    <!-- modal error  -->
    <dialog :open="showModalError" class="modal modal-general bg-black/50">
      <div class="modal-box flex flex-col" style="gap: 0px">
        <div class="flex flex-row justify-end items-center">
          <button @click="closeErrorModal()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        <div class="flex justify-center">
          <img
            src="~/assets/images/illustration-error.png"
            style="width: 200px !important"
            alt="error"
          />
        </div>

        <div class="mt-7 text-center">
          <h1 class="text-slate-950">{{ errorMessage }}</h1>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal  -->
  </div>

  <dialog id="modalWaiting" class="modal" v-if="showModalWaiting">
    <div class="modal-box">
      <span class="loading loading-spinner"></span>
      <h2>Menyiapkan ...</h2>
    </div>
  </dialog>

  <ModalChangeMenu
    v-if="showModalChangeMenu"
    :getProduct="changeItem"
    :key="modalKey"
    ref="modalComponent"
  />

  <!-- input information data -->
  <dialog
    id="modalInformationData"
    class="modal"
    style="border: 3px solid #808080"
  >
    <div class="modal-box" role="dialog">
      <h3>Isi nama dahulu</h3>

      <div class="form-control name">
        <div class="label">
          <span class="label-text"
            >Nama <small class="text-error">*</small></span
          >
        </div>
        <input
          v-if="this.selectedOrderType.code_type === 0"
          type="text"
          v-model="name"
          @input="filterName"
          placeholder="Nama pemesan"
          class="input input-bordered"
          autofocus
        />

        <input
          type="text"
          v-model="name"
          @input="filterName"
          placeholder="Nama pemesan"
          class="input input-bordered"
          v-else
        />
        <span class="text-error text-sm mt-2" v-if="errors !== ''">{{
          errors
        }}</span>
      </div>

      <div class="form-control phone">
        <div class="label">
          <span class="label-text">Nomor Telepon</span>
        </div>
        <input
          type="number"
          v-model="phone"
          placeholder="08xxxx"
          class="input input-bordered"
        />
      </div>

      <button class="btn-primary" @click="goToReceipt">Mulai Pesan</button>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import ProductSlider from "@/components/ProductSlider.vue";
import ProductSliderDouble from "@/components/ProductSliderDouble.vue";
import Footer from "@/components/Footer.vue";
import FetchData from "~/middleware/services/Fetch.js";
import ModalChangeMenu from "@/components/ModalChangeMenu.vue";
import QRCode from "qrcode";

export default defineComponent({
  component: {
    Navbar,
    HomeCarousel,
    ProductSlider,
    ProductSliderDouble,
    Footer,
    ModalChangeMenu,
  },
  data() {
    return {
      navbarTo: "/",
      errorsTable: "",
      errors: "",
      errorMessage: "",
      currentTime: "",
      name: "",
      table: "",
      tableCode: "",
      phone: "",
      showModalError: false,
      showModalErrorPromo: false,
      showModalPromo: false,
      showModalPromoDetail: false,
      showModalWaiting: false,
      validatePayment: false,
      products: [],
      orderTypes: [],
      promos: [],
      selectedOrderType: [],
      subTotal: 0,
      countSubTotal: 0,
      promo: 0,
      deliveryFee: 0,
      totalPay: 0,
      quantity: 1,
      promo: 0,
      tax: 0,
      taxName: "",
      taxPercentage: 0,
      serviceFeeName: "",
      serviceFee: 0,
      serviceFeePercentage: 0,
      serviceFeeType: "",
      rounding: 0,
      roundingType: "none",
      dataRestaurant: [],
      link: "",
      qrCodeImage: "",
      noNota: "",
      invoiceId: "",
      refNo: "",
      mID: "",
      intervalId: null,
      transactionId: "",
      paymentMethod: [],
      nameMethod: 0,
      prTitle: "",
      prDescription: "",
      prDateBegin: "",
      prDateEnd: "",
      prHourBegin: "",
      filteredProducts: [],
      maximalOrderItems: "",
      maximumAmount: 0,
      minimumAmount: 0,
      filteredPayments: [],
      validDays: [],
      categories: [],
      paymentsPromo: [],
      idPromo: "",
      cuponPromo: null,
      discType: "",
      discAmmount: "",
      selectedPromo: [],
      showModalChangeMenu: false,
      changeItem: null,
      modalKey: 0,
    };
  },
  mounted() {
    // localStorage.removeItem("qrContent");
    // localStorage.removeItem("checkoutData");
    this.getList();
    this.updateCurrentTime();
    this.localStorageTimer = setInterval(this.checkLocalStorage, 500);
  },
  beforeDestroy() {
    // Clear the interval timer when the component is destroyed
    clearInterval(this.localStorageTimer);
  },
  methods: {
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
      // this.currentTime = `${hours}:${minutes}`;
      this.currentTime = time;
    },
    checkLocalStorage() {
      // const currentCartItems = JSON.parse(localStorage.getItem("cart_items"));
      const currentCartItems =
        JSON.parse(localStorage.getItem("cart_items")) || [];
      // if (JSON.stringify(currentCartItems) !== []) {
      if (currentCartItems.length !== 0) {
        this.getList();
      }
    },
    getList() {
      const location = localStorage.getItem("location");
      const tableCodeRaw = localStorage.getItem("table_code");
      if (
        localStorage.getItem("table_code") == "null" ||
        localStorage.getItem("table_code") == null
      ) {
        this.navbarTo = "/restaurant/detail/" + location;
      } else {
        this.navbarTo =
          "/restaurant/detail/" +
          location +
          "?table_code=" +
          btoa(tableCodeRaw);
      }
      const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
      const data_restaurant =
        JSON.parse(localStorage.getItem("data_restaurant")) || [];
      this.promos = JSON.parse(localStorage.getItem("promo")) || [];
      this.tableCode = tableCodeRaw ? tableCodeRaw : "";
      let orderTypeData = localStorage.getItem("order_type");
      localStorage.setItem(
        "selected_type_order",
        JSON.stringify(JSON.parse(orderTypeData)[0])
      );
      this.selectedOrderType = JSON.parse(orderTypeData)[0];

      if (!this.selectedOrderType) {
        this.$router.push("/restaurant/detail/" + location);
        return;
      }

      this.paymentMethod =
        JSON.parse(localStorage.getItem("payment_method")) || [];
      this.orderTypes = JSON.parse(localStorage.getItem("order_type")) || [];
      this.dataRestaurant = data_restaurant;
      this.products = cartItems;

      this.countSubTotal = cartItems.length;
      const dataTotal = this.calculateTotal(cartItems, data_restaurant);
      this.subTotal = dataTotal["totalPrice"] + dataTotal["totalModifier"];
      this.serviceFeeType = data_restaurant.service_type_val;
      this.taxName = data_restaurant.tax_name;
      this.serviceFeeName = data_restaurant.service_name;
      if (data_restaurant.tax_nominal != null) {
        this.tax = Math.round(
          (this.subTotal * data_restaurant.tax_nominal) / 100
        );
        this.taxPercentage = data_restaurant.tax_nominal;
      }
      if (data_restaurant.service_nominal != null) {
        if (this.serviceFeeType == "val") {
          this.serviceFee = data_restaurant.service_nominal;
        } else {
          this.serviceFee = Math.round(
            (this.subTotal * data_restaurant.service_nominal) / 100
          );
          this.serviceFeePercentage = data_restaurant.service_nominal;
        }
      }

      let tempTotalPay = 0;
      let divided = 0;
      let mod = 0;

      tempTotalPay =
        this.subTotal +
        this.serviceFee +
        this.tax +
        this.deliveryFee -
        this.promo;

      divided = Math.floor(tempTotalPay / data_restaurant.rounding_nominal);
      mod = tempTotalPay % data_restaurant.rounding_nominal;

      this.roundingType = data_restaurant.rounding;
      if (data_restaurant.rounding == "up") {
        this.rounding =
          Math.ceil(tempTotalPay / data_restaurant.rounding_nominal) *
            data_restaurant.rounding_nominal -
          tempTotalPay;
      } else if (data_restaurant.rounding == "down") {
        this.rounding =
          Math.floor(tempTotalPay / data_restaurant.rounding_nominal) *
            data_restaurant.rounding_nominal -
          tempTotalPay;
      } else if (data_restaurant.rounding == "auto") {
        if (mod >= data_restaurant.rounding_nominal / 2) {
          this.rounding =
            Math.ceil(tempTotalPay / data_restaurant.rounding_nominal) *
              data_restaurant.rounding_nominal -
            tempTotalPay;
        } else {
          this.rounding =
            Math.floor(tempTotalPay / data_restaurant.rounding_nominal) *
              data_restaurant.rounding_nominal -
            tempTotalPay;
        }
      } else {
        this.rounding = 0;
      }

      // disable buat tes tanpa rounding
      // this.totalPay = tempTotalPay;
      this.totalPay = tempTotalPay + this.rounding;
      if (this.totalPay <= 0) {
        // kalau jumlah kurang dari 0 di disable button nya
        this.validatePayment = true;
      }

      const promoSelected = JSON.parse(localStorage.getItem("promo_selected"));
      if (promoSelected) {
        this.cuponPromo = promoSelected;
      }
    },
    filterName(event) {
      // Filter out non-alphabet characters
      this.name = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    },
    listPromo() {
      this.showModalPromo = true;
    },
    closeListPromo() {
      this.showModalPromo = false;
    },
    closeErrorModal() {
      this.showModalError = false;
    },
    openDetailPromo(promoId) {
      this.showModalPromo = false;
      this.showModalPromoDetail = true;

      const foundPromo = this.promos.find(
        (promo) => promo.promo_id === promoId
      );

      const data_menu = JSON.parse(localStorage.getItem("data_menu")) || [];
      this.categories = JSON.parse(localStorage.getItem("data_menu")) || [];
      const payment_methods =
        JSON.parse(localStorage.getItem("payment_method")) || [];
      const paymentIds = foundPromo.paymethod_can.split("|").filter((id) => id);
      this.paymentsPromo = payment_methods.filter((method) =>
        paymentIds.includes(String(method.payment_id))
      );

      const productIds = foundPromo.product_ids
        .split("|")
        .filter((id) => id)
        .map((id) => parseInt(id));

      this.validDays = foundPromo.valid_days.split("|").filter((days) => days);

      function getProductNamesByIds(data_menu, productIds) {
        return data_menu.flatMap((category) => {
          const filteredProducts = category.product_details.filter((product) =>
            productIds.includes(product.product_id)
          );
          return filteredProducts.map((product) => product.product_name);
        });
      }
      this.filteredProducts = getProductNamesByIds(data_menu, productIds);

      this.prTitle = foundPromo.promo_title;
      this.prDescription = foundPromo.promo_description;
      this.prDateBegin = foundPromo.date_promobegin;
      this.prDateEnd = foundPromo.date_promoend;

      let [hoursBegin, minutesBegin] = foundPromo.hour_promobegin.split(":");
      let [hoursEnd, minutesEnd] = foundPromo.hour_promoend.split(":");

      this.prHourBegin =
        `${hoursBegin}:${minutesBegin}` + " - " + `${hoursEnd}:${minutesEnd}`;

      this.maximalOrderItems =
        foundPromo.limit_usage_to_x_items > 0
          ? foundPromo.limit_usage_to_x_items
          : "There is no maximal order items";
      this.maximumAmount = foundPromo.maximum_amount;
      this.minimumAmount = foundPromo.minimum_amount;

      function getPayments(payment_methods, paymentIds) {
        return payment_methods.filter((item) =>
          paymentIds.includes(item.payment_id)
        );
      }
      this.filteredPayments = getPayments(payment_methods, paymentIds);
      this.idPromo = foundPromo.promo_id;

      this.discType = foundPromo.disc_type;
      this.discAmmount = foundPromo.disc_amount;
    },
    selectPromo(id) {
      // edwin
      let isError = true;
      this.selectedPromo = this.promos.filter(
        (promo) => promo.promo_id === id
      )[0];
      localStorage.setItem(
        "selected_promo",
        JSON.stringify(this.selectedPromo)
      );

      if (this.selectedPromo) {
        this.products.filter((element) => {
          const productId = element.product.product_id.toString(); // Ensure the product ID is a string
          if (this.selectedPromo.product_ids.includes(productId)) {
            isError = false;
          }
        });
      }
      this.showModalPromoDetail = false;

      if (isError == true) {
        this.showModalErrorPromo = true;

        setTimeout(() => {
          this.removePromo();
          this.showModalErrorPromo = false;
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        this.recalculatePayment();
      }
    },
    removePromo() {
      this.promo = 0;
      localStorage.removeItem("selected_promo");
      this.recalculatePayment();
      this.selectedPromo = [];
    },
    closePromoDetail() {
      this.showModalPromoDetail = false;
    },
    removeItem(index) {
      this.products.splice(index, 1);

      localStorage.setItem("cart_items", JSON.stringify(this.products));
      const cartItems = JSON.parse(localStorage.getItem("cart_items"));
      if (cartItems.length == 0) {
        localStorage.removeItem("cart_items");
        localStorage.removeItem("checkoutData");
        localStorage.removeItem("qrContent");
        this.backtoHome();
      }

      // Panggil metode untuk menghitung ulang pembayaran
      this.recalculatePayment();
    },
    checkPromoValidity() {
      let isError = true;
      this.promos = JSON.parse(localStorage.getItem("promo")) || [];
      this.selectedPromo = this.promos.filter(
        (promo) => promo.promo_id === id
      )[0];
      localStorage.setItem(
        "selected_promo",
        JSON.stringify(this.selectedPromo)
      );

      if (this.selectedPromo) {
        this.products.filter((element) => {
          const productId = element.product.product_id.toString(); // Ensure the product ID is a string
          if (this.selectedPromo.product_ids.includes(productId)) {
            isError = false;
          }
        });
      }
      this.showModalPromoDetail = false;
    },
    calculateTotal(items, data_restaurant) {
      let productIds = "";
      if (this.selectedPromo != "") {
        productIds = this.selectedPromo.product_ids
          .split("|")
          .filter((id) => id)
          .map((id) => parseInt(id));
      }

      let totalPrice = 0;
      let totalPromo = 0;
      let totalModifier = 0;
      items.forEach((item) => {
        if (
          item.product &&
          item.product.product_pricenow &&
          item.quantityItem
        ) {
          totalPrice +=
            (parseFloat(item.product.product_pricenow)) *
            item.quantityItem;

          // Calculate total promo for items with product_id in productIds
          if (productIds.includes(item.product.product_id)) {
            totalPromo +=
              (parseFloat(item.product.product_pricenow)) *
              item.quantityItem;
          }
          totalModifier += (parseFloat(item.topping.reduce((acc, mdf) => acc + mdf.price, 0))) * item.quantityItem;
        }
      });
      const data = {
        totalPrice: totalPrice,
        totalPromo: totalPromo,
        totalModifier: totalModifier,
      };

      return data;
    },
    recalculatePayment() {
      this.countSubTotal = this.products.length;
      const selectedPromo = localStorage.getItem("selected_promo");
      const dataTotal = this.calculateTotal(this.products);
      this.subTotal = dataTotal["totalPrice"];

      if (this.discType != "" && this.discAmmount != "" && selectedPromo) {
        let promTot = 0;
        this.products.filter((element) => {
          const productId = element.product.product_id.toString(); // Ensure the product ID is a string
          if (this.selectedPromo.product_ids.includes(productId)) {
            if (this.selectedPromo.disc_type == "%") {
              promTot += Math.floor(
                (element.product.product_pricenow / 100) *
                  this.selectedPromo.disc_amount *
                  element.quantityItem
              );
            }
          }
        });
        this.promo = promTot;
      }
      if (this.dataRestaurant.tax_nominal != null) {
        this.tax = Math.round(
          (this.subTotal * this.dataRestaurant.tax_nominal) / 100
        );
        this.taxPercentage = this.dataRestaurant.tax_nominal;
      }
      if (this.dataRestaurant.service_nominal != null) {
        this.serviceFee = Math.round(
          (this.subTotal * this.dataRestaurant.service_nominal) / 100
        );
        this.serviceFeePercentage = this.dataRestaurant.service_nominal;
      }

      let tempTotalPay = 0;
      tempTotalPay =
        this.subTotal +
        this.serviceFee +
        this.tax +
        this.deliveryFee -
        this.promo;

      let divided = 0;
      let mod = 0;
      divided = Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal);
      mod = tempTotalPay % this.dataRestaurant.rounding_nominal;

      if (this.dataRestaurant.rounding == "up") {
        this.rounding =
          Math.ceil(tempTotalPay / this.dataRestaurant.rounding_nominal) *
            this.dataRestaurant.rounding_nominal -
          tempTotalPay;
      } else if (this.dataRestaurant.rounding == "down") {
        this.rounding =
          Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal) *
            this.dataRestaurant.rounding_nominal -
          tempTotalPay;
      } else if (this.dataRestaurant.rounding == "auto") {
        if (mod >= this.dataRestaurant.rounding_nominal / 2) {
          this.rounding =
            Math.ceil(tempTotalPay / this.dataRestaurant.rounding_nominal) *
              this.dataRestaurant.rounding_nominal -
            tempTotalPay;
        } else {
          this.rounding =
            Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal) *
              this.dataRestaurant.rounding_nominal -
            tempTotalPay;
        }
      } else {
        this.rounding = 0;
      }

      // disable buat tes tanpa rounding
      // this.totalPay = tempTotalPay;
      this.totalPay = tempTotalPay + this.rounding;
      if (this.totalPay <= 0) {
        // kalau jumlah kurang dari 0 di disable button nya
        this.validatePayment = true;
      }
    },
    backtoHome() {
      const location = localStorage.getItem("location");
      const tableCodeRaw = localStorage.getItem("table_code");
      if (tableCodeRaw) {
        this.$router.push(
          "/restaurant/detail/" + location + "?table_code=" + btoa(tableCodeRaw)
        );
      } else {
        this.$router.push("/restaurant/detail/" + location);
      }
    },
    openModalDataCustomer() {
      if(this.totalPay == 0) {
        return;
      } 

      let modal = document.getElementById("modalInformationData");
      modal.showModal();

      const dataCustomer = JSON.parse(localStorage.getItem("data_customer"));
      if (dataCustomer) {
        this.name = dataCustomer.name;
        this.phone = dataCustomer.phone;
      }
    },
    openModalPayment() {
      localStorage.removeItem("checkoutData");

      let modalCustomer = document.getElementById("modalInformationData");
      let modal = document.getElementById("modalSelectPayments");
      this.name = "";
      this.phone = "";
      modalCustomer.close();

      let checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];

      let checkoutDataArr = []; // Pastikan ini ada di tempat yang sesuai dalam kode Anda

      this.products.forEach((element) => {
        if (
          // this.currentTime >= element.orderTimeEnd ||
          // this.currentTime <= element.orderTimeStart
          (element.orderTimeStart < element.orderTimeEnd &&
            this.currentTime < element.orderTimeStart) ||
          (element.orderTimeStart > element.orderTimeEnd &&
            this.currentTime < element.orderTimeStart &&
            this.currentTime > element.orderTimeEnd)
        ) {
          this.showModalError = true;
          this.errorMessage = "Ada item yang tidak tersedia di waktu sekarang";
        } else {
          const existingIndex = checkoutDataArr.findIndex((item) => {
            return (
              item.subTotal === this.subTotal && item.total === this.totalPay
            );
          });

          if (existingIndex !== -1) {
            checkoutDataArr[existingIndex].product.push(element);
          } else {
            const checkoutItem = {
              product: [element],
              subTotal: this.subTotal,
              promo: this.promo,
              serviceFee: this.serviceFee,
              serviceFeePercentage: this.serviceFeePercentage,
              deliveryFee: this.deliveryFee,
              total: this.totalPay,
              tax: this.tax,
              taxPercentage: this.taxPercentage,
              rounding: this.rounding,
            };
            checkoutDataArr.push(checkoutItem);
          }
        }
      });

      // Pastikan Anda menyimpan checkoutData di localStorage dan menampilkan modal jika tidak ada error
      if (!this.showModalError) {
        const checkoutDataString = JSON.stringify(checkoutDataArr);
        localStorage.setItem("checkoutData", checkoutDataString);
        modal.showModal();
      }
    },
    getCookie(name) {
      const cookieName = name + "=";
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    },
    sendTransaction() {
      this.buttonClicked = true;
      this.table = JSON.parse(localStorage.getItem("data_customer"));

      const checkoutData =
        JSON.parse(localStorage.getItem("checkoutData")) || [];
      const location = localStorage.getItem("location");
      const locId = atob(location);
      const dataCustomer =
        JSON.parse(localStorage.getItem("data_customer")) || [];
      const selectedOrderType = JSON.parse(
        localStorage.getItem("selected_type_order")
      );
      const data_restaurant = JSON.parse(
        localStorage.getItem("data_restaurant")
      );
      const tableCode = localStorage.getItem("table_code");

      localStorage.setItem("receipt", JSON.stringify(checkoutData));
      // localStorage.removeItem("cart_items");

      this.nameMethod = this.table.paymentMethod.payment_id;

      if (!this.nameMethod) {
        console.error("No matching payment method found.");
      }

      const dateYMD = this.today("dateYMD");
      const dateYMDHMS = this.today("dateYMDHMS");

      const data = [
        {
          mID: data_restaurant.mID, // kalau pakai qris
          appid: data_restaurant.appid,
          loc_id: locId,
          restaurant_table: tableCode,
          table_id: dataCustomer.table_id,
          type_order: selectedOrderType.code_type,
          hl_enable_login: data_restaurant.hl_enable_login,
          data: [],
          payment: {
            diskonall: 0,
            rounding: checkoutData[0].rounding,
            tax: checkoutData[0].tax,
            stotal: checkoutData[0].subTotal,
            gtotal: checkoutData[0].total,
            payment_method: this.nameMethod, // cash
            payment_name:
              this.table.paymentMethod.payment_category == "e-money"
                ? "qris"
                : "cash", // qris - cash
            paymdate: dateYMD,
          },
          guest_detail: {
            guest_name: dataCustomer.name,
            guest_addr: {
              idmember: "",
              address_name: "",
              is_default: "",
              dateadd: dateYMDHMS,
              provinsi: "",
              kota: "",
              nama: dataCustomer.name,
              alamat: "",
              telp: dataCustomer.phone,
              latitude: "",
              longitude: "",
            },
          },
        },
      ];

      checkoutData[0].product.forEach((element, index) => {
        data[0].data.push({
          // Access the array within the first object in data array
          id: element.product.product_id,
          product_name: element.product.product_name,
          qty: element.quantityItem,
          istakeaway: element.istakeaway,
          price: element.product.product_pricenow,
          total: element.product.product_pricenow * element.quantityItem,
          description: element.product.product_description,
          indx: index + 1,
          note: element.note,
        });
      });

      const host = window.location.host;
      const appid = data_restaurant.appid;
      const url_insert_transaction = "/qr_myorder/insert_transaction";
      
      localStorage.setItem("dataTemp", JSON.stringify(data));

      FetchData.createData(url_insert_transaction, data[0])
        .then((result) => {
          if (result && result.data.status === "success") {
            const transactionId = result.data.result[0].transactionId;

            // MP01M381F20190423491 keripiku
            if (appid == "MP01M381F20190423491" && host == "localhost:3000") {
              // ini test
              if (this.table.paymentMethod.payment_category != "e-money") {
                // cash and other payment
                const token = localStorage.getItem("token");
                const noNota = {
                  no_nota: result.data.result[0].noNota,
                };

                // ini karna ada case data nya myresto_key kosong
                if (this.table.paymentMethod.payment_myresto_key !== null) {
                  // ini kalau data myresto_key ga kosong, di compare lagi beneran cash atau method lain, edc misalnya
                  if (this.table.paymentMethod.payment_myresto_key.toLowerCase() == "cash") {
                    if(data_restaurant.isintegrated_myresto === '1'){
                      // sync ke my Resto kalau payment cash
                      FetchData.syncMyResto(noNota, token)
                        .then((resultPos) => {
                          // get nota
                          this.getNota(result, transactionId);

                          this.setHistory(result, resultPos, selectedOrderType, data, locId);
                        })
                        .catch((err) => {
                          this.showModalWaiting = false;
                          this.showModalError = true;
                          this.errorMessage = err.response.data.message;
                          console.log("err: ", err.message);
                        });
                    }else{
                      this.getNota(result, transactionId);
                    }
                  } else {
                    if(data_restaurant.isintegrated_myresto === '1'){
                      // edc and other (actually do the same atm)
                      FetchData.syncMyResto(noNota, token)
                        .then((resultPos) => {
                          // get nota
                          this.getNota(result, transactionId);
                          this.setHistory(result, resultPos, selectedOrderType, data, locId);
                        })
                        .catch((err) => {
                          this.showModalWaiting = false;
                          this.showModalError = true;
                          this.errorMessage = err.response.data.message;
                          console.log("err: ", err.message);
                        });
                    }else{
                      this.getNota(result, transactionId);
                    }
                  }
                } else {
                  if(data_restaurant.isintegrated_myresto === '1'){
                    // kalau data myresto_key kosong, langsung sync ke my Resto
                    FetchData.syncMyResto(noNota, token)
                      .then((resultPos) => {
                        // get nota
                        this.getNota(result, transactionId);

                        this.setHistory(result, resultPos, selectedOrderType, data, locId);
                      })
                      .catch((err) => {
                        this.showModalWaiting = false;
                        this.showModalError = true;
                        this.errorMessage = err.response.data.message;
                        console.log("err: ", err.message);
                      });
                  }else{
                    this.getNota(result, transactionId);
                    this.setHistory(result, null, selectedOrderType, data, locId);
                  }
                }
              } else {
                // get nota
                this.getNota(result, transactionId);
                this.setHistory(result, null, selectedOrderType, data, locId);
              }
            } else {
              // ini akses real
              if (this.table.paymentMethod.payment_category != "e-money") {
                // cash and other payment
                const token = localStorage.getItem("token");
                const noNota = {
                  no_nota: result.data.result[0].noNota,
                };

                // ini karna ada case data nya myresto_key kosong
                if (this.table.paymentMethod.payment_myresto_key !== null) {
                  // ini kalau data myresto_key ga kosong, di compare lagi beneran cash atau method lain, edc misalnya
                  if (this.table.paymentMethod.payment_myresto_key.toLowerCase() == "cash") {
                    if(data_restaurant.isintegrated_myresto === '1'){
                      // sync ke my Resto kalau payment cash
                      FetchData.syncMyResto(noNota, token)
                        .then((resultPos) => {
                          // get nota
                          this.getNota(result, transactionId);

                          this.setHistory(result, resultPos, selectedOrderType, data, locId);
                        })
                        .catch((err) => {
                          this.showModalWaiting = false;
                          this.showModalError = true;
                          this.errorMessage = err.response.data.message;
                          console.log("err: ", err.message);
                        });
                    }else{
                      this.getNota(result, transactionId);
                    }
                  } else {
                    if(data_restaurant.isintegrated_myresto === '1'){
                      // edc and other (actually do the same atm)
                      FetchData.syncMyResto(noNota, token)
                        .then((resultPos) => {
                          // get nota
                          this.getNota(result, transactionId);
                          this.setHistory(result, resultPos, selectedOrderType, data, locId);
                        })
                        .catch((err) => {
                          this.showModalWaiting = false;
                          this.showModalError = true;
                          this.errorMessage = err.response.data.message;
                          console.log("err: ", err.message);
                        });
                    }else{
                      this.getNota(result, transactionId);
                    }
                  }
                } else {
                  if(data_restaurant.isintegrated_myresto === '1'){
                    // kalau data myresto_key kosong, langsung sync ke my Resto
                    FetchData.syncMyResto(noNota, token)
                      .then((resultPos) => {
                        // get nota
                        this.getNota(result, transactionId);

                        this.setHistory(result, resultPos, selectedOrderType, data, locId);
                      })
                      .catch((err) => {
                        this.showModalWaiting = false;
                        this.showModalError = true;
                        this.errorMessage = err.response.data.message;
                        console.log("err: ", err.message);
                      });
                  }else{
                    this.getNota(result, transactionId);
                    this.setHistory(result, null, selectedOrderType, data, locId);
                  }
                }
              } else {
                  console.log('ggg')
                // get nota
                this.getNota(result, transactionId);
                this.setHistory(result, null, selectedOrderType, data, locId);
              }
            }
          }
        })
        .catch((error) => {
          this.showModalWaiting = false;
          this.showModalError = true;
          this.errorMessage = error.response.data.message;
          console.log("err: ", error.message);
          console.log("Error :", error);
        });


    },
    setHistory(result, resultPos, selectedOrderType, data, locId){
      const dr = JSON.parse(localStorage.getItem("data_restaurant"));
      // MP01M51463F20230206169 budidi | MP01M32319F20221011805 geprek | MP01M381F20190423491 keripiku
      if(dr.appid == 'MP01M51463F20230206169' || dr.appid == 'MP01M32319F20221011805' || dr.appid == 'MP01M381F20190423491') {
        const dataDetail = {
          nota: result.data.result[0].noNota,
          notaShort: resultPos? resultPos.data.data.shortOrderNumber:null,
          orderType: selectedOrderType,
          data: data[0],
          status: 'pending',
          isChecked: false,
        };
  
        let historyTemp = JSON.parse(localStorage.getItem('history'));
        
        if(historyTemp === null){
          let history = {};
          history[locId] = [];
          history[locId].push(dataDetail);
  
          localStorage.setItem('history', JSON.stringify(history));
        }else{
          if(historyTemp.hasOwnProperty(locId)) {
            historyTemp[locId].push(dataDetail);
          }else{
            historyTemp[locId] = [dataDetail];
          }
          localStorage.setItem('history', JSON.stringify(historyTemp));
        }
      }
    },
    today(type) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      // Retrieve current time
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");
      if (type === "dateYMDHMS") {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    },
    openModalConfrimOrder() {
      let modalConfirm = document.getElementById("modalConfirmOrder");
      let modalSelectPayment = document.getElementById("modalSelectPayments");
      modalConfirm.showModal();
      modalSelectPayment.close();
    },
    openModalQrisMethod() {
      if(this.totalPay < 100){
        const mID = JSON.parse(localStorage.getItem("data_restaurant")).mID;
        if(mID.substring(0, 2) == 'FM'){
          let modal = document.getElementById("modalSelectPayments");
          modal.close();

          this.showModalError = true;
          this.errorMessage = "Minimum nominal transaksi adalah Rp. 100";
  
          return;
        }
      }
      let modalPayment = document.getElementById("modalSelectPayments");
      modalPayment.close();
      this.showModalWaiting = true;
      this.$nextTick(() => {
        this.sendTransaction();
        let modal = document.getElementById("modalWaiting");
        modal.showModal();
      });

      const checkQrContent = setInterval(() => {
        const data = JSON.parse(localStorage.getItem("qrContent"));
        if (data) {
          clearInterval(checkQrContent);
          this.$router.push("/qris");
        }
      }, 2000);
    },
    getNota(result, transactionId) {
      this.steps = "get transactionId";
      const getNotaUrl =
        "/qr_myorder/get_transaction?transactionId=" + transactionId;
      FetchData.getData(getNotaUrl).then((getNota) => {
        // sukses simpan transaksi
        const dataQrContent = {
          contents: result.data.result[0],
          nota: result.data.result[0].noNota,
          noNotaNew: getNota.data.data[0].myresto_ref,
          invoice: result.data.result[0].qrisData?.noNota,
          ref: result.data.result[0].qrisData?.refNo,
          expired: result.data.result[0].qrisData?.expiredDate,
        };
        localStorage.setItem("qrContent", JSON.stringify(dataQrContent));
      });
    },
    async openModal(payment) {
      let dataCustomer = localStorage.getItem("data_customer");

      dataCustomer = dataCustomer ? JSON.parse(dataCustomer) : {};

      if (payment.payment_category === "cash") {
        localStorage.removeItem("qrContent");
        let modalPayment = document.getElementById("modalSelectPayments");
        modalPayment.close();
        dataCustomer.paymentMethod = payment;
        this.showModalWaiting = true;

        this.$nextTick(() => {
          let modal = document.getElementById("modalWaiting");
          modal.showModal();
          this.sendTransaction();

          const checkQrContent = setInterval(() => {
            const data = JSON.parse(localStorage.getItem("qrContent"));
            if (data) {
              clearInterval(checkQrContent);
              this.$router.push("/site/receipt");
            }
          }, 1000);
        });
      } else if (payment.payment_category === "e-money") {
        localStorage.removeItem("qrContent");
        dataCustomer.paymentMethod = payment;
        this.openModalQrisMethod();
      } else {
        alert("Payment method is not registered.");
      }

      localStorage.setItem("data_customer", JSON.stringify(dataCustomer));
    },
    typeOrderSelect(name, code_type) {
      const typeOrderOptions = document.querySelectorAll(".type-order-option");
      let orderTypeData = localStorage.getItem("order_type");
      const jsonData = JSON.parse(orderTypeData);

      typeOrderOptions.forEach((option) => {
        if (option.querySelector("h2").innerText === name) {
          option.classList.add("active");

          const matchedData = jsonData.find(
            (data) => data.code_type === code_type
          );
          this.selectedOrderType = matchedData;
          localStorage.setItem(
            "selected_type_order",
            JSON.stringify(matchedData)
          );
        } else {
          option.classList.remove("active");
        }
      });
    },
    closeModalConfrimOrder() {
      let modalConfirm = document.getElementById("modalConfirmOrder");
      modalConfirm.close();
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    updateQuantity(index, event) {
      this.$set(this.products[index], "quantityItem", event.target.value);
      localStorage.setItem("cart_items", JSON.stringify(this.products));
    },
    incrementValue(index) {
      this.products[index].quantityItem++;
      this.recalculatePayment();

      localStorage.setItem("cart_items", JSON.stringify(this.products));
    },
    decrementValue(index) {
      if (this.products[index].quantityItem > 1) {
        this.products[index].quantityItem--;
        this.recalculatePayment();
        localStorage.setItem("cart_items", JSON.stringify(this.products));
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    goToReceipt() {
      const tables = localStorage.getItem("table_list")
        ? JSON.parse(localStorage.getItem("table_list"))
        : [];
      // const table = tables.find((table) => table.table_name === this.tableCode);
      const table = tables.find((table) => table.table_name === this.tableCode);

      const dataCustomer = {
        table_id: table ? table.table_id : "",
        table: this.tableCode,
        name: this.name,
        phone: this.phone,
        order_date: new Date(),
      };

      if (process.client) {
        localStorage.setItem("data_customer", JSON.stringify(dataCustomer));
      }

      if (this.selectedOrderType.code_type === 0) {
        if (this.name === "") {
          this.errors = "Isi nama anda dahulu";
        } else {
          this.openModalPayment();
        }
      } else {
        this.name === ""
          ? (this.errors = "Isi nama anda dahulu")
          : this.openModalPayment();
      }
    },
    handleMenuChange(item) {
      // Dapatkan data dari localStorage dengan kunci 'cart_items'
      let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

      // Cari item yang sama berdasarkan product_id
      let existingItem = cartItems.find(
        (cartItem) => cartItem.product.product_id === item.product.product_id
      );

      if (existingItem) {
        this.changeItem = existingItem;
      }

      // Tampilkan modal perubahan menu
      this.showModalChangeMenu = true;
      this.modalKey++;
      this.$nextTick(() => {
        if (this.$refs.modalComponent) {
          this.$refs.modalComponent.showModal(this.changeMenuState); // Perubahan disini juga
        }
      });
      this.$refs.modal.close();
    },
  },
});
</script>
