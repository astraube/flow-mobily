<template>
  <div>
    <q-dialog :value="isOpen" @change="emitChange" persistent>
      <q-card style="width: 60vw; max-width: 90vw;">
        <q-card-section>
          <div class="row items-center">
            <div class="text-h5">Editar projeto</div>
            <q-space/>
            <q-btn flat round dense icon="close" @click="cancelUpdating"/>
          </div>
        </q-card-section>

        <q-separator/>

        <ProjectData v-if="isOpen"
                     v-model="newDataModel"
                     :project="newDataModel"
                     @updating-block="changeUpdatingBlock"
        />

        <q-card-actions class="q-px-md q-pb-md" align="right">
          <q-btn flat label="Cancelar" color="grey" @click="cancelUpdating" :disable="isSaving"/>
          <q-btn
            flat
            label="Atualizar"
            color="primary"
            :disable="insertedDataIsNotValid"
            :loading="isSaving"
            @click="onUpdate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <BlockEditionDialog
      v-if="dialogBlock"
      :open="dialogBlock"
      @change="changeUpdatingBlockState"
    />
  </div>
</template>

<script>

  import {mapState} from "vuex";

  const storeName = 'projects';

  import ProjectData from './project-data'
  import BlockEditionDialog from "components/dashboard/steps/block/block-edition-dialog";

  export default {
    name: 'DialogUpdate',
    components: {
      ProjectData,
      BlockEditionDialog
    },
    props: {
      open: {
        type: Boolean,
        required: true,
      },
      project: {
        type: Object,
        required: false,
        default: null,
      },
    },
    data: () => ({
      newDataModel: {},
      dialogBlock: false,
      isOpen: false,
    }),
    computed: {
      ...mapState(storeName, ['projects', 'savingProject', 'currentProject']),
      insertedDataIsNotValid() {
        return !this.newDataModel || !this.newDataModel.title;
      },
      isSaving() {
        return this.savingProject
      },
    },
    created() {
      this.newDataModel = (this.project !== null && this.project !== undefined) ? { ...this.project } : { ...this.currentProject };
      this.isOpen = this.open;
    },
    methods: {
      emitChange() {
        console.log('emitChange')
        this.$emit('change', this.isOpen);
      },
      cancelUpdating() {
        Object.assign(this.$data, this.$options.data());
        this.$emit('change', false);
      },
      onUpdate() {
        this.$store.dispatch('projects/updateProject', this.newDataModel).then(this.cancelUpdating);
      },

      setUpdatingModel(model) {
        this.$store.commit('blocks/setCurrentBlock', model);
        this.dialogBlock = (model != null);
      },
      changeUpdatingBlock(blockToUpdate) {
        this.setUpdatingModel(blockToUpdate)
      },
      changeUpdatingBlockState(isUpdating) {
        console.log('changeUpdatingBlockState:' , isUpdating)
        if (!isUpdating) {
          this.setUpdatingModel( null )
        } else {
          this.dialogIsOpen = isUpdating;
        }
      },
    },
    watch: {
      open(newValue) {
        if (newValue !== this.isOpen) {
          this.isOpen = newValue;
        }
      },
      project(newValue) {
        this.newDataModel = { ...newValue };
      },
    },
  };

</script>
