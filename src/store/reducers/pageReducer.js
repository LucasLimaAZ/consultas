const initState = {
    pageTitle: "Gerenciador de consultas"
}

const pageReducer = (state = initState, action) => {
    switch (action.type){
        case "SET_PAGE_TITLE":
            return {
              pageTitle: action.payload  
            };

        default:
            return state;
    }
}

export default pageReducer;