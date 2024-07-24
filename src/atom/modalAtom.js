import {atom} from 'recoil';

export const atomModalState = atom({
    key:'atom-state-to-comments',
    default:false,
});

export const atomPostIdState = atom({
    key:'atom-state-to-comments-id',
    default:'',
});

export const atomIsPrimaryComment = atom({
    key:'atom-is-primary-comment',
    default:true,
});

export const atomCommentDataState = atom({
    key:'atom-state-to-comment-data',
    default:{id:'',name:'',text:''},
});

