<template>
  <q-dialog :value="isOpen" @change="emitChange" @cancel="emitCancel" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Atualizar dados da etapa</div>
          <q-space/>
          <q-btn flat round dense icon="close" @click="emitCancel"/>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-input dense outlined bottom-slots
                 v-for="attr of attributes"
                 :required="attr.required"
                 :key="attr.prop"
                 :label="attr.label"
                 v-model="newDataModel[attr.prop]"
        >
          <template v-slot:prepend>
            <q-icon :name="attr.icon"/>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn
          flat
          label="Cancelar"
          color="grey"
          @click="emitCancel"
          :disable="this.savingClient"
        />
        <q-btn
          flat
          label="Atualizar"
          color="primary"
          :disable="insertedDataIsNotValid"
          :loading="this.savingClient"
          @click="onSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

  const storeName = 'clients';

  import {mapState} from "vuex";

  export default {
    name: 'UpdateDialog',
    props: {
      open: {
        type: Boolean,
        required: true,
      },
      model: {
        type: Object,
        required: false,
        default: null
      },
    },
    data: () => ({
      isOpen: false,
      newDataModel: {},
      attributes: [
        {
          label: "Nome Completo",
          prop: "fullName",
          icon: "text_fields",
          type: "input",
          required: true
        },
        {
          label: "E-mail",
          prop: "email",
          icon: "mail",
          type: "input",
          required: false
        }
      ]
    }),
    computed: {
      ...mapState(storeName, ['currentClient', 'savingClient']),
      insertedDataIsNotValid() {
        if (!this.newDataModel)
          return true

        let isNotValid = false

        this.attributes.forEach(attr => {
          if (attr.required === true) {
            const value = this.newDataModel[attr.prop]
            isNotValid = !value || !value.length;
            return isNotValid;
          }
        })
        return isNotValid
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
      },
      onSave() {
        this.$emit('submit', this.newDataModel)
      },
    },
    watch: {
      open(newValue) {
        if (newValue !== this.isOpen) {
          this.newDataModel = (this.model !== null) ? { ...this.model } : { ...this.currentClient };
          this.isOpen = newValue;
        }
      },
    },
  };

</script>
