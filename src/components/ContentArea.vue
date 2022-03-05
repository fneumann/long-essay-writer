<script setup>
  import ContentLeft from "@/components/ContentLeft.vue";
  import ContentRight from "@/components/ContentRight.vue";
</script>

<template>
  <v-main >
    <v-container color="grey" >
      <v-row dense>
        <v-col>
          <content-left />
        </v-col>
        <v-col color="white">
          <content-right />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style>

</style>
