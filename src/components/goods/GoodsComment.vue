<template>
  <div>
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script type="text/ecmascript-6">
  import cmtbox from "../subcomponents/Comment.vue"
  export default {
    components: {
      cmtbox
    }
  }
</script>

<style lang="scss" scoped>

</style>