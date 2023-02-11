<template>
  <q-card flat bordered class="q-mb-sm">
    <q-card-section>
      <q-skeleton type="text"/>
      <q-skeleton type="text"/>
    </q-card-section>
    <q-card-actions>
      <q-skeleton type="circle" size="26px"/>
      <q-space/>
      <q-skeleton type="circle" size="26px"/>
    </q-card-actions>
  </q-card>
</template>

<script>

export default {
  name: 'BlockLoader',
};

</script>
