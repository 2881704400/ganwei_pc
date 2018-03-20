<template>
  <div class="gw-index">
    <header class="header">
      <div class="logo"></div>
    </header>
    <div class="main">
      <aside class="nav-left">
        <ul>
          <router-link
          tag="li"
          v-for="(item, index) in navList"
          :key="index"
          :to="item.url"
          v-text="item.title"
          ></router-link>
        </ul>
      </aside>
      <router-view class="main-body"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          title: '首页',
          url: 'home'
        },
        {
          title: '设备数据',
          url: 'a'
        },
        {
          title: '实时快照',
          url: 'b'
        },
        {
          title: '系统配置',
          url: 'c'
        },
        {
          title: '事件查询',
          url: 'd'
        },
        {
          title: '报警排表',
          url: 'e'
        },
        {
          title: '定时任务',
          url: 'f'
        },
        {
          title: '设备联动',
          url: 'g'
        }
      ]
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/sass/index.scss"></style>
