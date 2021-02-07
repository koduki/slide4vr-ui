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
                @change="onChange"
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
        file: { name: "" },
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

    async postSlide() {
      const url = `${this.$config.apiBaseUrl}/slide`;
      const data = new FormData();

      data.append("title", this.item.title);
      data.append("slide", (this.item.file as unknown) as Blob);

      this.$nuxt.$loading.start();
      axios
        .post(url, data, this.config())
        .then(() => {
          this.$swal({
            icon: "success",
            text: "Upload Success!",
          });
          this.$nuxt.$loading.finish();
          this.$router.push("/");
        })
        .catch((error) => {
          this.message = `status: ${error.response.status}, message: ${error.response.data}`;
        });
    },
    onChange: function (event: { target: HTMLInputElement }) {
      const files = event.target.files;
      if (event.target.files != null) {
        this.item.file = event.target.files.item(0) as { name: "" };
      }
      this.filepath = this.item.file.name;
    },
  },
});
</script>