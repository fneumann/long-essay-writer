<script setup>
  import {useResourcesStore} from '@/store/resources';
  import {useApiStore} from '@/store/api';

  const resourcesStore = useResourcesStore();
  const apiStore = useApiStore();

</script>

<template>
 <div class="resources">
   <div v-for="resource in resourcesStore.resources" :key="resource.key">
     <p>{{ apiStore.resourceUrl(resource.key) }}</p>
     <!--
     <object
         v-if="resource.type=='pdf'"
         v-show="resourcesStore.isActive(resource)"
         type="application/pdf"
         :data="resource.source"
          width="100%"
          height="100%">
     </object>
     -->
   </div>
 </div>
</template>


<style scoped>

div {
  height:100%;
}

</style>