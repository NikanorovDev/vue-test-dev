<template>
  <div v-show="posts.length > 0">
    <h3 style="color: green">Список новостей:</h3>
    <transition-group name="user-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h3 v-show="posts.length === 0" style="color: red">
    Список новостных постов пуст
  </h3>
</template>


<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>