<template>
    <div class="container route">
        <p class="remind">*由于2020年拟在京招生普通高校专业（类）选考科目范围尚未公布，暂时调用2018年拟在浙招生普通高校专业（类）选考科目范围，该数据仅供参考，正式文件公布后会即时替换！</p>
        <ul class="tab">
            <router-link :to="{name:'overall'}" class="tab-item" tag="li">综合检索</router-link>
            <router-link :to="{name:'college'}" class="tab-item" tag="li">高校检索</router-link>
            <router-link :to="{name:'major'}" class="tab-item" tag="li">专业检索</router-link>
           
        </ul>
         <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.container {
  font-size: 16px;
  min-width: 960px;
  max-width:96%;
  margin: 0 auto;
}
.remind {
  color: red;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 0;
}
.route {

}
.tab{
    font-size: 0;
    border-bottom: 1px solid #ccc;
} 
.tab-item {
    font-size: 14px;
    display: inline-block;
    min-width: 70px;
    padding: 0 5px;
    height: 35px;
    color: #333;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
}
.router-link-active,.tab-item:hover {
  background: rgba(0, 160, 92, 1);
  color: #fff;
}
</style>


