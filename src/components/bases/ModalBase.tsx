import { ReactNode, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { device } from '../../StyledTheme';
import {SizeEnum } from '../../types/types';
import { IconTypeEnum } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';


const MainBox = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    height: 100vh;
    @media ${device.tablet} { 
        height: 100%;
    }
    background: ${props => props.theme.color.background.lowOp};
    backdrop-filter: blur(5px);
    display: flex;
    z-index: 40;
    justify-content:center;
    align-items: center;
`;

interface ModalProps {
    sizeInfo?: SizeInfo;
}

interface SizeInfo {
    width?: number;  //UNIT: vw
    height?: number; //UNIT: vh
    maxHeight: number; //UNIT: px
    maxWidth: number; //UNIT: px
}

const getSize = (size?: SizeEnum): SizeInfo => {
    switch (size) {
        case SizeEnum.L:
            return { width: 90, height: 90, maxHeight: 1000, maxWidth: 2000 }
        case SizeEnum.M:
            return { width: 75, height: 75, maxHeight: 800, maxWidth: 1600 }
        case SizeEnum.S:
            return { width: 50, height: 50, maxHeight: 600, maxWidth: 1200 }
        case SizeEnum.XS:
            return { width: 40, height: 40, maxHeight: 300, maxWidth: 600 }
        default:
            return { width: undefined, height: undefined, maxHeight: 300, maxWidth: 600 }
    }
}

const insideModalAnimation = keyframes`
  from {
    transform: scale(0);
    }

  to {
    transform: scale(1);
  }  
`

const InsideBox = styled.div<ModalProps>`
    position:relative;
    animation: ${insideModalAnimation};
    animation-duration: 0.2s;
    display: flex;
    border-radius: 14px;
    flex-direction: column;
    background: ${props => props.theme.color.background.n};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    width: ${props => props.sizeInfo ? `${props.sizeInfo.width}vw` : undefined};
    height: ${props => props.sizeInfo ? `${props.sizeInfo.height}vh` : undefined};
    max-width: ${props => props.sizeInfo ? `${props.sizeInfo.maxWidth}px` : undefined};
    max-height: ${props => props.sizeInfo ? `${props.sizeInfo.maxHeight}px` : undefined};
    min-height: 200px;

    @media ${device.tablet} { 
        width: 90vw;
        height: 90%;
        max-width: 100vw;
        max-height: 100vh;
    }

`;

const ModalHeader = styled.div<ModalProps>`
    width:100%;
    height: 60px;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 14px 20px;
    background: ${props => props.theme.color.main.l3};
    & h2 {
        font-weight: normal;
        font-size: ${props => props.theme.fontSize.h2};
        color: ${props => props.theme.color.background.n};
    }
`;


const ModalBody = styled.div<ModalProps>`
    box-sizing: border-box;
    overflow-y: auto;
    flex-grow: 1;
    color: ${props => props.theme.color.main.d7};
    overflow-x: hidden;
    padding: 14px 20px;
    display:flex;
`;

const ModalFooter = styled.div<ModalProps>`
    display:flex;
    height: 80px;
    padding: 14px 20px;
    @media ${device.tablet} { 
        padding: 10px 7px;
        box-sizing: border-box;
        height: auto;
        justify-content: center;
        flex-wrap: wrap;
    }
    width: 100%;
    margin-top: auto;
    box-sizing: border-box;
    overflow: hidden;
    gap: 20px;
    justify-content: flex-end;
    align-items: center;    
    bottom:0;
    width: 100%;
    border-radius: 14px;
    right:0;
`;




export function ModalBase({ children, title, size, onClose, buttons, header }:
    { children: ReactNode, onClose: () => void, title?: string, size?: SizeEnum, buttons?: JSX.Element[], header?: boolean }) {

    const sizeInfo = getSize(size)

    const closeWhenEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', closeWhenEscape)
        return () => {
            window.removeEventListener('keydown', closeWhenEscape)
        }
    }, [])


    return (
        <MainBox onClick={() => onClose()}>
            <InsideBox sizeInfo={sizeInfo} onClick={(e) => e.stopPropagation()}>
                {true ?
                    <ModalHeader sizeInfo={sizeInfo} >
                        <h2>{title}</h2>
                        <CoolIconButton onClick={() => { onClose() }} type={IconTypeEnum.CLOSE} size={SizeEnum.S} />
                    </ModalHeader>
                    :
                    undefined
                }
                {
                    <ModalBody sizeInfo={sizeInfo}>
                        {children}
                    </ModalBody>
                }
                <ModalFooter sizeInfo={sizeInfo}>
                    {buttons?.map((button) =>
                        button
                    )}
                </ModalFooter>
            </InsideBox>
        </MainBox >
    )
}