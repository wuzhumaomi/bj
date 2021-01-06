<template>
  <project-detail :view-mode="'edit'"/>
</template>

<script>
import ProjectDetail from './components/detail'

export default {
  name: 'EditProject',
  components: { ProjectDetail }
}
</script>