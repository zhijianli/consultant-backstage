<template lang="html">
  <div class="table-content" >
    <br><br>
    领域：
    <el-input
      placeholder="请输入领域名字"
      v-model="input21" style="width: 30%">
    </el-input>

    <br><br>
    <br><br>
    领域详情：
    <el-input
      placeholder="请输入领域详情名字"
      v-model="input21" style="width: 30%">
    </el-input>

    <br><br>



<br>
<br>
    <el-button type="primary">添加<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
    <el-button type="primary" icon="el-icon-edit el-icon--right">编辑</el-button>

<br>

  </div>


</template>

<script>
 import { quillEditor } from 'vue-quill-editor' //调用编辑器
export default {
    data() {
        return {

        }
    },

    methods:{

    },
    components: {

    },
    computed:{

    }
}
</script>

<style lang="css">
</style>
