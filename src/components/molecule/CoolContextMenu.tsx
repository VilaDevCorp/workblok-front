import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';
import { clearContextAtom } from '../../recoil/mainAtoms';

import { device } from '../../StyledTheme';
import { ContextOption } from '../../types/types';
import { CoolContextOption } from '../atom/CoolContextOption';


export interface ContextMenuPosition {
    top: number;
    left: number;
    visible: boolean;
}

const MainBox = styled.div<ContextMenuPosition>`
    display: flex;
    cursor: default;
    flex-direction: column;
    border-radius: 12px;
    border: ${props => `1px solid ${props.theme.color.main.d1}`};
    position: absolute;
    width: 125px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    top: ${props => `${props.top}px`};
    left: ${props => `${props.left}px`};
    @media ${device.desktopL} {
    }
    z-index: 10;
`;



export function CoolContextMenu({ visible, top, left, options, selectedElement }: { visible: boolean, top: number, left: number, options: ContextOption[], selectedElement: string }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const setClearContext = useSetRecoilState<boolean>(clearContextAtom)

    useClickOutside(wrapperRef, () => setClearContext((old) => !old));

    return (
        visible ?
            <MainBox ref={wrapperRef} top={top} left={left} visible={visible}>
                {options.map((option) =>
                    <CoolContextOption key={option.type} type={option.type} onClick={() => option.onClick(selectedElement)} label={option.label}></CoolContextOption>
                )}
            </MainBox >
            : <></>

    )
}