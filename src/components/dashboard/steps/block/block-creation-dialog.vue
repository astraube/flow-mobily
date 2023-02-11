<template>
  <q-dialog :value="isOpen" @change="emitChange" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Criar Projeto</div>
          <q-space/>
          <q-btn flat round dense icon="close" @click="cancelCreatingBlock"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input dense outlined bottom-slots required :label="labelName" v-model="name">
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
          v-model="description"
        >
          <template v-slot:prepend>
            <q-icon name="text_fields"/>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn
          flat
          label="Cancelar"
          color="grey"
          @click="cancelCreatingBlock"
          :disable="savingBlock"
        />
        <q-btn
          flat
          label="Criar"
          color="primary"
          :disable="insertedDataIsNotValid"
          :loading="savingBlock"
          @click="createBlock"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

  const storeName = 'blocks';

  import {mapState} from "vuex";

  export default {
    name: 'BlockCreationDialog',
    props: {
      open: {
        type: Boolean,
        required: true,
      },
      stepId: {
        required: true,
      },
    },
    data: () => ({
      labelName: 'Nome do Projeto',
      labelDescription: 'Descrição do Projeto (opcional)',
      name: '',
      description: '',
    }),
    computed: {
      ...mapState(storeName, ['currentBlock', 'savingBlock']),
      insertedDataIsNotValid() {
        return !this.name.length;
      },
    },
    created() {
      this.isOpen = this.open;
    },
    methods: {
      emitChange() {
        this.$emit('change', this.isOpen);
      },
      cancelCreatingBlock() {
        Object.assign(this.$data, this.$options.data());
        this.$emit('change', false);
      },
      createBlock() {
        this.$store.dispatch('blocks/createBlock', {
          stepId: this.stepId,
          block: {
            name: this.name,
            description: this.description,
          },
        }).then((newData) => this.$store.commit('steps/setStep', newData))
          .then(this.cancelCreatingBlock);
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
