const initialState = JSON.parse(localStorage.getItem('user'));

export default function user(state = initialState, action) {
    // { type: 'LOGIN_USER', user }
    switch(action.type) {
        case 'SAVE_USER_DATA':
            return action.user
        default:
            return state
    }
}