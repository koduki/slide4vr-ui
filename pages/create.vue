<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2>スライドのアップロード</h2>
      </div>
      <div class="container">
        <form v-on:submit.prevent="postSlide">
          <div v-show="message" class="alert alert-danger">{{ message }}</div>
          <div class="form-group">
            <label>スライドタイトル:</label>
            <input type="text" class="form-control" v-model="item.title" />
          </div>
          <div class="form-group">
            <label>ファイル(pdf, pptx):</label>
            <div class="custom-file">
              <input
                type="file"
                accept=".pptx, .pdf"
                class="custom-file-input"
                id="inputFile"
                @change="onDrop"
              />
              <label class="custom-file-label" for="inputFile">{{
                filepath
              }}</label>
            </div>
          </div>
          <div>
            <input type="submit" class="btn btn-primary" value="アップロード" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  middleware: ["auth-filter"],
  data() {
    return {
      item: {
        title: "",
        files: [],
      },
      filepath: "ここにスライドをアップロード",
      message: "",
    };
  },
  methods: {
    config() {
      return {
        headers: {
          Authorization: "Bearer " + this.$accessor.user.token,
        },
      };
    },
    //     async fetchSlides() {
    //   const url = `${this.$config.apiBaseUrl}/slide`;
    //   const response = await axios.post(url, data, this.config());
    //   this.slides = response.data;
    // },

    async postSlide() {
      const url = `${this.$config.apiBaseUrl}/slide`;
      const data = new FormData();

      data.append("title", this.item.title);
      data.append("slide", this.item.files[0]);

      axios
        .post(url, data, this.config())
        .then(() => {
          this.$swal({
            icon: "success",
            text: "Upload Success!",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          this.message = `status: ${error.response.status}, message: ${error.response.data}`;
        });
    },
    onDrop: function (event: any) {
      this.item.files = event.target.files;
      //   this.filepath = this.item.files[0].name;
    },
  },
});
</script>