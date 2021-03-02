<template>
    <div id="app">
        <div
            class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 class="my-0 mr-md-auto title-logo">
                <router-link to="/">
                    <img src="/slide4vr.png" />
                    <span class="banner">
                        Slide
                        <span class="banner-4">4</span>VR β
                    </span>
                </router-link>
            </h5>
            <div v-show="$accessor.user.id">
                <router-link class="btn btn-outline-primary" to="/create">スライドを登録</router-link>
                <b-button id="show-btn" @click="$bvModal.show('bv-modal-profile')" variant="link">
                    <img :src="$accessor.user.pic" width="32px" height="32px" />
                </b-button>

                <b-modal id="bv-modal-profile" size="lm" hide-footer @show="showProfile()">
                    <template v-slot:modal-title>プロフィール</template>
                    <div>
                    <p>
                        <span>APIトークン: </span><span>{{appToken}}</span>
                        <b-button class="sm-1 btn-danger" @click="resetAppToken()">再作成</b-button>
                    </p>
                    <p>※ VCJEと連携させる場合はAPIトークンを利用してください</p>
                    </div>
                    <b-button class="mt-3" block @click="logout()">Logout</b-button>
                </b-modal>
            </div>
        </div>
        <Nuxt />
    </div>
</template>

<script>
    import { Auth } from "@/services/auth";
    import axios from "axios";

    export default {
        data() {
            return {
                appToken: "",
                is_visible: ""
            };
        },
        mounted: async function () {


        },
        methods: {
            config() {
                return {
                    headers: {
                        Authorization: "Bearer " + this.$accessor.user.token,
                    },
                };
            },
            async isVisible() {
                let is_visible = false;
                if (this.$accessor.user.id != "") {
                    if (this.$route.path.trim() != "/login") {
                        is_visible = true;
                    }
                }
                return is_visible;
            },
            async logout() {
                this.$bvModal.hide("bv-modal-profile");
                const auth = new Auth(this.$accessor, this.$config.firebase);
                await auth.logout();
                this.$router.push("/login");
            },
            async showProfile() {
                if (this.isVisible()) {
                    const url = `${this.$config.apiBaseUrl}/user/apptoken`;
                    this.appToken = (await axios.get(url, this.config())).data.token;
                }
            },
            async resetAppToken() {
                if (this.isVisible()) {
                    const url = `${this.$config.apiBaseUrl}/user/apptoken/reset`;
                    this.appToken = (await axios.post(url, {}, this.config())).data.token;
                }
            }
        },
    };
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Mitr:wght@600&display=swap");

    .avatar {
        border-radius: 100%;
        overflow: hidden;
        display: inline-block;
    }

    .title-logo {
        height: 32px;
    }

    .title-logo img {
        margin-top: -10px;
        height: 100%;
    }

    .title-logo span.banner {
        margin-left: 0px;
        font-size: 150%;
        font-family: "Mitr", sans-serif;
    }

    .title-logo span.banner-4 {
        margin-left: -8px;
        color: rgb(42, 212, 255);
    }

    .title-logo a:link {
        color: #000000;
        text-decoration: none;
    }

    .title-logo a:visited {
        color: #000000;
        text-decoration: none;
    }

    .title-logo a:hover {
        color: #000000;
        text-decoration: none;
    }

    .title-logo a:active {
        color: #000000;
        text-decoration: none;
    }
</style>