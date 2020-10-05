<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="card">
      <div class="card-header">
        <h2>{{this.$store.state.user.name}} さんのスライド一覧</h2>
      </div>
      <div class="container">
        <b-card-group columns>
          <b-card
            v-for="item in slides" :key="item._id"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <span  v-if="item.is_uploaded==true">
            <a :href='"/slide/" + $store.state.user.id + "/" + item.key'>
              <b-card-img :src='item.thumbnail' alt="slide" bottom></b-card-img>
            </a>
            </span>
            <span v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </span>
            <span  v-if="item.is_uploaded==true">
              <a :href='"/slide/" + $store.state.user.id + "/" + item.key' style="text-decoration: none; cursor: pointer;color: #007DBA;">
                <h6>{{item.title}}</h6>
              </a>
            </span>
            <span v-else>
                <h6>{{item.title}}</h6>
            </span>
            <span>Upload date: {{ item.created_at | moment }}</span>
            <hr />
            <input type="hidden" :value="item.key" />
            <button class="btn btn-danger" @click="onClickDelete">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-trash-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                />
              </svg>
            </button>
          </b-card>
          
        </b-card-group>
  
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";

export default {
  components: {
    loading: Loading,
  },
  filters: {
    moment(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    },
  },
  data() {
    return {
      slides: [],
      slideKey: "",
      isLoading: false,
      fullPage: true,
      timer: "",
    };
  },
  created: function () {
    this.isLoading = true;
    this.fetchSlides();
    this.timer = setInterval(this.fetchSlides, 10 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchSlides() {
      const uri = process.env.VUE_APP_API_BASE_URL + "/slide";

      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      };
      this.axios.get(uri, config).then((response) => {
        this.slides = response.data;
        this.slides.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
        this.isLoading = false;
      });
    },
    onClickDelete: function (event) {
      const key = event.target.parentElement.getElementsByTagName("input")[0]
        .value;

      const uri = process.env.VUE_APP_API_BASE_URL + "/slide/" + key;
      this.isLoading = true;

      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      };
      this.axios.delete(uri, config).then((response) => {
        this.fetchSlides();
      });
    },
    onCancel: function () {
      console.log("User cancelled the loader.");
    },
    onClickShow: function (event) {
      this.slideKey = event.target.parentElement.getElementsByTagName(
        "input"
      )[0].value;
      this.$refs.modal.show();
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
};
</script>
