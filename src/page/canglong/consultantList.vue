<template lang="html">
  <div class="table-content" >
        <br><br>
    <el-input
      placeholder="请输入咨询师名字"
      prefix-icon="el-icon-search"
      v-model="searchName" style="width: 20%">
    </el-input>
    <el-input
      placeholder="请输入价格"
      prefix-icon="el-icon-search"
      v-model="searchPrice" style="width: 20%">
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
         label="手机号"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.telephone }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="地区"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.province }} - {{ scope.row.city }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="受训经历"
         width="180">
         <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
             <p>{{ scope.row.experienceOfTraining }}</p>
             <div slot="reference" class="name-wrapper">
               <el-tag size="medium">{{ scope.row.experienceOfTrainingAbb }}...</el-tag>
             </div>
           </el-popover>
         </template>

       </el-table-column>
       <el-table-column
         label="咨询方式"
         width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.consultationMethodStr }}</span>
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

    <!--<div class="block" style="float:right;margin-top:20px;">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[100, 200, 300, 400]"-->
        <!--:page-size="100"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="400">-->
      <!--</el-pagination>-->
    <!--</div>-->

  </div>


</template>

<script>

export default {
    inject:['reload'],
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
             currentPage: 1,
             totalNum:1,
             pageSize:10,
             searchName:"",
             searchPrice:""
        }
    },
    beforeMount() {
      this.search();
    },
    methods:{
        search(){
          var params = new URLSearchParams();
          params.append('name', this.searchName);
          params.append('price', this.searchPrice);
          params.append('pageIndex', this.currentPage);
          params.append('pageSize', this.pageSize);
          return this.$axios.post("/api/consultantCenter/consultant/getAllMessageByCondition",params).then((response) => {
          //   return this.$axios.post("/api/consultant/getAllMessageByCondition",params).then((response) => {
                if (response.status === 200) {
              this.$store.state.consultantList = response.data.consultantList;
              this.$store.state.name = response.data.consultantList[0].name;
              this.totalNum = response.data.consultantCount;
              console.log("____________________"+this.totalNum);
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
            this.currentPage =  val;
            this.search();
       },
       handleEdit(index,row,id){
         this.$router.push({
              path:'consultantEdit',
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
        return this.$axios.post("/api/consultantCenter/consultant/deleteConsultant",params).then((response) => {
        // return this.$axios.post("/api/consultant/deleteConsultant",params).then((response) => {
          if (response.status === 200) {
            this.reload()
          } else {
            return {msg: "抱歉，服务器错误"}
          }
        }).catch((error) => {
          return Promise.reject({msg: error.message})
        })
      },
       consultantAdd(){
         this.$router.push({
              path:'consultantEdit',
              query:{
                operation:"添加"
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
