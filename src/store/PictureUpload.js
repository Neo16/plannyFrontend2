export class PictureUpload {
    uplodedPictureUrl;
    UploadedPictureName;
}

export const pictureUploadReducer = (state, action) => {
    switch (action.type) {
        case 'UPLOAD_PIC_REQUEST':
            return {
                ...state,
                isLoading: !state.isLoading
            }
        case 'UPLOAD_PIC_SUCCESS':
            return {
                ...state,
                UploadedPictureName: action.picName,
                uplodedPictureUrl: 'https://edemstorage.blob.core.windows.net/pictures-container/'
                    + action.picName,
                isLoading: !state.isLoading
            }

        default: return state ||
        {
            uplodedPictureUrl: null,
            UploadedPictureName: null,
        };
    }
}
