<!--  -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>  
</template>
<script >
export default {
   name:'TabBar'
  };
</script>
<style>

  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* boxshadow  : 水平平移量  垂直平移量 模糊度 颜色 */
    box-shadow: 0px -1px 0.1px rgba(100, 100, 100, 0.13);
  }

</style>