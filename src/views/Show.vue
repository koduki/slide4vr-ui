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
        <div class="twitter_share">
          <button @click="onTweet" class="btn">
            <img src="/Twitter_Social_Icon_Circle_Color.svg" width="32px" />
          </button>
        </div>
      </div>
      <div class="container">
        <b-tabs content-class="mt-3">
          <b-tab title="Slide" active>
            <div v-if="isLoading==false">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Now Loading
            </div>
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
    this.loadSlide(this.$route.params.userid, this.$route.params.key);
    this.isLoading = false;
  },
  methods: {
    onCancel: function () {
      console.log("User cancelled the loader.");
    },
    onTabVcas: function(){
      this.isLoading = true;
      this.loadSlide4Vcas(this.$route.params.userid, this.$route.params.key);
      this.isLoading = false;
    },
    onTweet: function(){
        var shareURL = 'https://twitter.com/intent/tweet?text=' + "Slide4VR: " + this.slideItem.title + "+%23slide4vr" + '&url=' + location.href;
        const option = 'status=1,width=818,height=400,top=100,left=100'
        window.open(shareURL, 'twitter', option)
    },
    loadSlide: function (id, key) {
      this.isLoading = false;
      const uri = process.env.VUE_APP_API_BASE_URL + "/slide/"+ id + "/" + key + "/";
      this.axios.get(uri).then((response) => {
        this.slideItem.title = response.data.title;
        this.slideItem.created_at = response.data.created_at;
        this.slideItem.items = response.data.slides;
      });
    },
    loadSlide4Vcas: function (id, key) {
      this.isLoading = false;
      const uri = process.env.VUE_APP_API_BASE_URL + "/slide/"+ id + "/" + key + "/?format=vcas";
      this.axios.get(uri).then((response) => {
        this.jsonTemplate = JSON.stringify(response.data, null, "  ")
          .slice(1, -2)
          .trim();
      });
    },
  }
};
</script>