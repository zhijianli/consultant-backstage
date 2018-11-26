<template lang="html">
  <div class="table-content" >
    <br><br>
    咨询师名字：
    <el-input
      placeholder="请输入咨询师名字"
      v-model="input21" style="width: 30%">
    </el-input>

    <br><br>

<el-upload class="upload-demo" action="" ref="upload" :auto-upload='false' :on-change='changeUpload' accept="image/jpeg,image/gif,image/png,image/bmp">
<div size="small" class="upload_btn">
<div style="height:40px"></div>
<i class="iconfont icon-jiahao"></i>
<!-- <p style="line-height:0">点击上传</p> -->
<el-button type="primary">上传头像<i class="el-icon-upload el-icon--right"></i></el-button>
</div>
</el-upload>
<br>
<br>
地区：
<el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br><br><br><br>
    领域：
    <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br><br><br>
        咨询方式：
        <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <br><br><br><br>
          价格：
          <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

<br><br><br><br>
  联系方式：
  <el-input
        placeholder="请输入联系方式"
        prefix-icon="el-icon-search"
        v-model="input21" style="width: 30%">
      </el-input>
<br><br><br><br>
  受训经历：
  <br><br>
  <el-input
    type="textarea"
    :autosize="{ minRows: 3}"
    placeholder="请输入内容"
    v-model="textarea">
  </el-input>



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
          textarea: '',
          options: [
                  {
                    value: '0',
                    label: '全部'
                  },
                  {
                    value: '1',
                    label: '待收款'
                  },
                  {
                    value: '2',
                    label: '已收款'
                  },
                  {
                    value: '3',
                    label: '已发货'
                  }],
                  value: '全部'
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
