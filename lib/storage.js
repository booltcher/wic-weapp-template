import Prompt from "./prompt.js";
const STORAGE_KEY = 'goods'

export const setStorage = (section) => {
    const { id, maxPrice, minPrice, optionName, productId, productCover, productName } = section
    const storage = getStorageById(productId)
    let allGoodStorage = getAllStorage()
    if (!storage) {
        allGoodStorage.push(section)
    } else {
        allGoodStorage.forEach(v => {
            if (v.productId === productId) {
                v.id = id
                v.maxPrice = maxPrice
                v.minPrice = minPrice
                v.optionName = optionName
                v.productCover = productCover
                v.productName = productName
            }
        })
    }
    try {
        wx.setStorageSync(STORAGE_KEY, JSON.stringify(allGoodStorage))
        return allGoodStorage
    } catch (error) {
        Prompt.error('设置缓存失败')
    }
}

// 根据productId获取
export const getStorageById = (productId) => {
    let allGoodStorage = getAllStorage()
    if (allGoodStorage) {
        return allGoodStorage.filter(v => v.productId === productId)[0]
    }
}

export const removeStorage = (productId) => {
    const allGoodStorage = getAllStorage()
    const newStorage = allGoodStorage.filter(v => v.productId !== productId)
    try {
        wx.setStorageSync(STORAGE_KEY, JSON.stringify(newStorage))
        return newStorage
    } catch (error) {
        Prompt.error('删除缓存失败')
    }
}

export const clearStorage = () => {
    try {
        wx.setStorageSync(STORAGE_KEY, JSON.stringify([]))
    } catch (error) {
        Prompt.error('清空缓存失败')
    }
}

export const getAllStorage = () => {
    try {
        var allGoodStorage = wx.getStorageSync(STORAGE_KEY)
        if (allGoodStorage) {
            return JSON.parse(allGoodStorage)
        } else {
            const data = JSON.stringify([])
            wx.setStorageSync(STORAGE_KEY, data)
            return []
        }
    } catch (e) {
        Prompt.error('获取缓存失败')
    }
}

