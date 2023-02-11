<template>
  <q-card flat bordered class="q-pa-sm q-mb-md">
    <q-toolbar class="rounded-borders q-mb-sm">
      <q-toolbar-title>
        <q-skeleton/>
      </q-toolbar-title>
    </q-toolbar>
    <div>
      <template v-for="block in 3">
        <BlockLoader :key="block"/>
      </template>
    </div>
  </q-card>
</template>

<script>

import BlockLoader from '../block/block-loader.vue';

export default {
  name: 'StepsLoader',
  components: {
    BlockLoader,
  },
};

</script>
