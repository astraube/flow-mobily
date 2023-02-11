<template>
  <q-dialog :value="isOpen" @change="emitChange" @cancel="emitCancel" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Criar nova etapa</div>
          <q-space/>
          <q-btn flat round dense icon="close" @click="emitCancel"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input dense outlined bottom-slots required :label="labelName" v-model="step.name">
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
          v-model="step.description"
        >
          <template v-slot:prepend>
            <q-icon name="short_text"/>
          </template>
        </q-input>
        <DueDays class="q-mb-md" :days="step.dueDays" align="left" @change="onChangeDueDays"/>
        <q-checkbox v-model="step.isPossibleCreateBlock" label="Permitir adição de Projetos"/>
      </q-card-section>
      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn
          flat
          label="Cancelar"
          color="grey"
          @click="emitCancel"
          :disable="this.savingStep"
        />
        <q-btn
          flat
          label="Criar"
          color="primary"
          :disable="insertedDataIsNotValid"
          :loading="this.savingStep"
          @click="onSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

  const storeName = 'steps';

  import DueDays from '../../../core/due-days';
  import {mapState} from "vuex";

  const DEFAULT_DUE_DAYS = 7;

  export default {
    name: 'StepCreationDialog',
    components: {
      DueDays,
    },
    props: {
      open: {
        type: Boolean,
        required: true,
      },
    },
    data: () => ({
      labelName: 'Nome da etapa',
      labelDescription: 'Descrição da etapa',
      isOpen: false,
      step: {
        name: '',
        description: '',
        dueDays: DEFAULT_DUE_DAYS,
        isPossibleCreateBlock: true,
      },
    }),
    computed: {
      ...mapState(storeName, ['savingStep']),
      insertedDataIsNotValid() {
        return !this.step.name.length && !this.step.description.length;
      },
    },
    created() {
      this.isOpen = this.open;
    },
    methods: {
      emitChange() {
        this.$emit('change', true);
      },
      emitCancel() {
        Object.assign(this.$data, this.$options.data());
        this.$emit('cancel', false);
        //this.$emit('change', this.isOpen);
      },
      onSave() {
        this.$emit('submit', this.step)
      },
      onChangeDueDays(val) {
        this.step.dueDays = val;
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
