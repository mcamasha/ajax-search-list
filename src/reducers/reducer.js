const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SEND_REQUEST':
            return [
                ...state,
                action.request
            ];
        // еще какой то случай
        default:
            return state
    }
}

export default reducer;