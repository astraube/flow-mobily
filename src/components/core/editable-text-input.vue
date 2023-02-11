<template>
  <div>
    <div v-if="!editing">
      <q-icon v-if="icon && icon.length" :name="icon" size="sm"/>
      {{ currentValue }}
      <q-btn flat round dense class="q-ml-sm" size="sm" icon="create" @click="editing = true"/>
    </div>
    <q-input
      outlined
      dense
      color="primary"
      class="q-ml-lg q-mr-lg"
      autofocus
      @focus="onFocus"
      @blur="onUpdateName"
      @keypress.enter="onUpdateName"
      v-else
      v-model="newValue"
    >
      <template v-slot:append>
        <q-btn round flat icon="done" color="primary" :disable="!newValue" @click="onUpdateName"/>
      </template>
    </q-input>
  </div>
</template>

<script>

export default {
  name: 'EditableTextInput',
  props: {
    label: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    editing: false,
    currentValue: '',
    newValue: '',
  }),
  created() {
    this.currentValue = this.value;
  },
  methods: {
    onFocus() {
      this.newValue = this.currentValue;
    },
    onUpdateName() {
      if (!this.newValue) {
        this.editing = false;
        return;
      }

      if (this.newValue !== this.currentValue) {
        this.currentValue = this.newValue;

        this.$emit('change', this.currentValue);
      }
      this.editing = false;
      this.newValue = '';
    },
  },
};

</script>

<style lang="stylus">

</style>
