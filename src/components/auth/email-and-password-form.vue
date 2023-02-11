<template>
  <q-form autocapitalize="off" @submit="(value) => $emit('submit', { email, password })">
    <q-input label="E-mail" type="email" v-model="email" dense outlined bottom-slots required>
      <template v-slot:prepend>
        <q-icon name="mail"/>
      </template>
    </q-input>
    <q-input
      label="Senha"
      :type="showingPassword ? 'text' : 'password'"
      v-model="password"
      dense
      outlined
      bottom-slots
      required
    >
      <template v-slot:prepend>
        <q-icon name="lock"/>
      </template>
      <template v-slot:append>
        <q-btn
          :icon="showingPassword ? 'visibility_off' : 'visibility'"
          @click="showingPassword = !showingPassword"
          round
          small
          dense
          flat
        />
      </template>
    </q-input>

    <slot/>
  </q-form>
</template>

<script>

export default {
  name: 'EmailAndPasswordForm',
  data: () => ({
    email: '',
    password: '',
    showingPassword: false,
  }),
};

</script>
