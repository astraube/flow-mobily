<template>
  <q-page class="q-px-md q-mb-lg">
    <q-card class="q-ma-sm">

      <ProjectData v-model="newDataModel"
                   :project="newDataModel"
                   @updating-block="changeUpdatingBlock"
      />

      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn
          flat
          label="Atualizar"
          color="primary"
          :loading="isSaving"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>

    <BlockEditionDialog
      v-if="dialogBlock"
      :open="dialogBlock"
      @change="changeUpdatingBlockState"
    />
  </q-page>
</template>

<script>

  import ProjectData from 'src/components/dashboard/projects/project-data.vue'
  import BlockEditionDialog from "components/dashboard/steps/block/block-edition-dialog";
  import {mapState} from "vuex";

  const storeName = 'projects';

  export default {
    name: 'Project',
    components: {
      ProjectData,
      BlockEditionDialog
    },
    data: () => ({
      dialogBlock: false,
      newDataModel: {},
    }),
    created() {
      const { id } = this.$route.params
      this.newDataModel = {
        ...this.$store.state.projects.projects.find(project => project.id === id)
      }
    },
    computed: {
      ...mapState(storeName, ['projects', 'savingProject']),
      isSaving() {
        return this.savingProject
      },
      blockToUpdate() {
        return this.$store.state.blocks.currentBlock;
      }
    },
    methods: {
      onUpdate() {
        this.$store.dispatch('projects/updateProject', this.newDataModel)
      },

      changeUpdatingBlock(blockToUpdate) {
        this.$store.commit('blocks/setCurrentBlock', blockToUpdate);
        this.dialogBlock = true;
      },
      changeUpdatingBlockState(isUpdating) {
        if (!isUpdating) {
          this.$store.commit('blocks/setCurrentBlock', null);
        }
        this.dialogBlock = isUpdating;
      },
    },
  }
</script>
