<template>
  <div class="major-range clearfix">
                        <div class="left-title">专业层次 : </div>
                        <div class="right-area">
                                <filter-item v-for="(value,index) in majorRangeList" :range-object="value" :key="index" :index="index" :catagory="'专业层次'"></filter-item>
                        </div>
                    </div>
</template>
<script>
import filter_item from "./filer_item";
export default {
  props: {
    majorRangeList: {
      required: true,
      type: Array
    }
  },
  components: {
    "filter-item": filter_item
  }
};
</script>
<style scoped>
.major-range {
  display: flex;
}
.filter-item.selected.add {
  background: rgba(102, 204, 153, 1);
  color: #fff;
}
</style>