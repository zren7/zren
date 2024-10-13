<script lang="ts" setup>
defineOptions({ name: 'Home' })

let projects = reactive<any>([])
const getProject = () => {
  const data = [
    {
      name: 'ruoyi-vue-pro',
      icon: 'akar-icons:github-fill',
      message: 'https://github.com/YunaiV/ruoyi-vue-pro',
      personal: 'Spring Boot 单体架构',
      time: new Date()
    },
    {
      name: 'yudao-ui-admin-vue3',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-vue3',
      personal: 'Vue3 + element-plus',
      time: new Date()
    },
    {
      name: 'yudao-ui-admin-vben',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-vben',
      personal: 'Vue3 + vben(antd)',
      time: new Date()
    },
    {
      name: 'yudao-cloud',
      icon: 'akar-icons:github',
      message: 'https://github.com/YunaiV/yudao-cloud',
      personal: 'Spring Cloud 微服务架构',
      time: new Date()
    },
    {
      name: 'yudao-ui-mall-uniapp',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-uniapp',
      personal: 'Vue3 + uniapp',
      time: new Date()
    },
    {
      name: 'yudao-ui-admin-vue2',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-vue2',
      personal: 'Vue2 + element-ui',
      time: new Date()
    }
  ]
  projects = Object.assign(projects, data)
}

getProject()
</script>

<template>
  <div>
    <el-card shadow="never">
      <el-row>
        <el-col
          v-for="(item, index) in projects"
          :key="`card-${index}`"
          :xl="8"
          :lg="8"
          :md="8"
          :sm="24"
          :xs="24"
        >
          <el-card shadow="hover" class="mr-5px mt-5px">
            <div class="flex items-center">
              <Icon :icon="item.icon" :size="25" class="mr-8px" />
              <span class="text-16px">{{ item.name }}</span>
            </div>
            <div class="mt-12px text-9px text-gray-400">{{ item.message }}</div>
            <div class="mt-12px flex justify-between text-12px text-gray-400">
              <span>{{ item.personal }}</span>
              <span>{{ item.time }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
