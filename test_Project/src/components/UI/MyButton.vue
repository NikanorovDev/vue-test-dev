<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style>
.btn {
  display: block;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 12px;
}
</style>