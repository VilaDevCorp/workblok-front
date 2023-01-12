import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { IconTypeEnum, SelectOption, SizeEnum } from '../../types/types';
import { SelectBase } from '../bases/SelectBase';
import { device } from '../../StyledTheme';
import { TextInputBase, TextInputTypeEnum } from '../bases/TextInputBase';
import { CoolTextInput } from './CoolTextInput';
import { CoolIcon } from './CoolIcon';


interface SizeProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

interface AllProps extends SizeProps {
}

const MainBox = styled.div`
    display:flex;
    align-items: center;
    & svg {
        font-size: 1.5rem;
        margin-right: 5px;
        color: ${props => props.theme.color.main.l3}
    }
`;

export function CoolSearchBar({className,  id, value, setValue, size, type = TextInputTypeEnum.TEXT }: {
    className?:string, id: string, value: string, setValue: (value: string) => void, size?: SizeEnum, type?: TextInputTypeEnum
}) {

    return (
        <MainBox className={className}>
            <CoolIcon type={IconTypeEnum.SEARCH} />
            <CoolTextInput id={id} value={value} setValue={setValue} />
        </MainBox>
    )
}