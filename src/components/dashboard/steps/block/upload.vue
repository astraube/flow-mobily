<template>
  <q-btn
    outline
    size="sm"
    class="full-width"
    color="grey"
    icon="backup"
    label="Anexar"
    :loading="savingFile"
    @click="startSelectingFiles"
  >
    <input
      class="file-input"
      type="file"
      @change="fileAdded"
      :accept="rules.options.acceptedFiles"
      ref="fileInput"
      multiple
    >
  </q-btn>
</template>

<script>

export default {
  name: 'Upload',
  props: {
    block: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
      default: () => ({
        minQuantity: 1,
        required: true,
        options: {
          acceptedFiles: 'image/jpeg,image/png,image/gif,image/jpg',
          thumbnailWidth: 150,
          url: 'https://httpbin.org/post',
        },
      }),
    },
  },
  data: () => ({
    savingFile: false,
  }),
  computed: {
    splittedAcceptedFiles() {
      return this.rules.options.acceptedFiles.split(',');
    },
    uploadedFiles() {
      return this.$store.state.blocks.blocks.find(({ id }) => id === this.block.id).uploads || [];
    },
  },
  methods: {
    startSelectingFiles() {
      if (this.savingFile) return;
      this.$refs.fileInput.click();
    },
    fileAdded(event) {
      if (!event.target.files.length) return;
      this.savingFile = true;

      Array.from(event.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = ({ target }) => {
          this.$store.dispatch('blocks/uploadFile', {
            MIMEType: file.name.split('.')[1],
            name: file.name,
            data: target.result,
          }).then((URL) => {
            const newData = { id: this.block.id, uploads: [...this.uploadedFiles, URL] };
            this.$store.dispatch('blocks/updateBlock', newData);
            this.$store.commit('blocks/setBlock', newData);

            if (index === event.target.files.length - 1) {
              this.savingFile = false;
            }
          });
        };
        reader.readAsDataURL(file);
      });
    },
  },
};

</script>

<style lang="scss">

.file-input, .file-input::-webkit-file-upload-button {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
