import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../index';
import { http, TOKEN_USER, USER_LOGIN } from '../../util/config'


let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const initialState = {
    userLogin: user,
    thongTinNguoiDung:{

    }
}

const UserReducer = createSlice({
    name: 'UserReducer',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            const userLogin = action.payload
            state.userLogin = userLogin
            localStorage.setItem(USER_LOGIN,JSON.stringify(userLogin))
            localStorage.setItem(TOKEN_USER,userLogin.accessToken)
        },
        lichSuDatVeAction: (state,action) => {
            state.thongTinNguoiDung = action.payload 
        }
    },
})

export const { loginAction,lichSuDatVeAction } = UserReducer.actions

export default UserReducer.reducer

//=================== asyn action ===================
export const userLoginApi = (userLogin) => {
    return async (dispatch) => {
        try {
            let result = await http.post('QuanLyNguoiDung/DangNhap', userLogin)
            //let result = await managerMovieService.layDanhSachBanner();
            if (result.status === 200) {
                const action = loginAction(result.data.content)
                dispatch(action)
               
            }
            history.back();
        } catch (errors) {
            console.log('errors', errors.response.data)
        }
        
    }
}

export const lichSuDatVeApi = () => {
    return async (dispatch) => {
        try {
            let result = await http.post('QuanLyNguoiDung/ThongTinTaiKhoan')
            //let result = await managerMovieService.layDanhSachBanner();
            if (result.status === 200) {
                const action = lichSuDatVeAction(result.data.content)
                dispatch(action)
               
            }
        } catch (errors) {
            console.log('errors', errors)
        }
        
    }
}
