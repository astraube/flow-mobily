<template>
  <div class="full-height project-data">
    <div class="background-photo">
      <div class="default-background" v-if="!project.backgroundPhoto">
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
      </div>
      <div class="project-background" v-else>
        <q-img :src="project.backgroundPhoto" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
      </div>
    </div>

    <div class="absolute-top q-mt-sm text-white text-center">
      <q-icon class="q-mr-sm" color="white" name="edit" size="20px" @click="showPhotoUpload('profile')"/>
      Editar plano de fundo
      <EditableTextInput
        class="text-bold text-h3 project-name"
        v-model="project.title"
        label="Titulo"
        :value="(project && project.title) || 'title'"
        @change="setProjectTitle"
      />
    </div>

    <section class="project-info">
      <label class="col-3" for="description">Descrição</label>
      <q-input type="textarea" class="col" id="description" v-model="project.description" autogrow filled borderless dense/>
    </section>

    <div class="q-pa-md row items-start q-gutter-md">
      <div class="row q-col-gutter-none">
        <div class="col-4" >
          <div class="text-h5">Ambientes</div>
        </div>
      </div>
      <q-separator spaced />
      <q-btn flat dense size="lg" icon="add" color="primary"
             @click="addNewBlock"
             class="block-button-add"
      >
        <q-tooltip content-class="primary">Criar novo ambiente</q-tooltip>
      </q-btn>
      <template v-if="hasBlocks" >
        <q-card class="block-project-card bg-primary q-btn--actionable"
                v-for="block of blocks"
                :key="(block.id + '_' + block.name)"
                @click="emitUpdatingBlock(block)"
        >
          <q-img
            :src="block.coverImage"
            :ratio="1"
            transition="fade"
            basic
            spinner-color="white"
            class="rounded-borders"
          />
          <div class="absolute-full flex flex-center">
            <div class="block-project-card-text text-subtitle3">
              {{block.name}}
            </div>
          </div>
        </q-card>
      </template>
    </div>

  </div>
</template>

<script>
  import EditableTextInput from 'src/components/core/editable-text-input'

  export default {
    name: 'ProjectData',
    components: { EditableTextInput },
    props: {
      project: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      blocks: [],
    }),
    computed: {
      hasBlocks() {
        return (this.blocks && this.blocks.length)
      }
    },
    created() {
      this.$store.dispatch('blocks/getBlocks',
        {
          hasUnbind: true,
          where: [
            {
              fieldPath: "projectId",
              opStr: '==',
              value: this.project.id
            }
          ]
        }).then((result) => {
          this.blocks = result
      });
    },
    methods: {
      showPhotoUpload() {},
      addNewBlock() {
        console.log('addNewBlock')
      },
      setProjectTitle(newValue) {
        this.project.title = newValue
      },
      emitUpdatingBlock(block) {
        this.$emit('updating-block', block);
      },
    },
    watch: {
      project(newValue) {
        this.$emit('input', newValue)
      },
    },
  }
</script>

<style lang="stylus">

.block-button-add
  width 100px
  height 100px

.block-project-card
  width 100%
  height 100px
  max-width 100px

.block-project-card-text
  max-height 50px
  width 100%
  text-align center
  padding 8px
  background-color rgba(255,255,255,.70)

.project-data
  position relative
  .project-name
    margin-top 2em
    .q-field__control
      background #ffffff
  .default-project-image
    cursor pointer
    color #ffffff
    @media(max-width $breakpoint-sm)
      margin-bottom 2em
    .q-icon
      @media(max-width $breakpoint-sm)
        font-size 1em!important

  .project-photo
    cursor pointer
    margin -6em 0 2em
    .q-avatar
      @media(max-width $breakpoint-sm)
        margin-top 1rem
        height .75em
        width .75em
    .project-image
      .edit
        top 2.5em

  .project-info
    padding 1em 0
    max-width 30em
    margin auto
    color $blue-grey-10
    label
      text-align left
      font-weight bold
    input
      background rgba(101,104,110,.20)
      border-radius 6px
      color $blue-grety-10
      font-weight bold
      padding .5em
</style>
