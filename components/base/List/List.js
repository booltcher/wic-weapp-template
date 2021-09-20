import { behavior as computedBehavior } from "miniprogram-computed";
Component({
    behaviors: [computedBehavior],
    options: {
        multipleSlots: true
    },
    properties: {
        length: {
            type: Number,
            value: 0
        },
        hideTip:{
            type: Boolean,
            value: false
        },
        more: {
            type: Boolean,
            value: true
        },
        emptyIcon:String,
        emptyTip: String
    },
    computed: {
        dividerText(data) {
            return data.more ? '上拉加载更多' : '已经到底啦'
        }
    },
})
