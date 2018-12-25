<template lang="html">
  <div class="table-content" >
    <br><br>
    领域：
    <el-input
      placeholder="请输入领域名字"
      v-model="consultantFieldName" style="width: 30%">
    </el-input>

    <br><br>
    <br><br>
    <div style="display: flex;">
        领域详情：
        <el-input
          placeholder="请输入领域详情名字"
          v-model="consultingFieldDetailStr" style="width: 30%">
        </el-input>
        <div style="line-height:40px;color: #B87070;">&nbsp&nbsp注：领域详情中间用“-”隔开，如：“抑郁-焦虑-恐惧”</div>
    </div>

    <br><br>


<br>
<br>
    <el-button type="primary" @click="insertOrUpdateConsultantField" >
      {{this.operation}}
         <!--<i class="el-icon-circle-plus-outline el-icon&#45;&#45;right"></i>-->
    </el-button>
    <!--<el-button type="primary" icon="el-icon-edit el-icon--right">编辑</el-button>-->

<br>

 </div>


</template>

<script>
import { quillEditor } from 'vue-quill-editor' //调用编辑器
export default {
   data() {
       return {
         id:null,
         operation:null,
         consultantFieldName:'',
         consultingFieldDetailStr:''
       }
   },
   beforeMount() {
      var params = new URLSearchParams();
      this.id = this.$route.query.id;
      this.operation = this.$route.query.operation;
      if(this.id>0){
        params.append('id', this.$route.query.id);
        return this.$axios.post("/api/consultantCenter/consultingField/getConsultantFieldById",params).then((response) => {
        //   return this.$axios.post("/api/consultingField/getConsultantFieldById",params).then((response) => {
            if (response.status === 200) {
            this.consultantFieldName = response.data.consultantField.name;
            this.consultingFieldDetailStr = response.data.consultantField.consultingFieldDetailStr;
          } else {
            return {msg: "抱歉，服务器错误"}
          }
        }).catch((error) => {
          return Promise.reject({msg: error.message})
        })
      }

   },
   methods:{
     insertOrUpdateConsultantField(val) {
         var params = new URLSearchParams();
         if(this.id>0){
           params.append('id', this.$route.query.id);
         }

         params.append('name', this.consultantFieldName);
         params.append('consultingFieldDetailStr', this.consultingFieldDetailStr);
         return this.$axios.post("/api/consultantCenter/consultingField/insertOrUpdateConsultantField",params).then((response) => {
         //   return this.$axios.post("/api/consultingField/insertOrUpdateConsultantField",params).then((response) => {
             if (response.status === 200) {
             this.$router.push({
               path:'consultingFieldList',
               query:{

               }
             })
           } else {
             return {msg: "抱歉，服务器错误"}
           }
         }).catch((error) => {
           return Promise.reject({msg: error.message})
         })
     }
   },
   components: {

   },
   computed:{

   }
}
</script>

<style lang="css">
</style>
