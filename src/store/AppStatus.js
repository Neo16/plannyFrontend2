export class AppStatusState {
    isLoading
}

export const appStatusReducer = (state, action) => {
    switch (action.type){
        default: return state || { isLoading: false }
    }
}
