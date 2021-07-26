import storage from 'store'
import {ITSM_TICKET_ID, ITSM_TYPE} from "@/store/mutation-types";
// 2020-11-2 调整用户登录的逻辑

const itsm = {
  state: {
    itsmTicketId: '',
    itsmType: ''
  },

  mutations: {
    SET_ITSM_TICKET_ID: (state, itsmTicketId) => {
      state.itsmTicketId = itsmTicketId
    },
    SET_ITSM_TYPE: (state, itsmType) => {
      state.itsmType = itsmType
    }
  },

  actions: {
  }
};

export default itsm
