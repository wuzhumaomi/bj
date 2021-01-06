<template>
  <project-detail :view-mode="'create'"/>
</template>

<script>
import ProjectDetail from './components/detail'

export default {
  name: 'CreateOrder',
  components: { ProjectDetail }
}
</script>
