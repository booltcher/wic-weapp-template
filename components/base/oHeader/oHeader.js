import getHeaderHeight from "../../../utils/getHeaderHeight";
Component({
    options: {
        multipleSlots: true
    },
    properties: {

    },
    lifetimes: {
        async attached() {
            let { customheaderHeight, paddingTop, innerHeight } = await getHeaderHeight();
            // let paddingTop = await (await getHeaderHeight()).paddingTop;
            this.setData({
                innerHeight,
                paddingTop,
                customheaderHeight
            })
            this.triggerEvent('rendered', customheaderHeight)
        }
    },
    data: {
        innerHeight: 0,
        paddingTop: 0,
        customheaderHeight: 0
    },

    methods: {

    },
})
