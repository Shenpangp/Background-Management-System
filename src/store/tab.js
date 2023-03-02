import Cookie from 'js-cookie'
// state 仓库存储数据的地方
const state = {
        isCollapse: false, //控制菜单展开/收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ], // 面包屑数据
        menu: [],
        name: '',
        access: ''
}
// mutations 修改state的唯一手段
const mutations = {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    selectMenu(state, info) {
        // 判断添加的数据是否为首页
        if(info.name !== 'home'){
            const index = state.tabsList.findIndex(item => item.name === info.name)
            // 如果不存在
            if(index === -1){
                state.tabsList.push(info)
            }
        }
    },
    closeTag(state, item) {
        const index = state.tabsList.findIndex(val => val.name === item.name)
        state.tabsList.splice(index, 1)
    },
    getMenu(state, val) {
        console.log(val, 'val')
        state.menu = val
        Cookie.set('menu', JSON.stringify(val))
    },
    // 动态注册路由
    addMenu(state, router) {
        // 判断当前缓存中是否有数据
        if(!Cookie.get('menu')) return
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu
        // 处理动态路由的数据
        const menuArray = []
        menu.forEach(item => {
            if(item.children) {
                item.children = item.children.map(item => {
                    item.component = () => import(`@/views/${item.url}`)
                    return item 
                })
                menuArray.push(...item.children)
            } else {
                item.component = () => import(`@/views/${item.url}`)
                menuArray.push(item)
            }
        })
        console.log(menuArray, 'menuArray')
        // 路由的动态添加
        menuArray.forEach(item => {
            router.addRoute('Main', item)
        })
    }

}
// actions处理action，写自己的业务逻辑也可以处理异步
const actions = {
    // 可以书写业务逻辑，但是不能修改state
   
}
// getters 计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}