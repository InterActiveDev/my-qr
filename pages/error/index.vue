<template>
    <div class="h-screen bg-white">
        <div class="bg-white py-8 flex flex-col justify-center items-center border-b shadow-lg">
        <img
        src="~/assets/icons/logo.png"
        loading="lazy"
        preload
        class="w-32"
        alt=""
        srcset=""
        />
        </div>
        <section class="flex flex-col pt-20 justify-center items-center bg-white">
            <img src="~/assets/images/not_found.png" class="w-[75%] h-[50%] object-cover " alt="" >
        </section>
    </div>
</template>


<script>
    export default defineComponent({
        component: {
            navbarTo: "/index",
        },
        mounted() {
            const locId = this.$route.params.id;
            if(locId){
                localStorage.setItem("location", locId);
                this.goToIndex();
            }
        },
        methods: {
            goToIndex() {
                this.$router.push("/");
            },
            openModalMenu() {
                let modal = document.getElementById("modalMenu");
                modal.showModal();
            },
        },
    });
</script>
