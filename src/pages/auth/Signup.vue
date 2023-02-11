<template>
  <q-page>
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="text-grey-9 text-center rounded-borders q-mb-sm">
        <q-toolbar-title>
          <b>Cadastrar</b>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <EmailAndPasswordForm @submit="onSubmit">
          <q-btn
            label="Cadastrar"
            type="submit"
            class="full-width"
            color="primary"
            :loading="isLoggingIn"
          />
        </EmailAndPasswordForm>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import EmailAndPasswordForm from 'components/auth/email-and-password-form.vue';

export default {
  name: 'SignUp',
  components: {
    EmailAndPasswordForm,
  },
  data: () => ({
    baseInvalidToast: {
      color: 'negative',
      icon: 'report_problem',
    },
  }),
  computed: {
    isLoggingIn() {
      return this.$store.state.auth.isLoggingIn;
    },
    // eslint-disable-next-line func-names
    'user-not-found': function () {
      return {
        ...this.baseInvalidToast,
        message: 'E-mail ou senha inválidos',
      };
    },
  },
  methods: {
    onSubmit(credentials) {
      this.$store.dispatch('auth/signUpWithEmailAndPassword', credentials)
        .catch((ex) => {
          console.log('login onSubmit: ', ex)
          this.$emit('showErrorToast', ex.code)
        });
    }
  },
};

</script>
