<template lang="html">
  <div class="table-content" >
    <br><br>
    <span style="color: red;margin-right: 10px">*</span>咨询师名字：
    <el-input
      placeholder="请输入咨询师名字"
      v-model="consultantName" style="width: 30%">
    </el-input>

    <br><br><br><br>


    <div style="display:flex">
      <label><span style="color: red;margin-right: 10px">*</span>上传咨询师头像：</label>

      <div>
        <alioss  @changeHeadPortraitUrl="changeHeadPortraitUrl"  :defaultimg="headPortraitUrl"></alioss>
        <p>请上传宽高比例为16:9的图片</p>
      </div>
    </div>


<br><br>

    <div class="linkage">
      地区：
      <el-select
        v-model="sheng"
        @change="choseProvince"
      placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
      </el-select>
      <el-select
        v-model="shi"
        @change="choseCity"
        placeholder="市级地区">
        <el-option
          v-for="item in shi1"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <!--<el-select-->
        <!--v-model="qu"-->
        <!--@change="choseBlock"-->
        <!--placeholder="区级地区">-->
        <!--<el-option-->
          <!--v-for="item in qu1"-->
          <!--:key="item.id"-->
          <!--:label="item.value"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
    </div>

    <br><br><br><br>


    <!--<div class="linkage">-->
      <!--领域：-->
      <!--<el-select-->
        <!--v-model="consultingField"-->
        <!--@change="chooseConsultingField"-->
        <!--placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in consultingFieldOptions"-->
          <!--:key="item.id"-->
          <!--:label="item.value"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select-->
        <!--v-model="consultingFieldDetail"-->
        <!--@change="chooseConsultingFieldDetail"-->
        <!--placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in consultingFieldDetailOptions"-->
          <!--:key="item.id"-->
          <!--:label="item.value"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
    <!--</div>-->


    <div style="display: flex">
        <div>领域：</div>
        <div>
            <!--领域-->
            <div style="display: flex" v-for="item in consultingFieldList">
                 <!--领域详情-->
              <div>{{item.name}}：</div>
              <el-checkbox-group v-model="checkFieldDetailIdList">
                      <el-checkbox  v-for="item2 in item.consultingFieldDetailList"  :checked="item2.checked"  :label="item2.id"  >{{item2.name}}</el-checkbox>
              </el-checkbox-group>
              <br><br><br>
            </div>
        </div>


    </div>





    <!--<el-select v-model="value" placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select v-model="value" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <br><br><br>
        咨询方式：
        <el-select v-model="consultationMethodValue" placeholder="咨询方式">
            <el-option
              v-for="item in consultationMethodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <br><br><br><br>
          价格：
          <el-select v-model="priceValue" placeholder="价格">
              <el-option
                v-for="item in priceOptions"
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
        v-model="telephone" style="width: 30%">
      </el-input>
<br><br><br><br>
  受训经历：
  <br><br>
  <el-input
    type="textarea"
    :autosize="{ minRows: 3}"
    placeholder="请输入内容"
    v-model="experienceOfTraining">
  </el-input>



<br>
<br>
    <el-button type="primary" @click="insertOrUpdateConsultant" >
          {{this.operation}}
      <!--<i class="el-icon-circle-plus-outline el-icon&#45;&#45;right"></i>-->
    </el-button>


<br>

  </div>


</template>

<script>
 import { quillEditor } from 'vue-quill-editor' //调用编辑器
 import alioss from "../../alioss.vue"
export default {

    data() {
        return {
          mapJson:'../static/json/map.json',
          province:'',
          sheng: '',
          shi: '',
          shi1: [],
          qu: '',
          qu1: [],
          city:'',
          block:'',
          textarea: '',

          provinceName: '',
          cityName: '',
          id:null,
          consultantName:'',
          consultant:null,
          operation:null,
          headPortraitUrl: "",
          telephone: "",
          experienceOfTraining: "",
          consultingFieldList:null,
          consultingFieldOptions: '',
          consultingField: '',
          checkFieldDetailIdList:[],
          consultingFieldDetailOptionsTemp: '',
          consultingFieldDetailOptions: [],
          consultingFieldDetail: '',
          consultationMethodOptions: [
            {
              value: '1',
              label: '语音'
            },
            {
              value: '2',
              label: '视频'
            },
            {
              value: '3',
              label: '面对面'
            },
            {
              value: '4',
                label: '视频/当面'
            }],
          consultationMethodValue:'',
          priceOptions: [
            {
              value: '50',
              label: '50'
            },
            {
              value: '100',
              label: '100'
            },
            {
              value: '200',
              label: '200'
            },
            {
              value: '300',
              label: '300'
            },
            {
              value: '400',
              label: '400'
            },
            {
              value: '500',
              label: '500'
            },
            {
              value: '600',
              label: '600'
            },
            {
              value: '700',
              label: '700'
            },
            {
              value: '800',
              label: '800'
            },
            {
              value: '900',
              label: '900'
            },
            {
              value: '1000',
              label: '1000'
            }],
          priceValue:'',
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
    created:function(){
       this.operation = this.$route.query.operation;
       this.id = this.$route.query.id;
       this.getCityData();
       this.getConsultantFieldAndDetail();
    },
    beforeMount() {
      var params = new URLSearchParams();
      if(this.id>0){
        params.append('id', this.id);
        return this.$axios.post("/api/consultantCenter/consultant/getConsultantById",params).then((response) => {
        // return this.$axios.post("/api/consultant/getConsultantById",params).then((response) => {
            if (response.status === 200) {
            this.consultantName = response.data.consultant.name;
            this.headPortraitUrl = response.data.consultant.headPortraitUrl;
            this.telephone = response.data.consultant.telephone;
            this.experienceOfTraining = response.data.consultant.experienceOfTraining;
            if(response.data.consultant.consultationMethod){
              this.consultationMethodValue = response.data.consultant.consultationMethod+"";
            }
            if(response.data.consultant.price){
              this.priceValue = response.data.consultant.price+"";
            }
            if(response.data.consultant.province){
              this.sheng = response.data.consultant.province+"";
              this.provinceName = response.data.consultant.province+"";
            }
            if(response.data.consultant.city){
              this.shi = response.data.consultant.city+"";
              this.cityName = response.data.consultant.city+"";
            }

          } else {
            return {msg: "抱歉，服务器错误"}
          }
        }).catch((error) => {
          return Promise.reject({msg: error.message})
        })

      }

    },
    methods:{


      changeHeadPortraitUrl(data) {
        this.headPortraitUrl = data.headPortraitUrl;
        console.log(this.headPortraitUrl+"!!!!!!!!!!!!!!!")
      },
      insertOrUpdateConsultant(val) {
        var params = new URLSearchParams();
        if(this.id>0){
          params.append('id', this.$route.query.id);
        }
        params.append('operation', this.operation);
        params.append('name', this.consultantName);
        params.append('headPortraitUrl', this.headPortraitUrl);
        params.append('telephone', this.telephone);
        params.append('experienceOfTraining', this.experienceOfTraining);
        params.append('consultationMethod', this.consultationMethodValue);
        params.append('price', this.priceValue);
        params.append('province', this.provinceName);
        params.append('city', this.cityName);
        params.append('checkFieldDetailIdList', this.checkFieldDetailIdList);

        // params.append('pageIndex', this.currentPage);
        // params.append('pageSize', this.pageSize);
        return this.$axios.post("/api/consultantCenter/consultant/insertOrUpdateConsultant",params).then((response) => {
        // return this.$axios.post("/api/consultant/insertOrUpdateConsultant",params).then((response) => {
          if (response.status === 200) {
            this.$router.push({
              path:'consultantList',
              query:{

              }
            })
          } else {
            return {msg: "抱歉，服务器错误"}
          }
        }).catch((error) => {
          return Promise.reject({msg: error.message})
        })

      },

      // 加载咨询领域数据
      getConsultantFieldAndDetail:function(){
        var that = this;
        var params = new URLSearchParams();
        if(this.id){
          params.append('consultantId', this.id);
        }
        this.$axios.post("/api/consultantCenter/consultingField/getConsultantFieldAndDetail",params).then((response) => {
          if (response.status === 200) {
            this.consultingFieldList = response.data.consultingFieldList

            // var data = response.data
            // that.consultingFieldOptions = []
            // that.consultingFieldDetailOptionsTemp = []
            //
            // var consultingFieldList = data.consultingFieldList
            //
            // // 领域组合
            // for(var i = 0;i<consultingFieldList.length;i++){
            //   var consultingField = consultingFieldList[i];
            //   that.consultingFieldOptions.push({id: consultingField.id, value: consultingField.name, children: []})
            //   var consultingFieldDetailList = consultingField.consultingFieldDetailList;
            //   for(var j = 0;j<consultingFieldDetailList.length;j++){
            //     var consultingFieldDetail = consultingFieldDetailList[j];
            //     that.consultingFieldDetailOptionsTemp.push({
            //         id: consultingFieldDetail.id,
            //         value: consultingFieldDetail.name,
            //         children: [],
            //         consultingFieldId: consultingFieldDetail.consultingFieldId
            //     })
            //
            //   }
            // }
            //
            // // 分拆领域
            // for (var i in that.consultingFieldOptions) {
            //     for (var j in that.consultingFieldDetailOptionsTemp) {
            //
            //       if (that.consultingFieldOptions[i].id == that.consultingFieldDetailOptionsTemp[j].consultingFieldId) {
            //         that.consultingFieldOptions[i].children.push(that.consultingFieldDetailOptionsTemp[j])
            //         var length = that.consultingFieldOptions[i].children.length;
            //         console.log("======="+length+"========"+that.consultingFieldOptions[i].children[length-1].value);
            //       }
            //     }
            // }

          } else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选领域
      chooseConsultingField:function(e) {
        for (var i in this.consultingFieldOptions) {
          if (e === this.consultingFieldOptions[i].id) {
            this.consultingFieldDetailOptions = this.consultingFieldOptions[i].children
            this.consultingFieldDetail = this.consultingFieldOptions[i].children[0].value
            // this.provinceName = this.province[index2].value
            // this.cityName = this.province[index2].children[0].value
          }
        }
      },
      // 选领域详情
      chooseConsultingFieldDetail:function(e) {
        for (var i in this.consultingFieldDetailOptions) {
          if (e === this.consultingFieldDetailOptions[i].id) {

            // this.cityName = this.city[index3].value
          }
        }
      },

      // 加载china地点数据，三级
      getCityData:function(){
        var that = this;
        this.$axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
            this.provinceName = this.province[index2].value
            this.cityName = this.province[index2].children[0].value
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
            this.cityName = this.city[index3].value
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },


    },
    components: {
      alioss
    },
    computed:{

    }
}
</script>

<style lang="css">
</style>
