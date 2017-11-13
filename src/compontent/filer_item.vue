<template>
  <span class="filter-item" @click="toggle" :class="{selected:rangeObject.selected,add:rangeObject.selected}">{{rangeObject.value}}</span>
</template>
<script>
export default {
  props: {
    rangeObject: {
      type: Object,
      required: true
    },
    index: {
      required: true
    },
    catagory: {
      required: true,
      type: String
    }
  },
  methods: {
    toggle: function() {
      //   bus.$emit(this.catagory, {
      //     index: this.index,
      //     selected: !this.rangeObject.selected
      //   });
      if (this.catagory == "高校层次") {
        this.$store.commit("reset_school_range", {
          index: this.index,
          selected: !this.rangeObject.selected
        });
        return;
      }
      if (this.catagory == "高校地区") {
        this.$store.commit("reset_school_area", {
          index: this.index,
          selected: !this.rangeObject.selected
        });
        return;
      }
       if (this.catagory == "专业层次") {
        this.$store.commit("reset_major_range", {
          index: this.index,
          selected: !this.rangeObject.selected
        });
        return;
      }
    }
  }
};
</script>
<style scoped>

</style>


