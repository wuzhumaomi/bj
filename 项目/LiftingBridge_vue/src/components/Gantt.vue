<template>
  <div>
    <div ref="gantt" class="gantt-cls"></div>
  </div>
</template>
 
<script>
import 'dhtmlx-gantt'
import '../../node_modules/dhtmlx-gantt/codebase/locale/locale_cn.js'
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
  mounted: function () {
    gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks)
  }
}
</script>
 
<style>
    @import "../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
    .gantt-cls{
      height:200px;
    }
    .gantt_section_time .gantt_time_selects select{
      width: unset !important;
    }
    .gantt_cal_light select{
      width: unset !important;
    }
</style>
