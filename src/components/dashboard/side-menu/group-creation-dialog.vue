<template>
  <q-dialog :value="isOpen" @change="emitChange" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Criar Grupo</div>
          <q-space/>
          <q-btn flat round dense icon="close" @click="cancelCreatingGroup"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="q-pb-sm text-grey-5">
          <q-input dense outlined bottom-slots required label="Nome do Grupo" v-model="group.name">
            <template v-slot:prepend>
              <q-icon name="text_fields"/>
            </template>
          </q-input>
          <q-select
            dense
            outlined
            bottom-slots
            required
            label="Ícone do grupo"
            :options="icons"
            v-model="group.icon"
          >
            <template v-slot:prepend>
              <q-icon name="insert_emoticon"/>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-card-section>
      <q-card-actions class="q-px-md q-pb-md" align="right">
        <q-btn flat label="Cancelar" color="grey" @click="cancelCreatingGroup"/>
        <q-btn
          flat
          label="Criar"
          color="primary"
          :disabled="hasInvalidData"
          :loading="savingGroup"
          @click="createGroup"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'GroupCreationDialog',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isOpen: false,
    icons: [
      {
        label: 'Notas',
        value: 'sticky_note_2',
        icon: 'sticky_note_2',
      },
      {
        label: 'Calendário',
        value: 'calendar_today',
        icon: 'calendar_today',
      },
      {
        label: 'Engrenagem',
        value: 'build',
        icon: 'build',
      },
      {
        label: 'Dados',
        value: 'timeline',
        icon: 'timeline',
      },
      {
        label: 'Serviços',
        value: 'home_repair_service',
        icon: 'home_repair_service',
      },
      {
        label: 'Dashboard',
        value: 'dashboard',
        icon: 'dashboard',
      },
      {
        label: 'Loja',
        value: 'store',
        icon: 'store',
      },
      {
        label: 'Dinheiro',
        value: 'attach_money',
        icon: 'attach_money',
      },
      {
        label: 'Categoria',
        value: 'category',
        icon: 'category',
      },
      {
        label: 'Instalação',
        value: 'get_app',
        icon: 'get_app',
      },
    ],
    group: {
      name: '',
      icon: '',
      steps: [],
    },
  }),
  created() {
    this.isOpen = this.open;
  },
  computed: {
    hasInvalidData() {
      return !this.group.name || !this.group.icon;
    },
    savingGroup() {
      return this.$store.state.groups.savingGroup;
    },
  },
  methods: {
    emitChange() {
      this.$emit('change', this.isOpen);
    },
    cancelCreatingGroup() {
      Object.assign(this.$data, this.$options.data());
      this.$emit('change', this.isOpen);
    },
    createGroup() {
      this.$store.dispatch('groups/createGroup', {
        groupData: {
          ...this.group,
          icon: this.group.icon.value,
        },
      }).then(this.cancelCreatingGroup);
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
