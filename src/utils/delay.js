/**
 * Usage:
 *
     <p>wait 2s</p>
     <delay class="box" :wait="2000">
     <div slot="loading">Ahem...</div>
     <h3>1111</h3>
     </delay>

     <p>wait 3s</p>
     <delay class="box" :from="Date.now() + 1000" :wait="2000">
     <h2>2222</h2>
     </delay>

     <p>wait 4s</p>
     <delay class="box" :wait="4000">
     <h1>3333</h1>
     </delay>
 */
export default {
    name: 'Delay',
    props: {
        wait: {
            type: Number,
            default: 0,
        },
        from: {
            type: Number,
            default: Date.now(),
        },
    },
    data: () => ({
        waiting: true,
    }),
    created () {
        this.timer = setTimeout(() => {
            this.waiting = false
        }, this.from - Date.now() + this.wait)
    },
    destroyed () {
        clearTimeout(this.timer)
    },
    render (h) {
        return h(
            'div',
            this.waiting ? this.$slots.loading || null : this.$slots.default,
        )
    },
    install (Vue, name) {
        Vue.component(name || 'Delay', this)
    },
}
