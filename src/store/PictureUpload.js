export class PictureUpload {
    uplodedPictureUrl; 
}

export const pictureUploadReducer = (state, action) => {
    switch (action.type) {      
        case 'UPLOAD_PICS':
            return {
                ...state,              
                uplodedPictureUrl: action.pictureUrl
            }

        default: return state ||
        {
            uplodedPictureUrl: null,           
        };
    }
}
