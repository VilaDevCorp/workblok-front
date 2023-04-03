import { useRef } from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useMisc } from '../../hooks/useMisc';
import { ContextOption, CoolContextOption } from '../atom/CoolContextOption';


export interface ContextMenuPosition {
    top: number;
    left: number;
    visible: boolean;
    invertedX?: boolean;
    invertedY?: boolean;
    nOptions?: number;
}

const MainBox = styled.div<ContextMenuPosition>`
    display: flex;
    cursor: default;
    flex-direction: column;
    border-radius: 12px;
    position: absolute;
    width: 125px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;  
    top: ${props => `${props.top - (props.invertedY && props.nOptions ? 46 * props.nOptions : 0)}px`};
    left: ${props => `${props.left - (props.invertedX ? 125 : 0)}px`};
    z-index: 10;
`;



export function CoolContextMenu({ visible, top, left, invertedX, invertedY, options, selectedElements }: {
    visible: boolean, top: number, left: number,
    invertedX?: boolean, invertedY?: boolean, options: ContextOption[], selectedElements: string[]
}) {

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const { setClearContext } = useMisc()

    useClickOutside(wrapperRef, () => setClearContext((old) => !old));

    return (
        visible ?
            <MainBox ref={wrapperRef} top={top} left={left} invertedX={invertedX} invertedY={invertedY} nOptions={options.length} visible={visible}>
                {options.map((option) =>
                    <CoolContextOption key={option.type} type={option.type} disabled={selectedElements.length > 1 && !(option.multi)}
                        onClick={() => option.onClick(selectedElements)} label={option.label}></CoolContextOption>
                )}
            </MainBox >
            : <></>

    )
}