const QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
    key: '52WBZ-IMPLD-D5N4G-PESYC-KUWQ5-NTFJJ'
});

const getAddressName = ({latitude, longitude}) => {
    return new Promise((resolve, reject) => {
        qqmapsdk.reverseGeocoder({
            location: {
                latitude,
                longitude
            },
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        });
    })
}
export default getAddressName
