<template>
  <div class="activity-area">
    <template v-if="hasUploads">
      <div class="text-bold text-grey q-pb-sm">
        <q-icon name="perm_media" size="sm"/> Anexos
      </div>
      <div class="q-row">
        <q-img
          v-for="upload of uploads"
          style="width: 120px"
          class="q-col q-mr-sm q-mb-sm"
          :key="upload"
          :ratio="1"
          :src="upload"
        />
      </div>
    </template>
    <template v-if="hasComments">
      <div class="text-bold text-grey q-pb-sm">
        <q-icon name="chat" size="sm"/> Comentários
      </div>
      <template v-for="comment of comments">
        <div class="text-bold text-grey-9 q-pl-lg q-pb-sm" :key="comment.createdAt">
          <q-icon name="comment" size="sm"/>
          {{ comment.commenter.name || 'Usuário' }}: {{ comment.content }}
        </div>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Activity',
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getBlock() {
      const object = this.$store.state.blocks.blocks.find(({ id }) => id === this.block.id)
      return object ? object : {};
    },
    comments() {
      return (this.getBlock != null) ? this.getBlock.comments : [];
    },
    uploads() {
      return (this.getBlock != null) ? this.getBlock.uploads : [];
    },
    hasComments() {
      return this.comments != null && this.comments.length;
    },
    hasUploads() {
      return this.uploads != null && this.uploads.length;
    },
  },
};

</script>
