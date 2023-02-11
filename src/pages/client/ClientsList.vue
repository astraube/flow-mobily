<template>
  <q-page class="q-px-md q-mb-lg">
    <TableList
      :title="pageName"
      :mode="mode"
      :columns="columns"
      :data="clients"
      :actions="actions"
      @onRowClick="onRowClick"
    />

    <UpdateDialog
      :open="isShowingDialogUpdating"
      @change="emiteStateChangeUpdate"
      @cancel="emiteStateCancelUpdate"
      @submit="emiteStateSubmitUpdate"
    />
  </q-page>
</template>

<script>

  import {mapMutations, mapGetters} from 'vuex'

  import TableList from 'src/components/core/table-list';
  import UpdateDialog from 'src/components/dashboard/client/update-dialog';

  export default {
    name: 'ClientsList',
    components: {
      TableList,
      UpdateDialog
    },
    data() {
      return {
        isShowingDialogUpdating: false,
        pageName: "Clientes",
        filter: "",
        dataList: [],
        mode: "list",
        columns: [
          {
            name: "fullName",
            align: "left",
            label: "Nome",
            field: "fullName",
            sortable: true
          },
          {
            name: "email",
            align: "left",
            label: "E-mail",
            field: "email",
            sortable: true
          },
          {
            name: "createdAt",
            required: true,
            label: "Data de cadastro",
            align: "center",
            field: "createdAt",
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
      this.onLoadData()
    },
    computed: {
      ...mapGetters('clients', ['clients']),
    },
    methods: {
      ...mapMutations('clients', ['setClients', 'setCurrentClient', 'setLoadingClients', 'setSavingClient']),
      onLoadData() {
        try {
          this.$q.loading.show()

          this.$store.dispatch('clients/getClients')

        } catch (err) {
          this.$q.notify({
            message: `Algo deu errado: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.setLoadingClients(false)
        }
      },
      setUpdatingModel(model) {
        this.setCurrentClient(model);
        this.isShowingDialogUpdating = (model != null);
      },
      emiteStateChangeUpdate(isUpdating) {
        //console.log("emiteStateChangeUpdate: ", isUpdating)
      },
      emiteStateCancelUpdate(isUpdating) {
        this.setUpdatingModel(null)
        this.setSavingClient(isUpdating);
      },
      emiteStateSubmitUpdate(newDataModel) {
        this.onSaveData(newDataModel)
      },
      async onSaveData (newDataModel) {
        /*this.$q.loading.show({
          message: 'Updating your data, please stand by...',
          customClass: 'text-h3, text-bold'
        })*/

        try {
          await this.$store.dispatch('clients/updateClient', newDataModel).then(() => {
            //this.dataList = this.clients;
          });
        } catch (err) {
          this.$q.notify({
            message: `Looks like a problem updating your profile: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.setUpdatingModel(null)
        }
      },

      actionReadMore(item) {
        console.log("actionReadMore: ", item)
      },
      actionEdit(item) {
        //console.log("actionEdit: ", item)
        this.setUpdatingModel(item)
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
