Component({
    properties: {
        color: {
            type: String,
            value:"#333"
        },
        size: {
            type: Number,
            value: 32
        },
        value: {
            type: Number,
            value: 5
        },
        showNumber: {
            type: Boolean,
            value: true
        },
        mode: {
            type: String,
            value: 'display' // evaluate
        },
        numberColor:{
            type: String,
            value: '#fff'
        }
    },

    data: {
        showValue: null,
        showHelf: false,
        fullCount: 5,
        scoreValue: 0
    },

    methods: {
        clickFill(e) {
            let scoreValue = e.currentTarget.dataset.index + 1
            this.setData({
                scoreValue
            })
          },
          clickHollow(e) {
            let scoreValue = e.currentTarget.dataset.index + this.data.score + 1
            this.setData({
                scoreValue
            })
          },
    },
    lifetimes:{
        attached(){
            let showValue = this.data.value.toFixed(1)
            let showHalf = showValue.split('.')[1] === '5'
            let fullCount = Number(showValue.split('.')[0])
            this.setData({
                showValue,
                showHalf,
                fullCount
            })
        }
    }
})
