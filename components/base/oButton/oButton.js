// components/oButton/oButton.js
const app = getApp()
Component({
      properties: {
            disabled: {
                  type: Boolean,
                  value: false
            },
            loading: {
                  type: Boolean,
                  value: false
            },
            round: {
                  type: Boolean,
                  value: false
            },
            plain: {
                  type: Boolean,
                  value: false
            },
            block: {
                  type: Boolean,
                  value: true
            },
            color: {
                  type: String,
                  value:'#fe75a9'
            },
            icon: {
                  type: String,
            }
      },
      data: {

      },
      methods: {

      },
      lifetimes: {
            attached: function () {
                  
            },
      }
})