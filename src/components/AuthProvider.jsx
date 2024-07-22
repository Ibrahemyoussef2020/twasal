"use client";

import {SessionProvider} from 'next-auth/react';
import {RecoilRoot} from 'recoil';

const AuthProvider = ({session, children})=>{
    return <SessionProvider session={session}>
            <RecoilRoot>
                {children}
            </RecoilRoot>
    </SessionProvider>
}

export default AuthProvider


