<template>
  <div class="container">
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
            <b-carousel
              id="slideShow"
              v-model="slide"
              :interval="0"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
            >
              <b-carousel-slide
                v-for="item in slideItem.items"
                :img-src="item"
                :key="item"
              />
            </b-carousel>
            <p>Page: # {{ slide + 1 }}<br /></p>
          </b-tab>
          <b-tab title="Virtual Cast">
            <pre>{{ jsonTemplate }}</pre>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MetaInfo } from "vue-meta";

export default Vue.extend({
  data() {
    return {
      slideItem: {
        title: "",
        created_at: "",
        items: [],
      },
      jsonTemplate: "",
      slide: 0,
    };
  },
  head(): MetaInfo {
    return {
      title: this.slideItem.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.slideItem.title + " に関してのスライド資料",
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "og:type", property: "og:type", content: "article" },
        {
          hid: "og:title",
          property: "og:title",
          content: this.slideItem.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.slideItem.title + " に関してのスライド資料",
        },
        { hid: "og:site_name", property: "og:site_name", content: "Slide4VR" },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://slide4vr.nklab.dev/slide4vr_og.png",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://slide4vr.nklab.dev/slide/${params.user}/${params.id}",
        },
      ],
    };
  },
  async asyncData({ params, $config, $axios }) {
    const load = async (url: string) => {
      return $axios.$get(url);
    };
    const slide = await load(
      `${$config.apiBaseUrl}/slide/${params.user}/${params.id}/`
    );
    const vcas = await load(
      `${$config.apiBaseUrl}/slide/${params.user}/${params.id}/?format=vcas`
    );

    return {
      slideItem: {
        title: slide.title,
        created_at: slide.created_at,
        items: slide.slides,
      },
      jsonTemplate: JSON.stringify(vcas, null, "  ").slice(1, -2).trim(),
    };
  },
  methods: {
    onTweet() {
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "Slide4VR: " +
        this.slideItem.title +
        "+%23slide4vr" +
        "&url=" +
        location.href;
      const option = "status=1,width=818,height=400,top=100,left=100";
      window.open(shareURL, "twitter", option);
    },
  },
});
</script>
