<template>
  <q-dialog :value="isOpen" @change="emitChange" persistent>
    <q-card style="width: 900px; max-width: 90vw;">
      <q-card-section class="q-pb-none">
        <div class="row items-center">
          <EditableTextInput
            class="text-h5 text-bold"
            :value="(newDataModel && newDataModel.name) || 'Nome'"
            @change="changeName"
          />
          <q-space/>
          <q-btn flat round dense icon="close" @click="cancelUpdatingBlock"/>
        </div>
          <EditableTextInput
            class="text-grey"
            :value="(newDataModel && newDataModel.description) || 'Descrição'"
            @change="changeDescription"
          />
      <q-separator/>
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="row no-wrap block-content-area">
          <div class="col-sm-12 col-md-10">
            <Activity :block="newDataModel"/>
            <Comment
              class="q-mb-none q-pr-md comment-area"
              :block="newDataModel"
              :rules="rules.comment"
            />
          </div>
          <div class="col-12 col-md-2">
            <DueDays class="q-mb-md" :days="newDataModel.dueDays" size="sm" @change="onChangeDueDays"/>
            <Upload
              :block="newDataModel"
              :rules="rules.upload"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-px-md q-pb-md">
        <q-btn
          class="full-width"
          label="Ok"
          color="primary"
          :loading="isSavingBlock"
          @click="cancelUpdatingBlock"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import Upload from './upload.vue';
import Comment from './comment.vue';
import Activity from './activity.vue';
import EditableTextInput from '../../../core/editable-text-input.vue';
import DueDays from '../../../core/due-days';

export default {
  name: 'BlockEditionDialog',
  components: {
    Upload,
    Comment,
    Activity,
    EditableTextInput,
    DueDays,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    block: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    isOpen: false,
    uploadedFilesAreValid: false,
    newDataModel: {},
  }),
  created() {
    this.newDataModel = (this.block !== null && this.block !== undefined) ? { ...this.block } : { ...this.$store.state.blocks.currentBlock };
    this.isOpen = this.open;
  },
  computed: {
    isSavingBlock() {
      return this.$store.state.blocks.savingBlock
    },
    rules() {
      const object = this.$store.state.steps.steps.find(({ id }) => id === this.newDataModel.stepId);
      return object ? object : {};
    },
    allInsertedDataAreNotValid() {
      return !this.uploadedFilesAreValid;
    },
  },
  methods: {
    emitChange() {
      this.$emit('change', this.isOpen);
    },
    changeName(newValue) {
      const saveData = Object.assign(this.newDataModel, {
        name: newValue,
      });
      this.$store.dispatch('blocks/updateBlock', saveData);
    },
    changeDescription(newValue) {
      const saveData = Object.assign(this.newDataModel, {
        description: newValue,
      });
      this.$store.dispatch('blocks/updateBlock', saveData);
    },
    onChangeDueDays(newValue) {
      const saveData = Object.assign(this.newDataModel, {
        dueDays: newValue,
      });
      this.$store.dispatch('blocks/updateBlock', saveData);
    },
    cancelUpdatingBlock() {
      Object.assign(this.$data, this.$options.data());
      this.$emit('change', false);
    },
    updateUploadedFilesValidity(newValue) {
      this.uploadedFilesAreValid = newValue;
    },
  },
  watch: {
    open(newValue) {
      if (newValue !== this.isOpen) {
        this.isOpen = newValue;
      }
    },
    block(newValue) {
      this.newDataModel = { ...newValue };
    },
  },
};

</script>

<style lang="scss" scoped>

@media (max-width: 1023px) {
  .block-content-area {
    flex-wrap: wrap;
  }
  .comment-area {
    padding-right: 0;
  }
}

</style>
