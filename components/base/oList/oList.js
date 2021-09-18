Component({
    options: {
        multipleSlots: true
    },
    properties: {
        length: {
            type: Number,
            value: 0
        },
        more: {
            type: Boolean,
            value: true
        },
        emptyIcon:{
            type: String
        },
        emptyTip:{
            type: String
        }
    },
    data: {
        dividerText:''
    },

    methods: {
        setDividerText(){
            this.setData({
                dividerText: this.data.length ? ( this.data.more ? '上拉加载更多':'到底啦' ) : ''
            })
        }
    },
    lifetimes: {
        async attached() {
            this.setDividerText()
        },
    },
})
