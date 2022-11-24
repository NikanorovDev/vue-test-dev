<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Автор: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button @click="$emit('remove', post)">Delete</my-button>
    </div>
  </div>
</template>
 
<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: {
    MyButton,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style >
.post {
  border-radius: 10px;
  padding: 15px;
  border: 3px solid black;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>