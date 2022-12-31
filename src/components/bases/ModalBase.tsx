import React, { ReactNode } from 'react';
import styled, { DefaultTheme, keyframes } from 'styled-components';
import { ButtonStyleEnum, IconTypeEnum, SizeEnum } from '../../types/types';
import { ModalButton } from '../../types/types'
import { CoolButton } from '../atom/CoolButton';
import { device } from '../../StyledTheme';
import { CoolIcon } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';


const MainBox = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    height: 100vh;
    background: ${props => props.theme.color.modalBackground};
    backdrop-filter: blur(5px);
    display: flex;
    z-index: 40;
    justify-content:center;

`;

interface ModalProps {
    size?: SizeEnum;
}

interface SizeInfo {
    width: number;  //UNIT: %
    height: number; //UNIT: vh
    maxHeight: number; //UNIT: px
}

const getSize = (size?: SizeEnum): SizeInfo => {
    switch (size) {
        case SizeEnum.L:
            return { width: 75, height: 60, maxHeight: 700 }
        case SizeEnum.M:
            return { width: 60, height: 45, maxHeight: 450 }
        case SizeEnum.S:
            return { width: 40, height: 35, maxHeight: 250 }
        case SizeEnum.XS:
            return { width: 40, height: 25, maxHeight: 215 }
        case SizeEnum.M_VERTICAL:
            return { width: 30, height: 70, maxHeight: 1000 }
        default:
            return { width: 60, height: 45, maxHeight: 215 }
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
    animation: ${insideModalAnimation};
    animation-duration: 0.2s;
    width: ${props => `${getSize(props.size).width}%`};
    margin-top: 20vh;
    min-width: 320px;
    max-height: ${props => `${getSize(props.size).maxHeight}px`};
    height: ${props => `${getSize(props.size).height}vh`};
    display: flex;
    flex-direction: column;
    max-width: ${props => props.size === SizeEnum.S ? '425px' : undefined};
    background: ${props => props.theme.color.lightBackground};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius:12px;
    `;

const ModalHeader = styled.div<ModalProps>`
    width:100%;
    height: 4vh;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 5%;
    & h2 {
        color: ${props => props.theme.color.lightFont};
        @media ${device.laptop} { 
            font-size: ${props => props.theme.fontSize.title}
        }
        @media ${device.desktopL} { 
            font-size: 2rem
        }

    }
    & button {
        color: ${props => props.theme.color.lightFont};
        font-size: 1.4rem;
        background: none;
        border: none;
        padding: 0;
        transition: color .1s;
        display:flex;
        justify-content: center;
    }
    & button:hover {
        transition: color .1s;
        color: ${props => props.theme.color.highlightColor};

    }
`;


const ModalBody = styled.div<ModalProps>`
    box-sizing: border-box;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
`;
const ModalFooter = styled.div<ModalProps>`
    padding: 0 5%;
    box-sizing: border-box;
    display:flex;
    height: 70px;
    min-height: 70px;
    gap: 5%;
    justify-content: flex-end;
    align-items: center;
`;

{/*<><button onClick={onConfirm}><AiOutlineSend />{'Sí'}</button>
<button onClick={onClear}><AiOutlineSend />{'No'}</button></>*/
}


export function ModalBase({ children, title, size, onClose, buttons }: { children: ReactNode, onClose: () => void, title?: string, size?: SizeEnum, buttons?: ModalButton[] }) {

    return (
        <MainBox>

            <InsideBox size={size} >
                <ModalHeader size={size} >
                    <h2>{title}</h2>
                    <CoolIconButton buttonStyle={ButtonStyleEnum.OUTLINE} clickFun={() => { onClose() }} type={IconTypeEnum.CLOSE} size={SizeEnum.XS} />
                </ModalHeader>
                {children ?
                    <ModalBody size={size}>
                        {children}
                    </ModalBody> : undefined
                }
                <ModalFooter size={size}>
                    {buttons?.map((button) =>
                        <CoolButton type={button.type} size={SizeEnum.XS} clickFun={button.onClick} />
                    )}
                </ModalFooter>

            </InsideBox>
        </MainBox >
    )
}