<template lang="html">
  <div class="table-content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    {{ count }}
    <p>
     <button @click="increment">+</button>
     <button @click="decrement">-</button>
   </p>
  </div>


</template>

<script>

export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods:{
        increment(){

          return this.$axios.post("/api/consultant/getAllMessageByCondition").then((response) => {
            if (response.status === 200) {
              return response.data
            } else {
              return {msg: "抱歉，服务器错误"}
            }
          }).catch((error) => {
            return Promise.reject({msg: error.message})
          })


          this.$store.commit('increment')
        },
        decrement(){
          this.$store.commit('decrement')
        }
    },
    computed:{
        count(){
            return this.$store.state.count
        },
    }
}
</script>

<style lang="css">
</style>
