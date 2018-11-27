<template lang="html">
  <div class="table-content" >
        <br><br>
    <el-input
      placeholder="请输入咨询师名字"
      prefix-icon="el-icon-search"
      v-model="input21" style="width: 20%">
    </el-input>
    <el-input
      placeholder="请输入价格"
      prefix-icon="el-icon-search"
      v-model="input22" style="width: 20%">
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>


    <el-button type="primary" @click="consultantAdd()">添加咨询师
    <i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>


<br>

<br>

    <!-- <p>
      {{count}}
     <button @click="increment">+</button>
     <button @click="decrement">-</button>
   </p> -->

   <el-table
       :data="consultantList"
       style="width: 100%">
       <el-table-column
         label="咨询师名字"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.name }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="地区"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.province }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="咨询领域"
         width="180">
         <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
             <p>姓名: {{ scope.row.name }}</p>
             <p>地区: {{ scope.row.province }}</p>
             <div slot="reference" class="name-wrapper">
               <el-tag size="medium">{{ scope.row.province }}</el-tag>
             </div>
           </el-popover>
         </template>

       </el-table-column>
       <el-table-column
         label="咨询方式"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.province }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="咨询价格"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.price }}</span>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
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
            // tableData: [{
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1517 弄'
            // }, {
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1519 弄'
            // }, {
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1516 弄'
            // }]
             // tableData:this.$store.state.consultantList,
             total:'0',
             currentPage: 4
        }
    },
    beforeMount() {
      this.search();
    },
    methods:{
        search(){
          return this.$axios.post("/api/consultant/getAllMessageByCondition").then((response) => {
            if (response.status === 200) {
              this.$store.state.consultantList = response.data.consultantList;
              this.$store.state.name = response.data.consultantList[0].name;
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
       },
       handleEdit(index,row){
         this.$router.push({
              path:'consultantEdit',
              query:{
                 index:index
              }
         })
       },
       consultantAdd(){
         console.log("========");
         this.$router.push({
              path:'consultantEdit',
              query:{

              }
         })
       }
        // increment(){
        //   this.$store.commit('increment')
        // },
        // decrement(){
        //   this.$store.commit('decrement')
        // }
    },
    computed:{
        // count(){
        //     return this.$store.state.count
        // },
        consultantList(){
            return this.$store.state.consultantList
        },
    }
}
</script>

<style lang="css">
</style>
