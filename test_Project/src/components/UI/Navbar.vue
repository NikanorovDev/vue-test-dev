<template>
  <div class="navbar">
    <h1 @click="$router.push('/')">На Главную - жми меня</h1>
    <div class="navbar__bnts">
      <my-button @click="$router.push('/users')">Страница с постами</my-button>
      <my-button @click="$router.push('/about')">О приложении</my-button>
    </div>
  </div>
</template>

<script>
// import MyButton from "./MyButton.vue";
export default {};
</script>

<style scoped>
.navbar {
  padding: 20px;
  padding-top: 20px;
  box-shadow: -31px 14px 30px grey;
}
.navbar__bnts {
  margin-top: 20px;
}
</style>