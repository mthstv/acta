export default function user(state = {}, action) {
    // { type: 'LOGIN_USER', user }
    switch(action.type) {
        case 'GET_USER_DATA':
            return action.user
        default:
            return state
    }
}