<template>
  <q-page>
    <q-layout v-if="!loadingSteps && !steps.length && hasCurrentGroup">
        <q-page class="q-px-md">
          <div class="row justify-center items-center">
            <h5 class="text-center">Não existe nada aqui, que tal criar uma etapa agora?</h5>
          </div>
          <div class="row justify-center items-center">
            <q-btn color="primary" @click="setDialogCreateStep(true)">Criar</q-btn>
          </div>
        </q-page>
    </q-layout>

    <div class="q-pa-md">
      <StepsList/>
    </div>

    <StepCreationDialog
      :open="isShowingDialog"
      @change="emiteStateChangeStepCreation"
      @cancel="emiteStateCancelStepCreation"
      @submit="emiteStateSubmitStepCreation"
    />
  </q-page>
</template>

<script>

import StepsList from '../components/dashboard/steps/step/steps-list.vue';
import StepCreationDialog from '../components/dashboard/steps/step/step-creation-dialog.vue';

export default {
  name: 'dashboard',
  components: {
    StepsList,
    StepCreationDialog,
  },
  data: () => ({
    newStep: {
      createdAt: null,
      name: '',
      description: '',
      rules: [],
      blocks: [],
    },
  }),
  methods: {
    setBlur () {
      this.$emit('setBlur')
    },
    setDialogCreateStep(isShowing) {
      this.$store.commit('steps/setDialogStep', isShowing);
    },
    emiteStateChangeStepCreation(isUpdating) {
      //console.log("emiteStateChangeStepCreation: ", isUpdating)
    },
    emiteStateCancelStepCreation(isUpdating) {
      this.$store.commit('steps/setDialogStep', isUpdating);
      this.$store.commit('steps/setSavingStep', isUpdating);
    },
    emiteStateSubmitStepCreation(newDataModel) {
      this.onSaveData(newDataModel)
    },
    async onSaveData (newDataModel) {
      /*this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })*/

      try {
        await this.$store.dispatch('steps/createStep', newDataModel).then(() => {

        });
      } catch (err) {
        this.$q.notify({
          message: `Looks like a problem updating your profile: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        this.setDialogCreateStep(false)
      }
    },
  },
  computed: {
    isShowingDialog() {
      return this.$store.state.steps.dialogStep;
    },
    groupId() {
      return this.$store.state.groups.currentGroup.id;
    },
    loadingSteps() {
      return this.$store.state.steps.loadingSteps;
    },
    steps() {
      let stateSteps = this.$store.state.steps.steps;
      if (Array.isArray(stateSteps))
        return stateSteps;
      else
        return [];
    },
    hasCurrentGroup() {
      return !!this.$store.state.groups.currentGroup;
    },
  },
  created() {
    this.$store.dispatch('steps/getSteps');
    this.$store.dispatch('blocks/getBlocks');
  },
};

</script>
