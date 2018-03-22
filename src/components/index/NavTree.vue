<template>
  <ul class="nav-tree">
    <li v-for="(item, index) in list" :key="index" :class="[(item.children && item.children.length) ? 'has-child' : 'no-child']">
      <span class="title" v-text="item.title"></span>
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

<style lang="scss" src="../../assets/styles/sass/nav-tree.scss"></style>
