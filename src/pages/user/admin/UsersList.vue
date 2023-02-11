<template>
  <q-page class="q-px-md q-mb-lg">
    <TableList
      :title="pageName"
      :mode="mode"
      :columns="columns"
      :data="data"
      :actions="actions"
      @onRowClick="onRowClick"
    />
  </q-page>
</template>

<script>
  import TableList from 'components/core/table-list';
  import { date } from "quasar";

  export default {
    name: 'UserList',
    components: {
      TableList
    },
    data() {
      return {
        pageName: "Usuários",
        filter: "",
        mode: "list",
        columns: [
          {
            name: "firstName",
            align: "left",
            label: "Nome",
            field: "firstName",
            sortable: true
          },
          {
            name: "email",
            required: true,
            label: "E-mail",
            align: "center",
            field: "email",
            sortable: true
          },
          {
            name: "createdAt",
            align: "center",
            label: "Data de cadastro",
            field: "createdAt",
            sortable: true,
            format: val => this.formatDate(val)
          },
          {
            name: "lastLoginAt",
            align: "center",
            label: "Último login",
            field: "lastLoginAt",
            sortable: true,
            format: val => this.formatDate(val)
          },
          {
            name: "action",
            align: "center",
            label: "Ações",
            field: "action",
            sortable: true
          }
        ],
        data: [],
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
        }
      };
    },
    created() {
      this.$store.dispatch('user/getAllUsers').then(querySnapshot => {
        this.data = querySnapshot
      })
    },
    methods: {
      actionReadMore(item) {
        console.log("actionReadMore: ", item)
      },
      actionEdit(item) {
        console.log("actionEdit: ", item)
      },
      actionDelete(item) {
        console.log("actionDelete: ", item)
      },
      onRowClick(payload) {
        console.log(payload)
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
