<template>
  <input class="input" type="text" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style>
.input {
  border-radius: 10px;
  margin: 10px;
  width: 50%;
  border: 3px solid green;
  padding: 10px 15px;
}
</style>