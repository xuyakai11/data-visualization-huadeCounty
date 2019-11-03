<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://10.18.92.157:8082/upload"
      :limit="1"
      name="lufei"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'UpLoadFile',
  data() {
    return {
      fileList:[]
    }
  }
}
</script> 
