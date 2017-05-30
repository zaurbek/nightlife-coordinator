export default (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_LOCATION':
            return {
                ...state,
                data: action.payload.businesses?action.payload.businesses:[],
                isLoading: false
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state;
    }
};