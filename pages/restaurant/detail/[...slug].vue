<template>
  <div @touchstart="resetTimer">
    <div>
      <section id="home">
        <div class="frame" :class="!products || !tableCode ? 'hidden' : ''">
          <button
            v-show="showScrollButton"
            @click="scrollToTop"
            class="scroll-to-top"
          >
            <svg
              fill="#ffffff"
              height="50px"
              width="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xml:space="preserve"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_224_"
                  d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
                ></path>
              </g>
            </svg>
          </button>
          <!-- carousel -->
          <Navbar :to="navbarTo" />
          <NuxtLazyHydrate>
            <div
              v-if="isSkeleton"
              class="carousel relative shadow-2xl bg-white"
            >
              <div class="carousel-inner relative overflow-hidden w-full">
                <div
                  class="skeleton animate-pulse w-full h-[180px] bg-gray-400 rounded"
                ></div>
              </div>
            </div>
            <HomeCarousel v-if="!isSkeleton" />
          </NuxtLazyHydrate>
          <!-- end carousel -->

          <!-- sort item -->
          <div class="sort-item" v-if="products && isErrorUrl == false">
            <div class="flex gap-6 btn-group">
              <button class="btn btn-primary">
                Semua Produk
                <div class="badge">{{ countProduct }}</div>
              </button>
              <button class="btn btn-muted" @click="openModalCategory">
                Kategori Lainya
              </button>
            </div>
            <div class="full">
              <label class="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  class="grow"
                  placeholder="Cari Produk"
                  v-model="searchQuery"
                  @input="searchProducts"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <path
                    d="M28.0358 26.4479L20.4838 18.8959C22.2986 16.7172 23.2035 13.9228 23.0104 11.0938C22.8173 8.2649 21.541 5.61932 19.447 3.70745C17.353 1.79557 14.6025 0.764606 11.7677 0.829018C8.93293 0.89343 6.23211 2.04826 4.2271 4.05327C2.22209 6.05828 1.06726 8.75911 1.00285 11.5939C0.938435 14.4287 1.9694 17.1792 3.88128 19.2732C5.79315 21.3672 8.43873 22.6435 11.2677 22.8366C14.0966 23.0297 16.8911 22.1247 19.0698 20.3099L26.6218 27.8619L28.0358 26.4479ZM3.03576 11.8619C3.03576 10.0819 3.5636 8.34184 4.55253 6.8618C5.54147 5.38176 6.94707 4.22821 8.59161 3.54702C10.2361 2.86583 12.0457 2.6876 13.7916 3.03486C15.5374 3.38213 17.141 4.2393 18.3997 5.49797C19.6584 6.75664 20.5156 8.36029 20.8628 10.1061C21.2101 11.8519 21.0319 13.6615 20.3507 15.3061C19.6695 16.9506 18.5159 18.3562 17.0359 19.3452C15.5559 20.3341 13.8158 20.8619 12.0358 20.8619C9.64962 20.8593 7.36198 19.9102 5.67472 18.223C3.98747 16.5357 3.03841 14.2481 3.03576 11.8619Z"
                    fill="#979797"
                    stroke="#979797"
                  />
                </svg>
              </label>
            </div>
          </div>

          <!-- Modal All Product -->
          <dialog id="modalAllProduct" class="modal" v-if="showModalCategory">
            <div class="modal-box">
              <div class="row-item">
                <div
                  class="item"
                  v-for="(items, index) in filteredCategory"
                  :key="index"
                  @click="toDetail(items.category_id)"
                >
                  <div class="description cursor-pointer">
                    <span>{{ items.category_name }}</span>
                    <p>
                      &nbsp;
                      Temukan kejutan di setiap promo spesial kami, hanya untuk
                      Anda!
                    </p>
                  </div>
                </div>
              </div>

              <div class="modal-action">
                <button
                  id="closeButton"
                  class="btn close-btn"
                  @click="closeModalCategory"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
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
            </div>
          </dialog>
          <!-- end Modal All Product -->

          <!-- Loading -->
          <div
            v-if="isLoading == true"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div class="bg-white p-6 rounded-lg text-center shadow-lg">
              <div class="loader mb-4"></div>
              <p class="mt-2">Loading... {{ loadingProgress }}%</p>
            </div>
          </div>

          <!-- skeleton untuk produk -->
          <div v-if="isSkeleton && isErrorUrl == false">
            <div class="spacer"></div>
            <div class="list-product">
              <div class="head">
                <div class="title">
                  <div
                    class="skeleton animate-pulse w-[43px] h-[43px] bg-gray-400 rounded"
                  ></div>
                  <div
                    class="skeleton min-w-[100px] h-6 bg-gray-400 animate-pulse rounded"
                  ></div>
                </div>

                <div
                  class="skeleton min-w-[20%] h-6 bg-gray-400 animate-pulse rounded"
                ></div>
              </div>

              <div class="product">
                <div class="product-item" v-for="n in 4" :key="n">
                  <div class="card bg-base-100 shadow-xl" rel="preload">
                    <figure>
                      <NuxtLazyHydrate>
                        <div
                          class="skeleton animate-pulse min-w-full aspect-square bg-gray-400 rounded"
                        ></div>
                      </NuxtLazyHydrate>
                    </figure>
                    <div class="card-body">
                      <div class="card-title mt-8">
                        <div
                          class="skeleton min-w-full h-4 bg-gray-400 animate-pulse rounded"
                        ></div>
                        <!-- <div class="skeleton min-w-full h-4 mt-1 bg-gray-400 animate-pulse rounded"></div> -->
                      </div>

                      <div class="price">
                        <div
                          class="skeleton w-[50px] h-4 bg-gray-400 animate-pulse rounded"
                        ></div>
                      </div>

                      <div class="card-actions cursor-pointer">
                        <div class="btn-add-cart">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            viewBox="0 0 27 26"
                            fill="none"
                          >
                            <path
                              d="M23.4744 9.77016L22.5302 6.38642C22.1658 5.08098 21.9836 4.42891 21.6099 3.93661C21.2373 3.44751 20.7313 3.07074 20.1497 2.84939C19.5646 2.62598 18.8731 2.62598 17.49 2.62598M3.52637 9.77016L4.47058 6.38642C4.83496 5.08098 5.01715 4.42891 5.39085 3.93661C5.76344 3.44751 6.26948 3.07074 6.85104 2.84939C7.43619 2.62598 8.12772 2.62598 9.51078 2.62598"
                              stroke="white"
                              stroke-width="1.48451"
                            />
                            <path
                              d="M9.51074 2.62511C9.51074 2.28061 9.65085 1.95022 9.90025 1.70662C10.1497 1.46302 10.4879 1.32617 10.8406 1.32617H16.1601C16.5128 1.32617 16.8511 1.46302 17.1005 1.70662C17.3499 1.95022 17.49 2.28061 17.49 2.62511C17.49 2.96962 17.3499 3.30001 17.1005 3.54361C16.8511 3.78721 16.5128 3.92406 16.1601 3.92406H10.8406C10.4879 3.92406 10.1497 3.78721 9.90025 3.54361C9.65085 3.30001 9.51074 2.96962 9.51074 2.62511Z"
                              stroke="white"
                              stroke-width="1.48451"
                            />
                            <path
                              d="M8.18213 14.3154V19.5112M18.8211 14.3154V19.5112M13.5016 14.3154V19.5112"
                              stroke="white"
                              stroke-width="1.48451"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M2.68088 18.8028C3.40699 21.6384 3.77004 23.0555 4.85123 23.8816C5.93374 24.7065 7.42985 24.7065 10.4221 24.7065H16.5794C19.5716 24.7065 21.0677 24.7065 22.1515 23.8816C23.2327 23.0555 23.5957 21.6384 24.3205 18.8028C25.4616 14.3448 26.0321 12.1171 24.8352 10.6181C23.637 9.11914 21.2831 9.11914 16.5807 9.11914H10.4207C5.71564 9.11914 3.36443 9.11914 2.16622 10.6181C1.46272 11.4975 1.3683 12.6289 1.64225 14.3149"
                              stroke="white"
                              stroke-width="1.48451"
                              stroke-linecap="round"
                            />
                          </svg>
                          <span> Tambah Pesanan </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="searchQuery == '' && isErrorUrl == false">
            <div v-for="perProduct in products" :key="perProduct.category_id">
              <div
                v-if="
                  (perProduct.order_time_start < perProduct.order_time_end &&
                    perProduct.order_time_start <= clockNow &&
                    perProduct.order_time_end >= clockNow) ||
                  (perProduct.order_time_start >= perProduct.order_time_end &&
                  clockNow >= perProduct.order_time_start) ||
                  (perProduct.order_time_start > perProduct.order_time_end && 
                  perProduct.order_time_start >= clockNow && perProduct.order_time_end >= clockNow)
                "
              >
                <div class="spacer"></div>
                <div class="list-product">
                  <div class="head">
                    <div class="title">
                      <!-- icon -->
                      <svg v-if="perProduct.category_name.toLowerCase().includes('mie') || perProduct.category_name.toLowerCase().includes('gacoan')"
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="44"
                        viewBox="0 0 43 44"
                        fill="none"
                      >
                        <path
                          d="M5.37554 15.5119V15.4877C5.37551 13.0987 6.08305 10.7632 7.4089 8.77582C8.73476 6.78847 10.6195 5.23832 12.8254 4.32095C15.0313 3.40358 17.4594 3.1601 19.8035 3.62121C22.1477 4.08233 24.3027 5.22738 25.9967 6.91191C27.3296 6.25405 28.8184 5.97745 30.2986 6.11267C31.7789 6.2479 33.1929 6.78969 34.3845 7.67819C35.5761 8.56668 36.4989 9.7673 37.051 11.1474C37.603 12.5275 37.7628 14.0333 37.5127 15.4985C37.8804 15.5326 38.2372 15.6422 38.5607 15.8203C38.8842 15.9985 39.1675 16.2414 39.393 16.5339C39.6184 16.8265 39.7812 17.1623 39.871 17.5205C39.9609 17.8788 39.976 18.2517 39.9153 18.616C38.7005 25.9233 35.6959 30.5485 30.9068 32.4942V34.3002C30.9068 35.3694 30.4821 36.3947 29.7261 37.1508C28.9701 37.9068 27.9447 38.3315 26.8755 38.3315H16.1255C15.0564 38.3315 14.031 37.9068 13.275 37.1508C12.519 36.3947 12.0943 35.3694 12.0943 34.3002V32.4942C7.30517 30.5485 4.30054 25.9233 3.08579 18.616C3.02717 18.2613 3.04028 17.8986 3.12434 17.5491C3.20841 17.1996 3.36173 16.8705 3.57523 16.5814C3.78872 16.2922 4.05805 16.0488 4.36729 15.8656C4.67652 15.6823 5.01937 15.563 5.37554 15.5146V15.5119ZM8.06304 15.4877H10.7505C10.7505 13.7058 11.4584 11.9969 12.7184 10.7369C13.9784 9.47684 15.6874 8.76898 17.4693 8.76898C19.2512 8.76898 20.9602 9.47684 22.2202 10.7369C23.4802 11.9969 24.188 13.7058 24.188 15.4877H26.8755C26.8755 12.993 25.8845 10.6005 24.1205 8.8365C22.3565 7.07249 19.964 6.08148 17.4693 6.08148C14.9746 6.08148 12.5821 7.07249 10.8181 8.8365C9.05406 10.6005 8.06304 12.993 8.06304 15.4877ZM13.438 15.4877H21.5005C21.5005 14.4186 21.0758 13.3932 20.3198 12.6372C19.5638 11.8812 18.5384 11.4565 17.4693 11.4565C16.4001 11.4565 15.3748 11.8812 14.6188 12.6372C13.8628 13.3932 13.438 14.4186 13.438 15.4877ZM31.8904 15.4877H34.7687C34.9716 14.6935 34.9905 13.8634 34.824 13.0608C34.6575 12.2581 34.31 11.5041 33.8079 10.8561C33.3059 10.2081 32.6625 9.68325 31.9269 9.32156C31.1913 8.95987 30.3828 8.77088 29.563 8.76898C28.918 8.76898 28.3053 8.88185 27.7355 9.08879C28.2112 9.85204 28.6036 10.6744 28.9046 11.5371C29.4165 11.4101 29.9544 11.4363 30.4515 11.6123C30.9487 11.7883 31.3832 12.1064 31.7012 12.5271C32.0192 12.9479 32.2066 13.4527 32.2403 13.979C32.2739 14.5053 32.1523 15.0299 31.8904 15.4877ZM28.2193 32.9565H14.7818V34.3002C14.7818 34.6566 14.9234 34.9984 15.1754 35.2504C15.4274 35.5024 15.7692 35.644 16.1255 35.644H26.8755C27.2319 35.644 27.5737 35.5024 27.8257 35.2504C28.0777 34.9984 28.2193 34.6566 28.2193 34.3002V32.9565ZM13.8358 30.269H29.1653C33.4277 28.8984 36.1259 25.023 37.2654 18.1752H5.73567C6.87517 25.023 9.57342 28.8984 13.8358 30.269Z"
                          fill="#DA2424"
                        />
                      </svg>
                      <svg v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="44"
                        viewBox="0 0 43 44"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_465_1774)">
                          <path
                            d="M16.2529 2.703C17.4002 5.57275 17.9001 7.9574 17.7922 10.2182C17.6873 12.4423 16.9931 14.6612 15.5683 17.2032L15.5338 17.2648L15.4871 17.2118L11.6018 12.8013L11.6018 12.8012C11.465 12.6457 11.2973 12.5205 11.1093 12.4337C10.9213 12.3468 10.7173 12.3002 10.5102 12.2969C10.3032 12.2935 10.0977 12.3335 9.90702 12.4142C9.71633 12.4949 9.54462 12.6146 9.40289 12.7656L9.40284 12.7656C3.87789 18.6338 2.65087 26.3657 5.10067 32.579C7.57123 38.8457 13.7186 43.3977 22.482 42.9565L22.4845 42.9563V42.9564H22.5014C29.0801 42.5484 33.3128 40.1273 35.8639 36.7932L35.8639 36.7932C38.3765 33.5154 39.1032 29.5563 39.1032 26.3163C39.1032 18.1351 35.4745 12.1369 31.0381 8.00106M16.2529 2.703C16.1508 2.4473 16.1217 2.16825 16.1689 1.89699C16.2161 1.62572 16.3378 1.37291 16.5204 1.16678L16.5762 1.1037C16.7491 0.929138 16.9629 0.799829 17.1988 0.727945C17.4622 0.647666 17.7427 0.642168 18.009 0.712063L18.0091 0.712085C21.4086 1.59797 26.6345 3.90106 31.0381 8.00106M16.2529 2.703C16.2529 2.703 16.2529 2.703 16.2529 2.70301L16.2065 2.72156L16.2529 2.703ZM31.0381 8.00106L31.0722 7.96449L31.0382 8.00108C31.0381 8.00107 31.0381 8.00107 31.0381 8.00106ZM28.5989 24.9288H28.602L28.6167 24.9142C28.7639 24.7667 28.8806 24.5918 28.9602 24.3992C29.0398 24.2067 29.0807 24.0003 29.0806 23.792C29.0804 23.5836 29.0392 23.3773 28.9594 23.1849C28.8795 22.9925 28.7625 22.8176 28.6151 22.6704C28.4677 22.5232 28.2927 22.4065 28.1001 22.3269C27.9076 22.2473 27.7012 22.2064 27.4929 22.2065C27.2845 22.2067 27.0783 22.2479 26.8858 22.3277C26.6934 22.4076 26.5186 22.5246 26.3713 22.672L16.2885 32.7549C16.2884 32.755 16.2883 32.7551 16.2882 32.7551C16.1369 32.9014 16.0162 33.0762 15.9331 33.2696C15.85 33.4631 15.8063 33.6711 15.8045 33.8817C15.8026 34.0922 15.8427 34.301 15.9225 34.4959C16.0022 34.6908 16.1199 34.8678 16.2688 35.0167C16.4177 35.1656 16.5948 35.2834 16.7896 35.3631C16.9845 35.4428 17.1933 35.483 17.4039 35.4811C17.6144 35.4793 17.8225 35.4355 18.016 35.3524C18.2093 35.2694 18.3842 35.1487 18.5304 34.9974C18.5305 34.9973 18.5306 34.9972 18.5307 34.9971L28.5989 24.9288ZM16.4555 23.5912C16.3372 23.8767 16.2763 24.1828 16.2763 24.4918C16.2763 25.1161 16.5243 25.7147 16.9656 26.1561C17.407 26.5974 18.0057 26.8454 18.6299 26.8454C19.2541 26.8454 19.8527 26.5974 20.2941 26.1561C20.7355 25.7147 20.9834 25.1161 20.9834 24.4918C20.9834 24.1828 20.9226 23.8767 20.8043 23.5912C20.686 23.3056 20.5126 23.0462 20.2941 22.8276C20.0755 22.6091 19.8161 22.4357 19.5305 22.3174C19.245 22.1992 18.9389 22.1383 18.6299 22.1383C18.3208 22.1383 18.0147 22.1992 17.7292 22.3174C17.4436 22.4357 17.1842 22.6091 16.9656 22.8276C16.7471 23.0462 16.5737 23.3056 16.4555 23.5912ZM25.1356 31.5167C24.6943 31.9581 24.4463 32.5567 24.4463 33.1809C24.4463 33.8051 24.6943 34.4038 25.1356 34.8451C25.577 35.2865 26.1757 35.5345 26.7999 35.5345C27.4241 35.5345 28.0227 35.2865 28.4641 34.8451C28.9055 34.4038 29.1534 33.8051 29.1534 33.1809C29.1534 32.5567 28.9055 31.9581 28.4641 31.5167C28.0227 31.0753 27.4241 30.8273 26.7999 30.8273C26.1757 30.8273 25.577 31.0753 25.1356 31.5167Z"
                            fill="url(#paint0_radial_465_1774)"
                            stroke="#DA2424"
                            stroke-width="0.1"
                          />
                        </g>
                        <defs>
                          <radialGradient
                            id="paint0_radial_465_1774"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(6.67959 -31.4811) rotate(64.4782) scale(139.606 116.182)"
                          >
                            <stop offset="0.35" stop-color="#F92E2E" />
                            <stop
                              offset="0.778938"
                              stop-color="#FAFF00"
                              stop-opacity="0.49"
                            />
                          </radialGradient>
                          <clipPath id="clip0_465_1774">
                            <rect
                              width="43"
                              height="43"
                              fill="white"
                              transform="translate(0 0.326172)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <!-- end icon -->

                      <span> {{ perProduct.category_name }} </span>
                    </div>

                    <!-- <div class="border-list-product"></div> -->

                    <button
                      @click="toDetail(perProduct.category_id)"
                      class="link-see-all"
                    >
                      See all
                    </button>
                  </div>

                  <ProductSlider  :category="perProduct" :products="perProduct.product_details" />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="else" :class="!isErrorUrl ? '' : 'hidden'">
            <div class="spacer"></div>
            <div v-for="perProduct in products" :key="perProduct.category_id">
              <div
                v-if="
                  (perProduct.order_time_start < perProduct.order_time_end &&
                    perProduct.order_time_start <= clockNow &&
                    perProduct.order_time_end >= clockNow) ||
                  (perProduct.order_time_start >= perProduct.order_time_end &&
                    clockNow >= perProduct.order_time_start)
                "
              >
                <div class="list-product">
                  <div class="product">
                    <div
                      class="product-item"
                      v-for="items in filteredProducts"
                      :key="items.product_id"
                    >
                      <ProductCard :product="items" :category="perProduct" :loading="loading" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- error page / not found page -->
          <!-- <div v-if="!isHidden || isLoading == 'close'">
            <NotFound />
          </div> -->
          <!-- end sort item -->

          <BottomNavCart v-if="showBottomCart" />
        </div>
      </section>

      <div class="flex justify-center">
        <div class="all-items-text">Semua item sudah dimunculkan</div>
      </div>
      <div class="flex justify-center">
        <div class="spacer"></div>
      </div>
      <div
        class="flex justify-center"
        :class="showBottomCart == true ? 'mb-[65px]' : ''"
      >
        <Footer />
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import NotFound from "@/components/NotFound.vue";
import HotOfferSlider from "@/components/HotOfferSlider.vue";
import ProductSlider from "@/components/ProductSlider.vue";
import ProductSliderDouble from "@/components/ProductSliderDouble.vue";
import Footer from "@/components/Footer.vue";
import ProductCard from "~/components/ProductCard.vue";
import BottomNavCart from "@/components/BottomNavCart.vue";
import FetchData from "~/middleware/services/Fetch.js";
import { reactive, watch } from "vue";

export default defineComponent({
  webVitals: {
    provider: "log",
    debug: true, // debug enable metrics reporting on dev environments
    disabled: false,
  },
  components: {
    Navbar,
    HomeCarousel,
    HotOfferSlider,
    ProductSlider,
    ProductSliderDouble,
    Footer,
    BottomNavCart,
    ProductCard,
  },
  data() {
    return {
      appVersion: "1.0.0",
      showScrollButton: false,
      navbarTo: "/",
      isHidden: true,
      isUseTable: false,
      isErrorUrl: false,
      isShow: "",
      isSkeleton: false,
      showModalCategory: false,
      restaurantId: false,
      products: [],
      showBottomCart: false,
      category: [],
      filteredCategory: [],
      searchQuery: "",
      filteredProducts: [],
      filteredProductsByClock: [],
      countProduct: 0,
      clockNow: null,
      localStorageListener: null,
      loading: true,
      tableCode: null,
      isLoading: true,
      loadingProgress: 0,
      productPlaceholder:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E',
      iconMie: `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="44"
              viewBox="0 0 43 44"
              fill="none"
            >
              <path
                d="M5.37554 15.5119V15.4877C5.37551 13.0987 6.08305 10.7632 7.4089 8.77582C8.73476 6.78847 10.6195 5.23832 12.8254 4.32095C15.0313 3.40358 17.4594 3.1601 19.8035 3.62121C22.1477 4.08233 24.3027 5.22738 25.9967 6.91191C27.3296 6.25405 28.8184 5.97745 30.2986 6.11267C31.7789 6.2479 33.1929 6.78969 34.3845 7.67819C35.5761 8.56668 36.4989 9.7673 37.051 11.1474C37.603 12.5275 37.7628 14.0333 37.5127 15.4985C37.8804 15.5326 38.2372 15.6422 38.5607 15.8203C38.8842 15.9985 39.1675 16.2414 39.393 16.5339C39.6184 16.8265 39.7812 17.1623 39.871 17.5205C39.9609 17.8788 39.976 18.2517 39.9153 18.616C38.7005 25.9233 35.6959 30.5485 30.9068 32.4942V34.3002C30.9068 35.3694 30.4821 36.3947 29.7261 37.1508C28.9701 37.9068 27.9447 38.3315 26.8755 38.3315H16.1255C15.0564 38.3315 14.031 37.9068 13.275 37.1508C12.519 36.3947 12.0943 35.3694 12.0943 34.3002V32.4942C7.30517 30.5485 4.30054 25.9233 3.08579 18.616C3.02717 18.2613 3.04028 17.8986 3.12434 17.5491C3.20841 17.1996 3.36173 16.8705 3.57523 16.5814C3.78872 16.2922 4.05805 16.0488 4.36729 15.8656C4.67652 15.6823 5.01937 15.563 5.37554 15.5146V15.5119ZM8.06304 15.4877H10.7505C10.7505 13.7058 11.4584 11.9969 12.7184 10.7369C13.9784 9.47684 15.6874 8.76898 17.4693 8.76898C19.2512 8.76898 20.9602 9.47684 22.2202 10.7369C23.4802 11.9969 24.188 13.7058 24.188 15.4877H26.8755C26.8755 12.993 25.8845 10.6005 24.1205 8.8365C22.3565 7.07249 19.964 6.08148 17.4693 6.08148C14.9746 6.08148 12.5821 7.07249 10.8181 8.8365C9.05406 10.6005 8.06304 12.993 8.06304 15.4877ZM13.438 15.4877H21.5005C21.5005 14.4186 21.0758 13.3932 20.3198 12.6372C19.5638 11.8812 18.5384 11.4565 17.4693 11.4565C16.4001 11.4565 15.3748 11.8812 14.6188 12.6372C13.8628 13.3932 13.438 14.4186 13.438 15.4877ZM31.8904 15.4877H34.7687C34.9716 14.6935 34.9905 13.8634 34.824 13.0608C34.6575 12.2581 34.31 11.5041 33.8079 10.8561C33.3059 10.2081 32.6625 9.68325 31.9269 9.32156C31.1913 8.95987 30.3828 8.77088 29.563 8.76898C28.918 8.76898 28.3053 8.88185 27.7355 9.08879C28.2112 9.85204 28.6036 10.6744 28.9046 11.5371C29.4165 11.4101 29.9544 11.4363 30.4515 11.6123C30.9487 11.7883 31.3832 12.1064 31.7012 12.5271C32.0192 12.9479 32.2066 13.4527 32.2403 13.979C32.2739 14.5053 32.1523 15.0299 31.8904 15.4877ZM28.2193 32.9565H14.7818V34.3002C14.7818 34.6566 14.9234 34.9984 15.1754 35.2504C15.4274 35.5024 15.7692 35.644 16.1255 35.644H26.8755C27.2319 35.644 27.5737 35.5024 27.8257 35.2504C28.0777 34.9984 28.2193 34.6566 28.2193 34.3002V32.9565ZM13.8358 30.269H29.1653C33.4277 28.8984 36.1259 25.023 37.2654 18.1752H5.73567C6.87517 25.023 9.57342 28.8984 13.8358 30.269Z"
                fill="#DA2424"
              />
            </svg>`,
      iconHot: `<svg xmlns="http://www.w3.org/2000/svg" width="43" height="44" viewBox="0 0 43 44" fill="none" >
                <g clip-path="url(#clip0_465_1774)">
                  <path
                    d="M16.2529 2.703C17.4002 5.57275 17.9001 7.9574 17.7922 10.2182C17.6873 12.4423 16.9931 14.6612 15.5683 17.2032L15.5338 17.2648L15.4871 17.2118L11.6018 12.8013L11.6018 12.8012C11.465 12.6457 11.2973 12.5205 11.1093 12.4337C10.9213 12.3468 10.7173 12.3002 10.5102 12.2969C10.3032 12.2935 10.0977 12.3335 9.90702 12.4142C9.71633 12.4949 9.54462 12.6146 9.40289 12.7656L9.40284 12.7656C3.87789 18.6338 2.65087 26.3657 5.10067 32.579C7.57123 38.8457 13.7186 43.3977 22.482 42.9565L22.4845 42.9563V42.9564H22.5014C29.0801 42.5484 33.3128 40.1273 35.8639 36.7932L35.8639 36.7932C38.3765 33.5154 39.1032 29.5563 39.1032 26.3163C39.1032 18.1351 35.4745 12.1369 31.0381 8.00106M16.2529 2.703C16.1508 2.4473 16.1217 2.16825 16.1689 1.89699C16.2161 1.62572 16.3378 1.37291 16.5204 1.16678L16.5762 1.1037C16.7491 0.929138 16.9629 0.799829 17.1988 0.727945C17.4622 0.647666 17.7427 0.642168 18.009 0.712063L18.0091 0.712085C21.4086 1.59797 26.6345 3.90106 31.0381 8.00106M16.2529 2.703C16.2529 2.703 16.2529 2.703 16.2529 2.70301L16.2065 2.72156L16.2529 2.703ZM31.0381 8.00106L31.0722 7.96449L31.0382 8.00108C31.0381 8.00107 31.0381 8.00107 31.0381 8.00106ZM28.5989 24.9288H28.602L28.6167 24.9142C28.7639 24.7667 28.8806 24.5918 28.9602 24.3992C29.0398 24.2067 29.0807 24.0003 29.0806 23.792C29.0804 23.5836 29.0392 23.3773 28.9594 23.1849C28.8795 22.9925 28.7625 22.8176 28.6151 22.6704C28.4677 22.5232 28.2927 22.4065 28.1001 22.3269C27.9076 22.2473 27.7012 22.2064 27.4929 22.2065C27.2845 22.2067 27.0783 22.2479 26.8858 22.3277C26.6934 22.4076 26.5186 22.5246 26.3713 22.672L16.2885 32.7549C16.2884 32.755 16.2883 32.7551 16.2882 32.7551C16.1369 32.9014 16.0162 33.0762 15.9331 33.2696C15.85 33.4631 15.8063 33.6711 15.8045 33.8817C15.8026 34.0922 15.8427 34.301 15.9225 34.4959C16.0022 34.6908 16.1199 34.8678 16.2688 35.0167C16.4177 35.1656 16.5948 35.2834 16.7896 35.3631C16.9845 35.4428 17.1933 35.483 17.4039 35.4811C17.6144 35.4793 17.8225 35.4355 18.016 35.3524C18.2093 35.2694 18.3842 35.1487 18.5304 34.9974C18.5305 34.9973 18.5306 34.9972 18.5307 34.9971L28.5989 24.9288ZM16.4555 23.5912C16.3372 23.8767 16.2763 24.1828 16.2763 24.4918C16.2763 25.1161 16.5243 25.7147 16.9656 26.1561C17.407 26.5974 18.0057 26.8454 18.6299 26.8454C19.2541 26.8454 19.8527 26.5974 20.2941 26.1561C20.7355 25.7147 20.9834 25.1161 20.9834 24.4918C20.9834 24.1828 20.9226 23.8767 20.8043 23.5912C20.686 23.3056 20.5126 23.0462 20.2941 22.8276C20.0755 22.6091 19.8161 22.4357 19.5305 22.3174C19.245 22.1992 18.9389 22.1383 18.6299 22.1383C18.3208 22.1383 18.0147 22.1992 17.7292 22.3174C17.4436 22.4357 17.1842 22.6091 16.9656 22.8276C16.7471 23.0462 16.5737 23.3056 16.4555 23.5912ZM25.1356 31.5167C24.6943 31.9581 24.4463 32.5567 24.4463 33.1809C24.4463 33.8051 24.6943 34.4038 25.1356 34.8451C25.577 35.2865 26.1757 35.5345 26.7999 35.5345C27.4241 35.5345 28.0227 35.2865 28.4641 34.8451C28.9055 34.4038 29.1534 33.8051 29.1534 33.1809C29.1534 32.5567 28.9055 31.9581 28.4641 31.5167C28.0227 31.0753 27.4241 30.8273 26.7999 30.8273C26.1757 30.8273 25.577 31.0753 25.1356 31.5167Z"
                    fill="url(#paint0_radial_465_1774)"
                    stroke="#DA2424"
                    stroke-width="0.1"
                  />
                </g>
                <defs>
                  <radialGradient
                    id="paint0_radial_465_1774"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(6.67959 -31.4811) rotate(64.4782) scale(139.606 116.182)"
                  >
                    <stop offset="0.35" stop-color="#F92E2E" />
                    <stop
                      offset="0.778938"
                      stop-color="#FAFF00"
                      stop-opacity="0.49"
                    />
                  </radialGradient>
                  <clipPath id="clip0_465_1774">
                    <rect
                      width="43"
                      height="43"
                      fill="white"
                      transform="translate(0 0.326172)"
                    />
                  </clipPath>
                </defs>
              </svg>`,
    };
  },
  created() {
    this.isSkeleton = true;
    if (process.client) {
      this.fetchProducts();
      this.loading = false;
      const location = localStorage.getItem("location");
      const urlData = this.$route.params;
      this.restaurantId = urlData.slug[0];
      const locId = atob(this.restaurantId);
      const use_table = JSON.parse(localStorage.getItem("use_table"));
      const tableCode = this.$route.query.table_code
        ? this.$route.query.table_code
        : urlData.slug[1];

      if (use_table === 0) {
        // both
        if (tableCode) {
          this.isUseTable = false;
        } else {
          this.isErrorUrl = false;
          this.isHidden = true;
        }
      } else if (use_table === 1) {
        // with
        if (tableCode) {
          this.isUseTable = true;
        } else {
          this.isHidden = false;
          this.isErrorUrl = true;
        }
      } else if (use_table === 2) {
        // without
        if (tableCode) {
          this.isUseTable = false;
        } else {
          this.isErrorUrl = false;
          this.isHidden = true;
        }
      } else {
        // both
        if (tableCode) {
          this.isUseTable = true;
        } else {
          this.isErrorUrl = false;
          this.isHidden = true;
        }
      }

      // Update isSkeleton after the condition checks
      if (use_table === 1 && !tableCode) {
        this.isSkeleton = false;
      }
    }
  },
  async mounted() {
    const appVersion = localStorage.getItem("appVersion");
    const location = localStorage.getItem("location");
    const urlData = this.$route.params;

    let locId = "";

    try {
      localStorage.removeItem("table_code");
      localStorage.removeItem("data_customer");
      localStorage.removeItem("receipt");
      localStorage.removeItem("selected_type_order");
      localStorage.removeItem("qrContent");

      const decrypted = atob(urlData.slug[0]);
      if (decrypted.includes("&mymenu")) {
        const cleanLocId = decrypted.split("&mymenu")[0];
        locId = cleanLocId;
      } else {
        locId = decrypted;
      }
      this.restaurantId = btoa(locId);
    } catch (e) {
      console.error("Invalid restaurant ID:", e);
      locId = null;
      return this.$router.push("/error/page-not-found");
    }

    if (location && location != this.restaurantId) {
      console.log("Data restoran berbeda. Sinkronkan ulang data ...");
      await this.starter(locId);
    }

    if (appVersion == null) {
      localStorage.setItem('appVersion', this.appVersion);
      console.log('setting appVersion: ', this.appVersion);
    }else if(appVersion != null && appVersion != this.appVersion){
      localStorage.setItem("appVersion", this.appVersion);
      console.log('appVersion is different. Setting new appVersion: ', this.appVersion);
      console.log("appVersion is different. Sinkronkan ulang data ...");
      await this.starter(locId);
    }else{
      console.log("appVersion: ", appVersion);
    }

    const data_restaurant = JSON.parse(localStorage.getItem("data_restaurant"));
    const data_menu = JSON.parse(localStorage.getItem("data_menu"));

    // cek update data
    const urlCheckUpdate = "/qr_myorder/check_update?loc=" + locId;
    const last_updated_data = await FetchData.getData(urlCheckUpdate);
    if (last_updated_data.data.message != "No New Update Found.") {
      const date = new Date(last_updated_data.data.data[0].last_updated_data);
      const last_update = date.toISOString().slice(0, 19).replace("T", " ");
      console.log("last updated data: ", last_update);
      localStorage.setItem("last_update", JSON.stringify(last_update));
    }

    if (data_restaurant === null || data_menu === null) {
      console.log("Data restoran atau data menu kosong. Sinkronkan data ...");
      await this.starter(locId);
    } else {
      if (
        last_updated_data.data.data[0].last_updated_data !==
        data_restaurant.last_updated_data
      ) {
        // jika data update terakhir tidak sesuai dengan data kita, sinkronkan data ulang
        console.log(
          "Data update terakhir tidak sesuai. Sinkronkan data ulang..."
        );
        await this.starter(locId);
      }
    }

    const tableCode = this.$route.query.table_code
      ? this.$route.query.table_code
      : urlData.slug[1];

    const use_table = localStorage.getItem("use_table");

    if (tableCode) {
      var tableCodeParams = atob(tableCode);
      localStorage.setItem("table_code", tableCodeParams);

      // Check if tableCode exists in table_list
      const tableList = JSON.parse(localStorage.getItem("table_list")) || [];
      const tableExists = tableList.find(
        (table) => table.table_name === tableCodeParams
      );

      if (!tableExists) {
        console.error("Table code not found in table list.");
        this.isErrorUrl = true;
        this.isHidden = false;
        return this.$router.push("/error/page-not-found");
      }
    } else {
      if (use_table == 1) {
        var tableCodeParams = "";
        localStorage.setItem("table_code", tableCodeParams);
        return this.$router.push("/error/table-not-found");
      }
      // this.isHidden = true;
      // this.isLoading = false;
    }

    this.getListCategory();
    this.localStorageTimer = setInterval(this.checkLocalStorage, 500);

    await this.getList();
    this.isSkeleton = false;

    if (process.client) {
      this.getCartItems();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    fetchProducts() {
      // Simulasi pengambilan data
      this.isLoading = true;
      // this.loadingProgress = 0;
      const updateProgress = () => {
        if (this.loadingProgress < 100) {
          this.loadingProgress += 10; // Sesuaikan interval sesuai kebutuhan
          this.$nextTick(() => {
            requestAnimationFrame(updateProgress);
          });
        } else {
          this.$nextTick(() => {
            this.isLoading = false;
          });
        }
      };
      requestAnimationFrame(updateProgress);
      // const interval = setInterval(() => {
      //   if (this.loadingProgress < 100) {
      //     this.loadingProgress += 20; // Sesuaikan interval sesuai kebutuhan
      //   } else {
      //     this.isLoading = "";
      //     clearInterval(interval);
      //     this.isLoading = "close";
      //   }
      // }, 200);
    },
    async starter(locId) {
      try {
        // set lokasi
        localStorage.setItem("location", this.restaurantId);
        // remove
        localStorage.removeItem("table_code");
        localStorage.removeItem("data_customer");
        localStorage.removeItem("cart_items");
        localStorage.removeItem("selected_type_order");
        localStorage.removeItem("qrContent");

        // set detail restaurant
        this.steps = "get restaurant detail";
        const urlGetRestoDetail =
          "/qr_myorder/get_restaurant_detail?loc=" + locId;
        const restaurant = await FetchData.getData(urlGetRestoDetail);
        const appid = restaurant.data.data[0].appid;
        localStorage.setItem("data_restaurant", JSON.stringify(restaurant.data.data[0]));
        localStorage.setItem(
          "use_table",
          JSON.parse(
            restaurant.data.data[0].use_table == ""
              ? 0
              : restaurant.data.data[0].use_table
          )
        );

        // use_myorder_link_table = '0' = 'both'
        // use_myorder_link_table = '1' = 'with'
        // use_myorder_link_table = '2' = 'without'
        const tableCode = this.$route.query.table_code
          ? this.$route.query.table_code
          : this.$route.params.slug[1];
        var tableParams = this.$route.query.table_code;

        if (tableCode) {
          localStorage.setItem("table_code", tableParams);
          this.tableCode = tableCode;
        } else {
          const tableCodeLocal = localStorage.getItem("table_code");
          if (tableCodeLocal) {
            this.tableCode = tableCodeLocal;
          } else {
            const use_table = localStorage.getItem("use_table");

            if (use_table == 0) {
              // both
              if (tableCode) {
                this.isUseTable = false;
              } else {
                this.isErrorUrl = false;
                this.isHidden = true;
              }
            } else if (use_table == 1) {
              // with
              this.isHidden = false;
              if (tableCode) {
                this.isUseTable = true;
              } else {
                this.isErrorUrl = true;
              }
            } else if (use_table == 2) {
              // without
              if (tableCode) {
                this.isUseTable = false;
              } else {
                this.isErrorUrl = false;
                this.isHidden = true;
              }
            } else {
              // both
              if (tableCode) {
                this.isUseTable = true;
              } else {
                this.isErrorUrl = false;
                this.isHidden = true;
              }
            }
          }
        }

        // generate token
        this.steps = "generate token";
        const urlGenerateToken =
          "/qr_myorder/generate_token?appid=" + restaurant.data.data[0].appid;
        const token = await FetchData.getData(urlGenerateToken);
        localStorage.setItem("token", token.data.data);

        // set payment method
        this.steps = "get payment method";
        const urlGetPaymentMethod =
          "/qr_myorder/get_payment_method?appid=" + appid + "&loc=" + locId;
        const resPayment = await FetchData.getData(urlGetPaymentMethod);
        localStorage.setItem(
          "payment_method",
          JSON.stringify(resPayment.data.data[0])
        );

        // set order type
        this.steps = "get order type";
        const urlOrderType =
          "/qr_myorder/get_order_type?appid=" + appid + "&loc=" + locId;
        const resOrderType = await FetchData.getData(urlOrderType);
        localStorage.setItem(
          "order_type",
          JSON.stringify(resOrderType.data.data)
        );

        // set promo
        this.steps = "get promo";
        const urlPromo =
          "/qr_myorder/get_all_promo?appid=" + appid + "&loc=" + locId;
        const resPromo = await FetchData.getData(urlPromo);
        localStorage.setItem("promo", JSON.stringify(resPromo.data.data));

        // set banner
        this.steps = "get banner";
        const urlBanner =
          "/qr_myorder/get_banner?appid=" + appid + "&loc=" + locId;
        const resBanner = await FetchData.getData(urlBanner);
        localStorage.setItem("banner", JSON.stringify(resBanner.data.data));

        // set background
        this.steps = "get background";
        const urlBackground =
          "/qr_myorder/get_background?appid=" + appid + "&loc=" + locId;
        const resBackground = await FetchData.getData(urlBackground);
        localStorage.setItem(
          "background",
          JSON.stringify(resBackground.data.data)
        );

        // set table
        this.steps = "get table list";
        const urlTables =
          "/qr_myorder/get_all_table?appid=" + appid + "&loc=" + locId;
        const resTables = await FetchData.getData(urlTables);
        localStorage.setItem("table_list", JSON.stringify(resTables.data.data));

        // set menu
        this.steps = "sync data";
        const response = await FetchData.synchronize(locId);
        localStorage.setItem("data_menu", JSON.stringify(response.data.data));
      } catch (error) {
        this.isErrorUrl = false;
        this.isSkeleton = false;
        this.isHidden = true;
        console.log("error in steps: ", this.steps);
        console.log("error: " + error.message);
      }
    },
    checkLocalStorage() {
      // const currentCartItems = JSON.parse(localStorage.getItem("cart_items"));
      const currentCartItems =
        JSON.parse(localStorage.getItem("cart_items")) || [];

      // if (JSON.stringify(currentCartItems) !== []) {
      if (currentCartItems.length !== 0) {
        this.getCartItems();
      }
    },
    getList() {
      this.clockNow = new Date().toLocaleTimeString();
      let storedProducts = localStorage.getItem("data_menu");
      this.products = JSON.parse(storedProducts);
      this.countProduct = 0;
      this.products.forEach((element) => {
        this.countProduct += element.product_count;
      });
    },
    getListCategory() {
      const time = new Date().toLocaleTimeString();
      this.category = JSON.parse(localStorage.getItem("data_menu"));
      
      const filteredCategory = this.category.filter((item) => 
                  (item.order_time_start < item.order_time_end &&
                  item.order_time_start <= time &&
                  item.order_time_end >= time) ||
                  (item.order_time_start >= item.order_time_end &&
                  time >= item.order_time_start) ||
                  (item.order_time_start > item.order_time_end && 
                  item.order_time_start >= time && item.order_time_end >= time)
      )
      this.filteredCategory = filteredCategory;
    },
    getCartItems() {
      if (process.client) {
        const cartItems = JSON.parse(localStorage.getItem("cart_items"));
        if (cartItems) {
          this.showBottomCart = true;
        } else {
          this.showBottomCart = false;
        }
      }
    },
    searchProducts() {
      if (this.searchQuery.trim() !== "") {
        const currentTime = new Date().toLocaleTimeString(); // Get current time in milliseconds
        let tempArr = []; // nanti hasilnya ditampung dulu kesini

        this.products.forEach((product) => {
          const orderStart = product.order_time_start;
          const orderEnd = product.order_time_end;
          const isOrderInRange = ((orderStart < orderEnd &&
            orderStart <= currentTime &&
            orderEnd >= currentTime) ||
            (orderStart >= orderEnd &&
            currentTime >= orderStart) ||
            (orderStart > orderEnd && 
            orderStart >= currentTime && orderEnd >= currentTime));

          if (isOrderInRange) {
            const filteredDetails = product.product_details.filter((detail) =>
              detail.product_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            );
            tempArr.push(...filteredDetails);
          }
        });

        this.filteredProducts = tempArr;

        return this.filteredProducts;
      } else {
        this.filteredProducts = [];
        this.getList();
      }
    },
    handleStorageEvent(event) {
      if (event.key === "cartItems") {
        this.getCartItems();
      }
    },
    toDetail(id) {
      this.$router.push("/restaurant/detail/category/" + id);
    },
    openModalCategory() {
      this.showModalCategory = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalAllProduct");
        modal.showModal();
      });
    },
    closeModalCategory() {
      this.showModalCategory = false;
      this.$nextTick(() => {
        // let modal = document.getElementById("modalAllProduct");
        // modal.close();
      });
    },
  },
});
</script>

