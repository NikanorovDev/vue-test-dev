<template>
  <form action="" @submit.prevent>
    <h4>Создать пост</h4>
    <my-input type="text" placeholder="Автор" v-model="post.title" />
    <my-input type="text" placeholder="Описание" v-model="post.body" />
    <my-button @click="createPost">Создать</my-button>
  </form>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";
export default {
  components: { MyButton, MyInput },
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style>
</style>