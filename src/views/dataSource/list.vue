<template>
  <el-container>
    <el-main>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="数据源类型:">
          <el-select v-model="form.sourceTypeValue" clearable placeholder="请选择数据源类型" required>
            <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源名称:" style=" margin-left: 50px;">
          <el-input v-model="form.sourceName" class="input" placeholder="请输入数据源名称或代码" style="width: 220px;" />
        </el-form-item>
        <el-form-item style=" margin-left: 20px;">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" highlight-current-row style=" margin-left: 10px; margin-top: 20px;">
        <el-table-column align="center" fixed prop="id" label="id" width="50" />
        <el-table-column align="center" fixed prop="sourceName" label="数据源名称" width="120" />
        <el-table-column align="center" prop="creatorName" label="创建人" width="120" />
        <el-table-column align="center" prop="sourceTypeName" label="数据源类型" width="120" />
        <el-table-column align="center" prop="sourceCode" label="数据源代码" width="300" />
        <el-table-column align="center" prop="gmtCreate" label="创建时间" width="200" />
        <el-table-column align="center" prop="gmtModified" label="修改时间" width="200" />
        <el-table-column align="center" fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button link type="primary" size="small" @click="remove(scope.row)">删除</el-button>
            <el-button link type="primary" size="small">修改</el-button>
            <el-button link type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.currentPage"
        style=" margin-top: 10px "
        background
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, ->, prev, pager, next"
        :total="page.total"
      />
    </el-main>
  </el-container>

</template>

<script>
import { queryList, removeById, getSourceType } from '@/api/dataSource/dataSource'
export default {
  data() {
    return {
      tableData: [],
      form: {
        sourceTypeValue: '',
        options: [],
        sourceName: ''
      },
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  created() {
    this.fetchData()
    this.getOptions()
  },
  methods: {
    fetchData() {
      var data = {
        sourceType: this.form.sourceTypeValue,
        sourceName: this.form.sourceName
      }
      queryList(data).then(response => {
        this.tableData = response.data?.content
        console.log({ response })
        this.page.total = response.data?.numberOfElements
        this.page.pageSize = response.data?.size
        this.page.currentPage = response.data?.number
        console.log(this.page)
      })
    },
    getOptions() {
      getSourceType().then(response => {
        var data = response.data
        this.form.options = data.map((item) => {
          return ({
            value: item.type,
            label: item.desc
          })
        })
      })
    },
    remove(row) {
      removeById(row.id).then(response => {
        this.tableData = this.fetchData()
      })
    }
  }
}
</script>
