<template>
  <van-field
    :required="required"
    :type="type"
    :label="title"
    :value="value"
    :placeholder="placeholder"
    :border="border"
    :input-align="inputAlign"
    :confirm-type="confirmType"
    @change="onChange"
  />
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    title: String,
    value: [String, Number, Boolean],
    placeholder: String,
    border: {
      type: Boolean,
      default: true
    },
    inputAlign: {
      type: String,
      default: 'right'
    },
    confirmType: {
      type: String,
      default: 'next'
    }
  },

  methods: {
    onChange(event) {
      this.$emit('change', this.name, event.detail, event)
    }
  }
}
</script>
