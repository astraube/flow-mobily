<template>
  <q-layout class="main" :class="{ 'blur-layout': blurLayout }" view="lHh Lpr lFf">
    <q-header class="bg-secondary" >
      <q-toolbar class="q-pa-md">
        <q-btn color="primary" icon="menu" flat round dense @click="sideMenuOpen = !sideMenuOpen"/>
          <q-btn round dense flat color="primary" icon="add" @click="createNewStep"/>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">

          <q-btn round dense flat color="primary" icon="notifications_none">
            <q-badge color="red" text-color="white" floating>2</q-badge>
            <q-tooltip>{{ $t('notifications') }}</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="primary" icon="perm_identity" @click="routeToMeProfile">
            <q-tooltip>{{ $t('my_profile') }}</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="primary" icon="login" @click="logoutUser">
            <q-tooltip>{{ $t('actions.logout') }}</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="primary" icon="help_outline">
            <q-tooltip>{{ $t('actions.help') }}</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <SideMenu @change="onChange" :open="sideMenuOpen"/>

    <q-page-container>
      <router-view @setBlur="setBlur" />
    </q-page-container>
  </q-layout>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'

  import SideMenu from '../components/dashboard/side-menu/side-menu.vue';

  export default {
    name: 'UserLayout',
    components: { SideMenu },
    data: () => ({
      sideMenuOpen: true,
      blurLayout: false
    }),
    computed: {
      ...mapGetters('user', ['currentUser']),
      productName () {
        return window.sessionStorage.productName
      }
    },
    created() {
      this.setBlur()

      this.$store.dispatch('groups/getGroups').then((result) => {
        this.setBlur()
      });
    },
    methods: {
      ...mapActions('auth', ['logoutUser']),
      ...mapActions('user', ['routeToMeProfile']),
      setBlur () {
        this.blurLayout = !this.blurLayout
      },
      showErrorToast({ code }) {
        console.log('USerLayout showErrorToast: ', code)
        this.$q.notify(this[code.split('/')[1]]);
      },
      onChange(newValue) {
        this.sideMenuOpen = newValue;
      },
      createNewStep() {
        this.$store.commit('steps/setDialogStep', true);
      },
    },
  };

</script>

<style lang="stylus" scoped>
  .main
    &.blur-layout
      filter blur(5px)
</style>
