<template>
  <router-link
  v-if="!liData.childrens"
  tag="li"
  :to="liData.url"
  v-text="liData.title"
  ></router-link>
  <li
  v-else
  >
    <ul>
      <li v-for="(item, index) in liData.childrens" :key="index" v-text="item.title"></li>
    </ul>
  </li>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    liData: {
      type: Object,
      required: true
    }
  }
}
</script>
