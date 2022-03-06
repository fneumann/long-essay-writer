<script setup>
  import Instructions from "@/components/Instructions.vue";
  import Essay from "@/components/Essay.vue";
</script>

<template>
  <v-main fill-height>
    <div class="container">
      <div class="column">
        <div class="col-header">
          <h2 class="text-h6">Aufgabenstellung</h2>
        </div>
        <div class="col-content">
          <instructions />
        </div>
        <div class="col-footer">
          left
        </div>
      </div>
      <div class="column">
        <div class="col-header">
          <h2 class="text-h6">Mein Text</h2>
        </div>
        <div class="col-content">
          <essay />
        </div>
        <div class="col-footer">
          right
          </div>
      </div>
    </div>
  </v-main>
</template>

<style scoped>


.container {
  position: fixed;
  height: calc((100% - 50px) - 50px);
  width: calc(100% - 72px);
  display: flex;
}

.column {
  width: 50%;
  flex: 1;
}

.col-header {
  height: 50px;
  width: 100%;
  padding:10px;
}

.col-content {
  height: calc(((100% - 50px)) - 50px);
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding:10px;
}


.col-footer {
  position: fixed;
  bottom: 48px;
  width: 100%;
  padding:10px;
}



</style>
