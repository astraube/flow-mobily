<template>
  <div>
    <q-item v-for="loader of 5" :key="loader">
      <q-item-section avatar>
        <q-skeleton class="bg-tertiary" animation="blink" type="circle" size="26px"/>
      </q-item-section>
      <q-item-section>
        <q-skeleton class="bg-tertiary" animation="blink" type="text"/>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

export default {
  name: 'SideMenuItemLoader',
};

</script>
