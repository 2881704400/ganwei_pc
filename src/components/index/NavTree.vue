<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <span v-text="item.title"></span>
      <tree v-if="item.children && item.children.length" :list="item.children"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'tree',
  data () {
    return {}
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
