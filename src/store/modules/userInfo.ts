import { Module } from 'vuex'
import { getUserId } from '@/api/main'

const state = {
  userName: '',
  userId: '',
  avatar: '',
  menus: [],
  permissions: [],
}

const user: Module<typeof state, any> = {
  namespaced: true,

  state,

  mutations: {
    SET_NAME: (state, { userName, userId }) => {
      state.userName = userName
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
  },

  actions: {
    // 获取用户信息
    async getInfo({ commit }) {
      let _login = false
      try {
        const { is_success, result } = await getUserId()
        if (is_success && result) {
          commit('SET_MENUS', result.menus)
          commit('SET_PERMISSIONS', result.permissions)
          commit('SET_NAME', {
            userName: result.userName,
            userId: result.userId,
          })
          commit('SET_AVATAR', result.avatar)
          _login = true
        }
      } catch (e) {
        console.error('Get user info failed:', e)
      }
      return _login
    },
  },
}

export default user
