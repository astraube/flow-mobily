<template>
  <div>
    <SideMenuItemLoader v-if="$store.state.groups.loadingGroups"/>

    <div v-else>
      <SideMenuItem v-for="group in $store.state.groups.groups"
                    :path="`/g/${group.id}`"
                    :key="group.id"
                    :title="group.name"
                    :icon="group.icon"
                    :model="group"
                    @click="onClickGroup"/>

      <div class="text-center">
        <q-btn round flat color="secondary" icon="add" @click="creatingGroup = true"/>
      </div>
    </div>
    <GroupCreationDialog :open="creatingGroup" @change="changeCreatingGroupState"/>
  </div>
</template>

<script>

  import SideMenuItemLoader from './side-menu-item-loader.vue';
  import SideMenuItem from './side-menu-item.vue';
  import GroupCreationDialog from './group-creation-dialog.vue';

  export default {
    name: 'GroupsList',
    components: {
      SideMenuItemLoader,
      SideMenuItem,
      GroupCreationDialog,
    },
    data: () => ({
      creatingGroup: false,
    }),
    methods: {
      changeCreatingGroupState(newValue) {
        this.creatingGroup = newValue;
      },

      onClickGroup(group) {
        this.$store.commit('groups/setCurrentGroup', group);
      },
    },
  };

</script>
