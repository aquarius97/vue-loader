<template>
    <div>
      <div class="info">
        <div> <input type="text" placeholder="请输入要搜索的专业名称"><span>检索</span></div>
      </div>
     	<h3>选考科目分析</h3>
      <div class="remind">*科目比例：要求所选选考科目的专业总数/条件范围内专业总数。以专业为例：经济统计学专业历史所占比例为66.7%，意为选考历史，66.7%的经济统计学专业均可报考。</div>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_left_list"></tab-view>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_right_list"></tab-view>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import tab_view from '../compontent/table_view'
    export default {
        data:function(){
            return {
              tab_title:[],
              tab_left_list:[],
              tab_right_list:[],
            }
        },
       
        created:function(){
          var _this=this;          
          this.$http("src/server/general.json").then(function(res){
            _this.tab_title=res.data.result.title;
            var tab_list=res.data.result.analysisData;
            var left_arr=[];
            tab_list.forEach((value,index)=>{
              if (index<tab_list.length/2) {
                left_arr[index]=value;
              }
            });
            _this.tab_left_list=left_arr;
            var right_arr=[];
            var s=0;
            tab_list.forEach((value,index)=>{
              if (index>=tab_list.length/2) {
                right_arr[s]=value;
                s++;
              }
            });
            
            // 根据大学数据
            _this.tab_right_list=right_arr;
            _this.college_title=res.data.result.title;
            _this.college_detail=res.data.result.rows;
          
          })
        },
        components: {
        'tab-view':tab_view
      }

    } 
</script>
<style scoped>
  .info{
    width: 500px;
    height: 41px;
    margin: 10px 0;
    background: inherit;
    background-color: rgba(0, 161, 92, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
    border-bottom: 0px;
    border-radius: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 2px 2px;
  }
  .info input{
    width: 400px;
    height: 35px;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-decoration: none;
    color: #999999;
    text-align: left;
    padding: 1px 0;
    box-sizing: border-box;
    display: inline-block;
  }
  .info span{
    width: 90px;
    display:inline-block;
    text-align: center;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: #FFFFFF;
  }
    .tab_list{
      float: left;
    }
   h3{
  margin: 10px 0;
}
    .remind{
      color: #f00;
    }
    .tab_container table{
      float: left;
    }
    .clearfix{
      clear: both;
    }
</style>

