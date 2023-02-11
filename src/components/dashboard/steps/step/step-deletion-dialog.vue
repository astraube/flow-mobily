<template>
  <q-dialog :value="isOpen" @change="emitChange" persistent>
    <q-card>
      <q-card-section>
        Certeza que deseja excluir o Passo <b>"{{ stepName }}"</b>?
      </q-card-section>
      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn flat label="Não" color="grey" @click="cancelDeletingStep" :disable="isDeletingStep"/>
        <q-btn flat label="Sim, excluir" color="red" :loading="isDeletingStep" @click="deleteStep"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'StepUpdateDialog',
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
    isOpen: false,
    stepName: '',
  }),
  computed: {
    step() {
      return this.$store.state.steps.steps.find(({ id }) => id === this.stepId);
    },
    insertedDataIsNotValid() {
      return !this.step || !this.step.name || !this.step.name.length;
    },
    isDeletingStep() {
      return this.$store.state.steps.deletingStep;
    },
  },
  created() {
    this.stepName = this.step.name;
    this.isOpen = this.open;
  },
  methods: {
    emitChange() {
      this.$emit('change', this.isOpen);
    },
    cancelDeletingStep() {
      this.$emit('change', false);
    },
    deleteStep() {
      this.$store.dispatch('steps/deleteStep', this.stepId).then(this.cancelDeletingStep);
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
