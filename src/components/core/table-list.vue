<template>
  <div class="q-ma-xs">
    <q-card class="q-ma-xs">
      <q-table
        :title="title"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
        @row-click="rowClick"
      >
        <template v-slot:top-right="props">
          <q-input outlined dense debounce="300" v-model="filter" :placeholder="$t('actions.search')">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? $t('actions.fullscreen_exit') : $t('actions.fullscreen_open')}}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{mode==='grid' ? 'List' : 'Grid'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            :label="$t('actions.export_to_csv')"
            no-caps
            @click="clickExportTable"
          />

          <q-btn
            class="q-ml-sm"
            v-if="actionNewEntry"
            :key="actionNewEntry.label"
            :color="actionNewEntry.color"
            :icon-right="actionNewEntry.icon"
            :label="actionNewEntry.label"
            no-caps
            @click="clickNewEntry"
          />
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="getColorByStatus(props.row)"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.status}}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props" v-if="actions != null">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round dense outline
                v-for="action of actions"
                :color="action.color"
                :icon="action.icon"
                :key="action.label"
                @click.stop="action.method(props.row)"
              >
                <q-tooltip>{{ action.label }}</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
  import { exportFile, date } from "quasar";

  function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;

    formatted =
      formatted === void 0 || formatted === null ? "" : String(formatted);

    formatted = formatted.split('"').join('""');

    return `"${formatted}"`;
  }

  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      mode: {
        type: String,
        required: false,
        default: "list",
      },
      filter: {
        type: String,
        required: false,
        default: "",
      },
      columns: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      actions: {
        type: Array,
        required: false,
        default: null,
      },
      actionNewEntry: {
        type: Object,
        required: false,
        default: null,
      },
      rowsPerPage: {
        type: Number,
        required: false,
        default: 10,
      },
      onCreated: {
        type: Function,
        required: false,
        default: null,
      },
      onRowClick: {
        type: Function,
        required: false,
        default: null,
      },
      onNewEntry: {
        type: Function,
        required: false,
        default: null,
      },
    },
    data() {
      return {
        invoice: {},
        employee_dialog: false,
        pagination: {
          rowsPerPage: this.rowsPerPage
        },
      };
    },
    created() {
      this.$emit('onCreated');
    },
    methods: {
      rowClick(event, row) {
        this.$emit('onRowClick', {event, row});
      },
      getColorByStatus(row) {
        if (row.statusId === 1)
          return 'blue'
        else if(row.statusId === 2)
          return 'orange'
        else
          return 'red'
      },
      clickNewEntry() {
        this.$emit('onNewEntry');
      },
      clickExportTable() {
        // naive encoding to csv format
        const content = [this.columns.map(col => wrapCsvValue(col.label))]
          .concat(
            this.data.map(row =>
              this.columns
                .map(col =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile(`${this.title}.csv`, content, "text/csv");

        if (status !== true) {
          this.$q.notify({
            message: "O navegador negou o download do arquivo...",
            color: "negative",
            icon: "warning"
          });
        }
      }
    }
  };
</script>

<style lang="sass">
  .q-chip__content
    display: block
    text-align: center
</style>
