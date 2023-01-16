import React, {  } from 'react';
import { ClipLoader } from 'react-spinners';
import {  useRecoilValue } from 'recoil';
import { isLoading } from '../../recoil/mainAtoms';
import { stylesVars } from '../../utils/stylesVars';

export function Loading () {
    
    const isLoadingState = useRecoilValue<boolean>(isLoading)

    return (
        false ? 
        <div id='loading'>
            <ClipLoader color={stylesVars.colors.main} loading={isLoadingState} size={150}/>
        </div>
        :
        <></>
        
)
}