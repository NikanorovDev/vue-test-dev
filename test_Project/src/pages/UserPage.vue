
<template>
  <div>
    <h1>Страница с новостными постами</h1>
    <my-input v-model="searchQuery" placeholder="поиск" v-focus />
    <div class="app_btns">
      <my-button @click="showDialog">Новый пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- <my-button @click="fetchPosts">Получить новости</my-button> -->

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSerchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
    <div
      v-for="pageNumber in totalPage"
      key="pageNumber"
      class="page"
      :class="{ 'current-page': page === pageNumber }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div> -->
  </div>
</template>

<script>
import PostForm from "../components/PostForm.vue";
import PostList from "../components/PostList.vue";
import MyDialog from "../components/UI/MyDialog.vue";
import axios from "axios";
import MyButton from "../components/UI/MyButton.vue";
import MySelect from "../components/UI/MySelect.vue";
import MyInput from "../components/UI/MyInput.vue";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        { value: "title", name: "По автору" },
        { value: "body", name: "По описанию" },
      ],
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
      // при отжатии кнопки и добавления новости - диалоговое окно пропадет/ на усмотрение/ можно и убрать this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        aler("ошибка");
      } finally {
        this.isPostLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        aler("ошибка");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    this.$refs.observer;
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPage) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSerchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style>
.page__wrapper {
  display: flex;
  margin-top: 20px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

/* .observer {
  height: 50px;
  background-color: green;
} */

/* .wrap {
  padding-top: 20px;
  max-width: 800px;
  margin: 0 auto;
} */
</style>
