<template>
  <q-input
    autogrow
    outlined
    dense
    color="blue-8"
    placeholder="Comentar"
    :counter="!!rules.maxLength"
    :maxlength="rules.maxLength"
    :loading="isAddingLastComment"
    v-model="commentText"
  >
    <template v-slot:append>
      <q-btn round flat icon="send" color="primary" :disable="!commentText" @click="addComment"/>
    </template>
  </q-input>
</template>

<script>

export default {
  name: 'Comment',
  props: {
    block: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
      default: () => ({
        maxLength: 500,
      }),
    },
  },
  data: () => ({
    commentText: '',
    isAddingLastComment: false,
  }),
  computed: {
    configuredName() {
      if (!this.rules.required) {
        return `${this.rules.name} (opcional)`;
      }
      return this.rules.name;
    },
  },
  methods: {
    addComment() {
      this.isAddingLastComment = true;
      this.$store.dispatch('blocks/commentOnABlock', {
        blockId: this.block.id,
        comment: this.commentText,
      }).then(() => {
        this.commentText = '';
        this.isAddingLastComment = false;
      });
    },
  },
};

</script>
