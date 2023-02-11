<template>
  <q-page class="q-px-md">
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">US Region</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ displayName }}</div>
              <div class="text-caption text-grey">
                Sales and Marketing Executive | Graduate and past committee | Keynote speaker on Selling and Recruiting
                Topics
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
            Assessing clients needs and present suitable promoted products. Liaising with and persuading targeted doctors to prescribe our products utilizing effective sales skills.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="userForm.firstName"
                :label="pageLocale.labels.firstName"
              />

              <q-input
                filled
                v-model="userForm.lastName"
                :label="pageLocale.labels.lastName"

              />

              <q-input
                filled
                v-model="userForm.age"
                :label="pageLocale.labels.age"

              />

              <q-input
                filled
                v-model="userForm.email"
                :label="pageLocale.labels.email"

              />

              <q-input
                filled
                v-model="userForm.phone"
                :label="pageLocale.labels.phone"

              />

              <div>
                <q-btn :label="$t('actions.update')" type="submit" color="primary" @click="onUpdateUser"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'Profile',
    data() {
      return {
        user: this.$store.state.user.currentUser,
        pageLocale: this.$t('pages.profile'),
        userForm: {
          emailVerified: true,
          firstName: 'Andre',
          lastName: 'Straube',
          age: 30,
          email: 'a.straube.m@gmail.com',
          phone: '(41) 991428995'
        },
      }
    },
    computed: {
      ...mapGetters('user', ['currentUser']),
      editUserDialog: {
        get () {
          return this.$store.state.user.editUserDialog
        },
        set (val) {
          this.setEditUserDialog(val)
        }
      },
      displayName() {
        return (!this.currentUser && !this.currentUser.displayName) ? this.user.currentUser.displayName : ''
      }
    },
    methods: {
      setBlur () {
        this.$emit('setBlur')
      },
      onUpdateUser() {
        this.$store.dispatch('user/updateUserData',
          Object.assign(this.user, { ...this.userForm, displayName: this.userForm.firstName})
        )
      }
    }
  }
</script>

<style scoped>

</style>
