<template lang="html">
  <div class="table-content" >



<br>
    <el-table :data="consultingFieldList" style="width: 100%">
      <el-table-column prop="name" label="咨询领域"></el-table-column>
      <el-table-column prop="" label="咨询领域详情"></el-table-column>
      <el-table-column prop="" label="操作"></el-table-column>
    </el-table>

<div class="block" style="float:right;margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>

  </div>


</template>

<script>

export default {
    data() {
        return {
             // tableData:this.$store.state.consultingFieldList,
             total:'0',
             currentPage: 4
        }
    },
    beforeMount() {
      this.search();
    },
    methods:{
        search(){
          return this.$axios.post("/api/consultingField/getAllMessageByCondition").then((response) => {
            if (response.status === 200) {
              this.$store.state.consultingFieldList = response.data.consultingFieldList;
              console.log("====="+this.$store.state.consultingFieldList[0].name)
            } else {
              return {msg: "抱歉，服务器错误"}
            }
          }).catch((error) => {
            return Promise.reject({msg: error.message})
          })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
      }

    },
    computed:{
        consultingFieldList(){
            return this.$store.state.consultingFieldList
        },
    }
}
</script>

<style lang="css">
</style>
