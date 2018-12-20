<template lang="html">
  <div class="table-content" >

<br><br>
    <el-button type="primary" @click="consultingFieldAdd()">添加领域
    <i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
<br><br>

    <el-table
        :data="consultingFieldList"
        style="width: 100%">
        <el-table-column
          label="咨询领域"
          width="420">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="咨询领域详情"
          width="420">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.consultingFieldDetailStr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row,scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>



<div class="block" style="float:right;margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>

  </div>


</template>

<script>

export default {
    inject:['reload'],
    data() {
        return {
             // tableData:this.$store.state.consultingFieldList,
             currentPage: 1,
             total:'0',
             totalNum:1,
             pageSize:10
        }
    },
    beforeMount() {
      this.search();
    },
    methods:{
        search(){
          var params = new URLSearchParams();
          params.append('pageIndex', this.currentPage);
          params.append('pageSize', this.pageSize);
          // return this.$axios.post("/api/consultantCenter/consultingField/getAllMessageByCondition",params).then((response) => {
              return this.$axios.post("/api/consultingField/getAllMessageByCondition",params).then((response) => {
                if (response.status === 200) {
              this.$store.state.consultingFieldList = response.data.consultingFieldList;
              this.totalNum = response.data.consultingFieldCount;
            } else {
              return {msg: "抱歉，服务器错误"}
            }
          }).catch((error) => {
            return Promise.reject({msg: error.message})
          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.search();
        },
        handleCurrentChange(val) {
          console.log(`当前页=========: ${val}`);
          this.currentPage = val;
          this.search();
        },
        handleEdit(index,row,id){
          this.$router.push({
            path:'consultingFieldEdit',
            query:{
              operation:"编辑",
              index:index,
              id:id
            }
          })
        },
        handleDelete(index,row,id){
          var params = new URLSearchParams();
          params.append('id', id);
          // return this.$axios.post("/api/consultantCenter/consultingField/deleteConsultingField",params).then((response) => {
              return this.$axios.post("/api/consultingField/deleteConsultingField",params).then((response) => {
                if (response.status === 200) {
              this.reload()
            } else {
              return {msg: "抱歉，服务器错误"}
            }
          }).catch((error) => {
            return Promise.reject({msg: error.message})
          })
        },
        consultingFieldAdd(){
          this.$router.push({
               path:'consultingFieldEdit',
               query:{
                 operation:"添加"
               }
          })
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
