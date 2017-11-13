<template>
    <div class="filter-box">
        <div class="selected-condations clearfix">
            <div class="left-title">已选条件 : </div>
            <div class="right-area">
                <p class="selected-item" v-if="selected_range_item!='不限'">
                    {{selected_range_item}} 
                    <span class="clear-selected" @click="clearRange">X</span>
                </p>
                <p class="selected-item" v-if="selected_area_item!='不限'">
                     {{selected_area_item}} 
                    <span class="clear-selected" @click="clearArea">X</span>
                    </p>
            </div>
        </div>
         <div class="condations-box">
            <major-range :major-range-list="$store.state.major_range_obj"></major-range>
            <school-range :school-range-list="$store.state.school_range_obj"></school-range>
            <school-area :school-area-list="$store.state.school_area_obj"></school-area>
        </div>
        <div class="remind">*科目比例：要求所选选考科目的专业总数/条件范围内专业总数。以专业为例：经济统计学专业历史所占比例为66.7%，意为选考历史，66.7%的经济统计学专业均可报考。</div>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_left_list"></tab-view>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_right_list"></tab-view>
        <div class="clearfix"></div>
        <div class="table">
            <table-wrap :title="table_title">
                <table-row v-for="(x,i) in row_list" :row="x" :key="i"></table-row>
            </table-wrap>
        </div>
  </div>
</template>
<script>
import school_range from "../compontent/school_range";
import school_area from "../compontent/school_area";
import major_range from "../compontent/major_range";
import { mapMutations } from "vuex";
import tab_view from "../compontent/table_view";
import table_wrap from "../compontent/table_wrap";
import table_row from "../compontent/table_row";
export default {
  data: function() {
    return {
      tab_title: [],
      tab_left_list: [],
      tab_right_list: [],
      table_title: [],
      row_list: []
    };
  },
  computed: {
    selected_range_item: function() {
      return this.$store.getters.selected_range;
    },
    selected_area_item: function() {
      return this.$store.getters.selected_area;
    },
    major_range_item: function() {
      return this.$store.getters.major_range;
    }
  },
  components: {
    "school-range": school_range,
    "school-area": school_area,
    "major-range": major_range,
    "tab-view": tab_view,
    "table-wrap": table_wrap,
    "table-row": table_row
  },
  created: function() {
    let vm = this;
    this.$http.get("src/server/schoolRangeArea.json").then(res => {
      let range_data = res.data.list.school_range.map((value, index) => {
        return index == 0
          ? {
              value: value,
              selected: true
            }
          : {
              value: value,
              selected: false
            };
      });
      vm.$store.commit("update_school_range", range_data);
    });
    this.$http.get("src/server/schoolRangeArea.json").then(res => {
      let area_data = res.data.list.school_area.map((value, index) => {
        return index == 0
          ? {
              value: value,
              selected: true
            }
          : {
              value: value,
              selected: false
            };
      });
      vm.$store.commit("update_school_area", area_data);
    });
    this.$http.get("src/server/schoolRangeArea.json").then(res => {
      let major_data = res.data.list.major_range.map((value, index) => {
        return index == 0
          ? {
              value: value,
              selected: true
            }
          : {
              value: value,
              selected: false
            };
      });
      vm.$store.commit("update_major_range", major_data);
    });
    this.$http.get("src/server/general.json").then(function(res) {
      vm.tab_title = res.data.result.title;
      var tab_list = res.data.result.analysisData;
      var left_arr = [];
      tab_list.forEach((value, index) => {
        if (index < tab_list.length / 2) {
          left_arr[index] = value;
        }
      });
      vm.tab_left_list = left_arr;
      var right_arr = [];
      var s = 0;
      tab_list.forEach((value, index) => {
        if (index >= tab_list.length / 2) {
          right_arr[s] = value;
          s++;
        }
      });

      // 根据大学数据
      vm.tab_right_list = right_arr;
      vm.college_title = res.data.result.title;
      vm.college_detail = res.data.result.rows;
    });
    this.$http.get("src/server/overall.json").then(res => {
      vm.table_title = res.data.result.title;
      vm.row_list = res.data.result.rows;
    });
  },
  methods: {
    clearRange: function() {
      this.$store.commit("clear_range");
    },
    clearArea: function() {
      this.$store.commit("clear_area");
    }
  }
};
</script>
<style>
.clearfix {
  clear: both;
  display: table;
  content: "";
}
.filter-box {
  width: 100%;
  margin: 10px auto;
}

.left-title,
.right-area {
  float: left;
  box-sizing: border-box;
}

.left-title {
  margin: 5px 0;
  text-indent: 10px;
  flex: 0.8;
}

.right-area {
  flex: 9.2;
}

.selected-item {
  margin: 0;
  padding: 0 5px;
  display: inline-block;
  border: 1px solid #ccc;
}

.clear-selected {
  cursor: pointer;
}

.selected-condations {
  padding: 10px;
  line-height: 35px;
  display: flex;
}

.condations-box {
  border: 1px solid #ccc;
  padding: 10px;
  line-height: 35px;
}

.filter-item {
  display: inline-block;
  min-width: 70px;
  padding: 0 5px;
  height: 35px;
  color: #333;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  margin: 5px;
}

.filter-item.selected {
  background: rgba(0, 160, 92, 1);
  color: #fff;
}

.filter-item:hover {
  background: rgba(0, 160, 92, 1);
  color: #fff;
}
.tab_list {
  float: left;
}
.wrap {
  padding: 5px;
  font-size: 15px;
  border: 1px solid #ccc;
}
.select_title span {
  display: inline-block;
  padding: 5px;
}
.select_title div {
  display: inline-block;
}
.select_title div span {
  display: inline-block;
  padding: 5px;
}
.select_wrap > div {
  line-height: 1.3;
  margin-top: 5px;
}
.remind {
  color: #f00;
}
.tab_container table {
  float: left;
}
.clearfix {
  clear: both;
}
.table table{
    width: 100%;
    text-align:center;
}
.table td{
    padding:8px 0;
}
.table tr{}
</style>

