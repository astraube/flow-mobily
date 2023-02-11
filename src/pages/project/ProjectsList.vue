<template>
  <q-page class="q-px-md q-mb-lg">
    <TableList
      :title="pageName"
      :mode="mode"
      :columns="columns"
      :data="data"
      :actions="actions"
      :actionNewEntry="actionNewEntry"
      @onNewEntry="onNewEntry"
      @onRowClick="onRowClick"
    />
    <DialogUpdate :open="dialogIsOpen" :project="projectModel" @change="onChange"/>
  </q-page>
</template>

<script>

  import TableList from 'src/components/core/table-list';
  import DialogUpdate from 'src/components/dashboard/projects/dialog-update'
  import {date} from "quasar";

  export default {
    name: 'ProjectsList',
    components: {
      TableList,
      DialogUpdate
    },
    data() {
      return {
        projectModel: {},

        pageName: "Projetos",
        filter: "",
        mode: "list",
        columns: [
          {
            name: "title",
            align: "left",
            label: "Título",
            field: "title",
            sortable: true
          },
          {
            name: "dueAt",
            required: true,
            label: "Previsão de entrega",
            align: "center",
            field: "dueAt",
            sortable: true,
            format: val => this.formatDate(val)
          },
          {
            name: "status",
            align: "center",
            label: "Status",
            field: "status",
            sortable: true
          },
          {
            name: "action",
            align: "center",
            label: "Ações",
            field: "action",
            sortable: true
          }
        ],
        actionNewEntry: {
          label: "Criar novo",
          color: "primary",
          icon: "add",
          //method: this.onNewEntry
        },
        actions: [
          {
            label: this.$t('actions.read_more'),
            color: "primary",
            icon: "search",
            method: this.actionReadMore
          },
          {
            label: this.$t('actions.edit'),
            color: "orange",
            icon: "edit",
            method: this.actionEdit
          },
          {
            label: this.$t('actions.delete'),
            color: "red",
            icon: "delete",
            method: this.actionDelete
          }
        ],
        pagination: {
          rowsPerPage: 10
        },
        dialogIsOpen: false,
      };
    },
    computed: {
      data() {
        return this.$store.state.projects.projects
      },
    },
    created() {
      this.$store.dispatch('projects/getProjects');
    },
    methods: {
      setUpdatingModel(model) {
        this.$store.commit('projects/setCurrentProject', model)
        this.projectModel = model
        this.dialogIsOpen = (model != null);
      },
      onChange(isUpdating) {
        if (!isUpdating) {
          this.setUpdatingModel( null )
        } else {
          this.dialogIsOpen = isUpdating;
        }
      },
      actionEdit(item) {
        this.setUpdatingModel(item)
      },
      actionReadMore(item) {
        console.log("actionReadMore: ", item)
      },
      actionDelete(item) {
        console.log("actionDelete: ", item)
      },
      onRowClick({ row }) {
        this.$router.push(`project/${row.id}`)
      },
      onNewEntry() {
        console.log('onNewEntry')
      },
      formatDate(val) {
        if (val === null || val === undefined)
          return ''

        return this.$appFormatters.date(val,'DD/MM/YYYY')
        /*
        // Tenta formatar a data duas vezes...
        let newVal = val

        if (date.isValid(newVal))
          return date.formatDate(newVal, 'DD/MM/YYYY');

        // Caso nao consiga converter a data na primeira tentativa, converte de Millisegundos para data
        newVal = date.buildDate({ milliseconds:val } )

        return date.isValid(newVal) ? date.formatDate(newVal, 'DD/MM/YYYY') : '';

         */
      },
    }
  };
</script>

<style lang="sass">
  .q-chip__content
    display: block
    text-align: center
</style>
