<template>
  <q-item clickable
    @click="onItemClick"
    :active="isActive"
    active-class="active"
    class="side-menu-link text-white"
  >
    <div class="curve"></div> <!-- do not touch -->

    <q-item-section avatar class="side-menu-link-icon">
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>

    <q-item-section avatar class="side-menu-link-icon" v-if="isAdmin">
      <q-icon name="lock"/>
    </q-item-section>
  </q-item>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'SideMenuItem',
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    icon: {
      type: String,
      required: true,
      default: "",
    },
    path: {
      type: String,
      required: true,
      default: ""
    },
    click: {
      type: Function,
      required: false,
      default: null,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    model: {
      type: Object,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      pathActive: 'common/pathActive',
    }),
    isActive() {
      return (this.active || this.$route.path === this.path)
      //return (this.active || this.pathActive === this.tag || (this.pathActive === this.path && this.$route.path === this.path))
    },
  },
  methods: {
    onItemClick() {
      this.$store.commit('common/pathActive', this.path);

      this.$emit('click', this.model)

      if (this.path != null) {
        if (this.path !== this.$route.path) {
          this.$router.push(this.path);
        } else { }
      }
    },
  },
};

</script>

<style lang="scss">

.side-menu-link {
  border-top-left-radius: 3em;
  border-bottom-left-radius: 3em;

  &.active {
    background: #fff;
    color: #21268a !important;

    &::before {
      content: " ";
      background: var(--q-color-primary) !important;
      width: 32px;
      height: 32px;
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-right-radius: 3em;
      clip-path: polygon(90deg 0%, 10% 100%, 0% 100%);
      transform: translateY(-100%);
      z-index: 1;
    }
    &::after {
      content: " ";
      background: var(--q-color-primary) !important;
      width: 32px;
      height: 32px;
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-right-radius: 3em;
      -webkit-clip-path: polygon(90deg 0%, 10% 100%, 0% 100%);
      clip-path: polygon(90deg 0%, 10% 100%, 0% 100%);
      transform: translateY(150%) rotate(270deg);
    }

    .curve {
      &::before {
        content: " ";
        background: #fff;
        width: 32px;
        height: 32px;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateY(-100%);
      }

      &::after {
        content: " ";
        background: #fff;
        width: 32px;
        height: 32px;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateY(150%);
      }
    }
  }

  & > .side-menu-link-icon {
    padding: 0;
    min-width: 3em;
    z-index: 2;
  }
}

</style>
