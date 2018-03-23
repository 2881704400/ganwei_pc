<template>
  <div class="equips">
      设备数据
  </div>
</template>

<script>
export default {
  name: 'equips',
  data () {
    return {}
  },
  methods: {
    getAllState () {
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: ''
      }).then(res => {
        let data = res.data.HttpData
        console.log(data)
      }).catch(err => {
        console.log(err)
        console.log('密钥验证失败，请检查登陆信息!')
      })
    }
  },
  mounted () {
    this.getAllState()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>
