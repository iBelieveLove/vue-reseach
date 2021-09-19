// demo data
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}
// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function (vm) {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    // isClosed: function () {
    //   return !this.open;
    // }
  },
  // watch: {
    // open: async function (newVal, oldVal) {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       console.warn('### open change: ', newVal);
    //       resolve();
    //     }, 200);
    //   });
    // },
    // isFolder: {
    //   immediate: true,
    //   handler: async function (newVal, oldVal) {
    //     new Promise((resolve) => {
    //       setTimeout(() => {
    //         console.warn('### isFolder change: ', newVal);
    //         resolve();
    //       }, 500);
    //     });
    //   }
    // }
  // },
  watch: {
    open: {
      handler: async function (newVal){
        return new Promise((resolve) => {
          setTimeout(() => {
            console.warn('### open change', newVal)
            resolve();
          }, 500);
        });
      },
      sync: true,
      immediately: true
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  // el: '#demo',
  data: {
    treeData: data
  },
  created: async function () {
    console.warn('#### created enter');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    })
    console.warn('##### created end');
  },
  mounted: function () {
    console.warn('#### mounted');
  }
})
demo.$mount('#demo');