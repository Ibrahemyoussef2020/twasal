import {atom} from 'recoil';

export const atomModalState = atom({
    key:'atom-state-to-comments',
    default:false,
});

export const atomPostIdState = atom({
    key:'atom-state-to-comments-id',
    default:'',
});

