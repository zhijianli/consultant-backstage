<template>
  <div class="upload">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload" />
      <!--<el-upload class="upload-demo" type="file" :id="id" :on-change='doUpload'>上传图片<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-upload>-->
      <br><br>
      <img :src="aliOssUrl+defaultimg" alt="">

      <!--<el-upload class="upload-demo" :id="id" action="" ref="upload" :auto-upload='false' :on-change='doUpload' accept="image/jpeg,image/gif,image/png,image/bmp">-->
        <!--<div size="small" class="upload_btn">-->
          <!--<div style="height:40px"></div>-->
          <!--<i class="iconfont icon-jiahao"></i>-->
          <!--&lt;!&ndash;<p style="line-height:0">点击上传</p>&ndash;&gt;-->
          <!--<el-button type="primary">上传图片<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
        <!--</div>-->
      <!--</el-upload>-->



    </div>
  </div>
</template>

<script>

// import VueResource from 'vue-resource';
// import editor from "vue-html5-editor"
// import {getSource, getSources, getJson} from "./api"
  export default {
    name: 'upload',
    props: ['defaultimg'],
    data () {
      return {
        AccessKeyId:'',
        AccessKeySecret:'',
        SecurityToken:'',
        region: 'oss-cn-hangzhou',
        bucket: 'image-consultant',
        id: 'upload',
        percentage: 0,
        aliOssUrl:'https://image-consultant.oss-cn-hangzhou.aliyuncs.com/',
        url:'',
        urls:[],
        getToken:{
           sign:'',
        }
      }
    },
    methods:{
    async  doUpload () {

        console.log("开始调用了++++++++++++++++++++++");
        const _this = this;
        const urls = [];

        // let result = await getSources("/testCenter/aliOssToken/getOssToken", `id=1`);

        var params = new URLSearchParams();
        params.append('id', "1");
        this.$axios.post("/api/testCenter/aliOssToken/getOssToken",params).then((response) => {
          if (response.status === 200) {
            console.log("******************"+response.data);
            this.AccessKeyId = response.data.AccessKeyId;
            this.AccessKeySecret = response.data.AccessKeySecret;
            this.SecurityToken = response.data.SecurityToken;


            const client = new OSS.Wrapper({
              region: _this.region,
              accessKeyId: this.AccessKeyId,
              accessKeySecret: this.AccessKeySecret,
              stsToken: this.SecurityToken,
              bucket: _this.bucket
            })
            _this.percentage = 0;
            console.log("========"+this.AccessKeyId+"========");
            const files = document.getElementById(_this.id)
            console.log("========"+files+"++++++++++=========");
            if (files.files) {

              const fileLen = document.getElementById(_this.id).files
              let resultUpload = ''
              for (let i = 0; i < fileLen.length; i++) {
                const file = fileLen[i]
                // 随机命名
                let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()

                // 上传
                client.multipartUpload(random_name, file, {
                  progress: function* (percentage, cpt) {
                    // 上传进度
                    _this.percentage = percentage
                  }
                }).then((results) => {
                  // 上传完成
                  const url = _this.aliOssUrl+ results.name;

                  // _this.$store.dispatch("changeUrl", _this.url);
                  _this.url = url;
                  console.log(_this.url+"^^^^^^^^^^^^^^^^^^^^^^^^"+ results.name);
                  // _this.$dispatch('changeRelatePicSrc', results.name);
                  let data = {
                    headPortraitUrl: results.name
                  };
                  this.$emit('changeHeadPortraitUrl',data);
                }).catch((err) => {
                  console.log("========================"+err+"===========================")
                })
              }
            }


          } else {
            return {msg: "抱歉，服务器错误"}
          }
        }).catch((error) => {
          return Promise.reject({msg: error.message})
        })

        },

    // 随机生成文件名
    random_string(len) { 　　len = len || 32; 　　
     var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　　
     var maxPos = chars.length; 　　
     var pwd = ''; 　　
     for (let i = 0; i < len; i++) { 　　
       pwd += chars.charAt(Math.floor(Math.random() * maxPos));
     }
     return pwd;
    }
  },
  }



</script>

<style scope>
  .oss_file {
    height: 120px;
    width: 180px;
    /* border-radius: 50%; */
    /* background: red; */

}
.oss_file img{

  height: 90px;
  width:160px;
   /* margin-top: -20px; */
   /* width:100%; */
   display: inline-block;
   /* float: right; */
}
.oss_file input {
   right: 0;
   top: 0;
   opacity: 1;
   filter: alpha(opacity=1);
   cursor: pointer;
   width: 100%;
   /* height: 100%; */
}
</style>
