<template>
  <q-page class="flex flex-center">
    <div
      id="particles-js"
      :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
    ></div>
    <q-btn
      color="white"
      class="absolute-top-right"
      flat
      round
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
    />
    <q-card
      class="login-form"
      v-bind:style="
        $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
      "
    >
      <q-img src="/statics/images/carpenter.webp"></q-img>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Entrar no sistema
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-form autocapitalize="off" @submit="onSubmit({ email, password })">
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

            <q-btn
              label="Entrar"
              type="submit"
              class="full-width"
              color="primary"
              :loading="isLoggingIn"
            />

          </q-form>

          <div>
            <q-btn
              label="Não tenho conta"
              class="q-mt-sm full-width"
              @click="$router.push('/signup')"
              flat
              dense
            />

            <a
              style="font-size: 30px;"
              class="float-right"
              href="https://github.com/sponsors/mayank091193"
              target="_blank"
              title="Donate"
            ><i class="fas fa-heart" style="color: #eb5daa"></i
            ></a>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

  import {mapGetters} from "vuex";

  export default {
    name: 'Login',
    data: () => ({
      email: '',
      password: '',
      showingPassword: false,
      baseInvalidToast: {
        color: 'negative',
        icon: 'report_problem',
      },
    }),
    computed: {
      //...mapGetters('auth', ['isLoggingIn']),
      isLoggingIn() {
        return false // this.$store.state.auth.isLoggingIn; // TODO - por algum motivo nao esta mudando o estado quando efetua logout
      },
      // eslint-disable-next-line func-names
      'user-not-found': function () {
        return {
          ...this.baseInvalidToast,
          message: 'E-mail ou senha inválidos',
        };
      },
      // eslint-disable-next-line func-names
      'wrong-password': function () {
        return this['user-not-found'];
      },
    },
    methods: {
      onSubmit(credentials) {
        this.$store.dispatch('auth/loginWithEmailAndPassword', credentials)
          .catch((ex) => {
            console.log('login onSubmit: ', ex)
            this.$emit('showErrorToast', ex.code)
          });
      },
      loginNotify(){
        this.$q.notify({
          message: 'Login Successful',
        })
      }
    },
    mounted() {
      /*particlesJS("particles-js", {
          "particles": {
              "number": {
                  "value": 80,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#ffffff"
              },
              "shape": {
                  "type": "circle",
                  "stroke": {
                      "width": 0,
                      "color": "#000000"
                  },
                  "polygon": {
                      "nb_sides": 5
                  },
                  "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                  }
              },
              "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#ffffff",
                  "opacity": 0.4,
                  "width": 1
              },
              "move": {
                  "enable": true,
                  "speed": 6,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "detect_on": "canvas",
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "grab"
                  },
                  "onclick": {
                      "enable": true,
                      "mode": "push"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 140,
                      "line_linked": {
                          "opacity": 1
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200,
                      "duration": 0.4
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true
      });*/
    }
  }
</script>

<style>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  .normal_gradient {
    background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
  }
  .dark_gradient {
    background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
  }
  .login-form {
    position: absolute;
  }
</style>
