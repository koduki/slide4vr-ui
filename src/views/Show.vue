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
        <h2>{{ slideItem.title }}</h2>
      </div>
      <div class="container">
        <b-tabs content-class="mt-3">
          <b-tab title="Slide" active>
            <b-carousel
              id="slideShow"
              v-model="slide"
              :interval=0 
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide v-for="item in slideItem.items":img-src=item />
            </b-carousel>
            <p>
              Page: # {{ slide + 1 }}<br>
            </p>
          </b-tab>
          <b-tab title="Virtual Cast" @click=onTabVcas><pre>{{jsonTemplate}}</pre></b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    loading: Loading,
  },
  data() {
    return {
      slideItem: {
        title: "",
        created_at: "",
        items: []
      },
      jsonTemplate: "",
      message: "",
      isLoading: false,
      fullPage: true,
      slide: 0,
      sliding: null
    };
  },
  created: function () {
    this.isLoading = true;

    this.loadSlide(this.$route.params.key);
  },
  methods: {
    onCancel: function () {
      console.log("User cancelled the loader.");
    },
    onTabVcas: function(){
      this.loadSlide4Vcas(this.$route.params.key);
    },
    loadSlide: function (key) {
      this.isLoading = false;
      const id = this.$store.state.user.id
      const uri = process.env.VUE_APP_API_BASE_URL + "/slide/"+ id + "/" + key + "/";
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      };
      this.axios.get(uri, config).then((response) => {
        this.slideItem.title = response.data.title;
        this.slideItem.created_at = response.data.created_at;
        this.slideItem.items = response.data.slides;
      });
    },
    loadSlide4Vcas: function (key) {
      this.isLoading = false;
      const id = this.$store.state.user.id
      const uri = process.env.VUE_APP_API_BASE_URL + "/slide/"+ id + "/" + key + "/?format=vcas";
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      };
      this.axios.get(uri, config).then((response) => {
        this.jsonTemplate = JSON.stringify(response.data, null, "  ")
          .slice(1, -2)
          .trim();
      });
    },
  }
};
</script>