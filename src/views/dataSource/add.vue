<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="dataForm" :model="form" label-width="120px">
      <el-form-item label="数据源类型">
        <el-select v-model="form.sourceTypeValue" clearable placeholder="请选择数据源类型" required>
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据源名称" required>
        <el-input v-model="form.sourceName" class="input" placeholder="Mysql数据源" />
      </el-form-item>
      <div v-if="form.sourceTypeValue == 'mysql'">
        <el-form-item label="数据库链接地址" required>
          <el-input v-model="form.mysqlSource.url" class="input" placeholder="jdbc:log4jdbc:mysql://127.0.0.1:3306" />
        </el-form-item>
        <el-form-item label="数据库用户名" required>
          <el-input v-model="form.mysqlSource.userName" class="input" placeholder="root" />
        </el-form-item>
        <el-form-item label="数据库密码" required>
          <el-input v-model="form.mysqlSource.password" show-password class="input" placeholder="password" />
        </el-form-item>
        <el-form-item label="数据源驱动程序" required>
          <el-input v-model="form.mysqlSource.driverClassName" class="input" placeholder="net.sf.log4jdbc.sql.jdbcapi.DriverSpy" />
        </el-form-item>
        <el-form-item label="数据库名称" required>
          <el-input v-model="form.mysqlSource.projectName" class="input" placeholder="projectName" />
        </el-form-item>
      </div>
      <div v-if="form.sourceTypeValue != ''">
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">提交</el-button>
          <el-button @click="onCancel">清空</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getSourceType, saveSource } from '@/api/dataSource/dataSource'
export default {
  data() {
    return {
      form: {
        sourceTypeValue: '',
        sourceName: '',
        mysqlSource: {
          url: '',
          userName: '',
          password: '',
          driverClassName: '',
          projectName: '',
          type: ''
        },
        options: []
      },
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      var sourceProperty = {}
      if (this.form.sourceTypeValue === 'mysql') {
        sourceProperty = this.form.mysqlSource
      }
      sourceProperty.type = this.form.sourceTypeValue
      console.log({ sourceProperty })
      var data = {
        sourceType: this.form.sourceTypeValue,
        sourceName: this.form.sourceName,
        sourceProperty: sourceProperty
      }
      this.loading = true
      saveSource(data).then(response => {
        this.$message('数据源保存成功!')
        this.loading = false
        this.$router.push({
          path: '/dataSource/list'
        })
      })
    },
    onCancel() {
      this.form.mysqlSource = {}
      this.$message({
        message: '表单已清空!'
      })
    },
    fetchData() {
      getSourceType().then(response => {
        var data = response.data
        this.form.options = data.map((item) => {
          return ({
            value: item.type,
            label: item.desc
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.input{
  width: 400px;
}
</style>
