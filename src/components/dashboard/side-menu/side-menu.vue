<template>
  <q-drawer :width="193" v-model="isOpen" @input="emitChange" content-class="side-menu bg-primary">
    <q-list class="q-py-lg side-menu-list">
      <q-item-label header class="text-white text-bold q-mb-md text-center">
        {{ $q.config.appName.toUpperCase() }}
      </q-item-label>

      <SideMenuItem title="Dashboard" icon="dashboard" path="/dashboard" :isAdmin="true"/>
      <SideMenuItem title="Calendario" icon="event_note" path="/calendar"/>
      <SideMenuItem title="Usuários" icon="supervisor_account" path="/user-list" :isAdmin="true"/>
      <SideMenuItem title="Clientes" icon="supervisor_account" path="/client-list" :isAdmin="true"/>
      <SideMenuItem title="Projetos" icon="supervisor_account" path="/project-list" :isAdmin="true"/>

      <GroupsList/>

    </q-list>
  </q-drawer>
</template>

<script>

import GroupsList from './groups-list.vue';
import SideMenuItem from "./side-menu-item";

export default {
  name: 'SideMenu',
  components: {
    GroupsList,
    SideMenuItem,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isOpen: true,
  }),
  methods: {
    emitChange(newValue) {
      this.$emit('change', newValue);
    },
  },
  watch: {
    open(newValue) {
      if (newValue !== this.isOpen) {
        this.isOpen = newValue;
      }
    },
  },
};
</script>

<style lang="scss">

aside.q-drawer {
  background: transparent;
}

.side-menu {
  border-top-right-radius: 2.5em;
  border-bottom-right-radius: 2.5em;

  .q-focus-helper {
    z-index: 2;
  }

  .side-menu-list {
    // padding-left: 1.5em;
  }
}

</style>
