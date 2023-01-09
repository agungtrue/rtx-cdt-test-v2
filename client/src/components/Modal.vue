<template>
  <!-- <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button> -->

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// import { ref } from 'vue';

// const dialogVisible = ref(false);

export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    row: Object,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    console.info({ visible: this.visible });
  },
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
