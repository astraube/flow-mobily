<template>
  <q-dialog :value="isOpen" @change="emitChange" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Atualizar dados da etapa</div>
          <q-space/>
          <q-btn flat round dense icon="close" @click="cancelUpdatingStep"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input dense outlined bottom-slots required :label="labelName" v-model="newStep.name">
          <template v-slot:prepend>
            <q-icon name="text_fields"/>
          </template>
        </q-input>
        <q-input
          dense
          outlined
          bottom-slots
          required
          :label="labelDescription"
          v-model="newStep.description"
        >
          <template v-slot:prepend>
            <q-icon name="short_text"/>
          </template>
        </q-input>
        <DueDays class="q-mb-md" :days="newStep.dueDays" align="left" @change="onChangeDueDays"/>
        <q-checkbox v-model="newStep.isPossibleCreateBlock" label="Permitir adição de Projetos"/>
      </q-card-section>
      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn
          flat
          label="Cancelar"
          color="grey"
          @click="cancelUpdatingStep"
          :disable="isUpdatingStep"
        />
        <q-btn
          flat
          label="Atualizar"
          color="primary"
          :disable="insertedDataIsNotValid"
          :loading="isUpdatingStep"
          @click="updateStep"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import DueDays from 'components/core/due-days';

export default {
  name: 'StepUpdateDialog',
  components: {
    DueDays,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    stepId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    labelName: 'Nome da etapa',
    labelDescription: 'Descrição da etapa',
    labelSelectDueDate: '(Opcional)',
    isOpen: false,
    newStep: {},
  }),
  computed: {
    step() {
      return this.$store.state.steps.steps.find(({ id }) => id === this.stepId);
    },
    insertedDataIsNotValid() {
      return !this.step || !this.step.name || !this.step.name.length;
    },
    isUpdatingStep() {
      return this.$store.state.steps.savingBlock;
    },
  },
  created() {
    this.isOpen = this.open;
    this.newStep = { ...this.step };
  },
  methods: {
    emitChange() {
      this.$emit('change', this.isOpen);
    },
    onChangeDueDays(val) {
      this.step.dueDays = val;
    },
    cancelUpdatingStep() {
      Object.assign(this.$data, this.$options.data());
      this.$emit('change', false);
    },
    updateStep() {
      this.$store.dispatch('steps/updateStep', this.newStep).then(this.cancelUpdatingStep);
    },
  },
  watch: {
    open(newValue) {
      if (newValue !== this.isOpen) {
        this.isOpen = newValue;
      }
    },
    step(newValue) {
      this.newStep = { ...newValue };
    },
  },
};

</script>
