<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2>{{ this.$accessor.user.name }} さんのスライド一覧</h2>
      </div>
      <div class="container">
        <b-card-group columns>
          <b-card
            v-for="item in slides"
            :key="item._id"
            style="max-width: 20rem"
            class="mb-2"
          >
            <span v-if="item.is_uploaded == true">
              <a :href="'/slide/' + $accessor.user.id + '/' + item.key">
                <b-card-img
                  :src="item.thumbnail"
                  alt="slide"
                  bottom
                ></b-card-img>
              </a>
            </span>
            <span v-else>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </span>
            <span v-if="item.is_uploaded == true">
              <a
                :href="'/slide/' + $accessor.user.id + '/' + item.key"
                style="text-decoration: none; cursor: pointer; color: #007dba"
              >
                <h6>{{ item.title }}</h6>
              </a>
            </span>
            <span v-else>
              <h6>{{ item.title }}</h6>
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

<script lang="ts">
import moment from "moment";
import axios from "axios";

import Vue from "vue";

export default Vue.extend({
  middleware: ["auth-filter"],
  filters: {
    moment(date: number) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    },
  },
  data() {
    return {
      slides: [],
      slideKey: "",
      timer: 0,
    };
  },
  async created() {
    this.fetchSlides();
    this.startAutoReload();
  },

  beforeDestroy() {
    this.cancelAutoReload();
  },

  methods: {
    config() {
      return {
        headers: {
          Authorization: "Bearer " + this.$accessor.user.token,
        },
      };
    },
    async fetchSlides() {
      const url = `${this.$config.apiBaseUrl}/slide`;
      this.slides = (await axios.get(url, this.config())).data;
      this.$nuxt.$loading.finish();
      this.slides.sort((a: any, b: any) =>
        a.created_at < b.created_at ? 1 : -1
      );
    },
    async onClickDelete(event: { target: HTMLButtonElement }) {
      const target = ((t: HTMLElement) => {
        const tag = t.tagName.toLowerCase();
        switch (tag) {
          case "button":
            return t;
          case "svg":
            return t.parentElement;
          case "path":
            return t.parentElement?.parentElement;
        }
      })(event.target);
      console.log(target);

      const btn = target?.parentElement?.getElementsByTagName("input")[0];
      const key = btn?.value;
      console.log(key);

      const url = `${this.$config.apiBaseUrl}/slide/${key}`;
      this.$nuxt.$loading.start();
      await axios.delete(url, this.config());
      this.fetchSlides();
    },
    startAutoReload() {
      this.timer = window.setInterval(this.fetchSlides, 10 * 1000);
    },
    cancelAutoReload() {
      window.clearInterval(this.timer);
    },
  },
});
</script>
