<template>
    <tbody>
        <tr>
            <td v-for="(item, index) in item_row" :key='index'><span v-if="index==0" class="add" @click="table_show">{{adr}}</span>{{item}}</td>
        </tr>
        <tr>
            <td colspan='9'>
                <table class="inner-table" v-show="active">
                    <thead>
                        <tr>
                            <td>高校地区</td>
                            <td>高校名称</td>
                            <td>专业（类）</td>
                            <td>类中所含专业</td>
                            <td>远考科目范围</td>
                        </tr>
                        <tr v-for="(it, index) in item_table" :key='index'>
                            <td>{{it.province}}</td>
                            <td>{{it.collegeName}}</td>
                            <td>{{it.majorName}}</td>
                            <td>{{it.remark.join('、')}}</td>
                            <td>{{it.subjectRangeNames.join('、')}}</td>
                        </tr>
                    </thead>
                </table>
            </td> 
        </tr>
    </tbody>
</template>
<script>
export default {
    props:["row"],
    data(){
        return {
            item_row:[],
            item_table:[],
            active:false,
            adr:"+"

        }
    },
    created:function(){
        let len = this.row.length;
        this.item_row=this.row.slice(0,len-1);
        this.item_table = this.row[9];
    },
    methods:{
        table_show:function(){
            this.active=!this.active;
            if(this.active){
                this.adr="-"
            }else{
                this.adr="+"
            }
        }        
    }
}
</script>
<style scoped>
.inner-table{
    background: #f4f4f4;
    font-size: 14px;
}
.add{
    float: left;
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 20px;
    color:#fff;
    text-align: center;
    background: rgba(0,100,6,1)
}
</style>


