import styled from 'styled-components';
import { device } from '../../StyledTheme';


interface FormProps {
    nColumns?: number;
}

const MainBox = styled.div<FormProps>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
    width: ${props => props.nColumns ? `${100 / props.nColumns}%` : '100%'};
    @media ${device.tablet} { 
        width: 100%;
    }
`
const StyledLabel = styled.label`
    font-size: ${props => props.theme.fontSize.highText};
    color: ${props => props.theme.color.main.n};
    font-weight: bold;
`
const InputBox = styled.div`

`

export function CoolFormField({ label, children, nColumns }: { label: string, children?: JSX.Element | JSX.Element[], nColumns?: number }) {
    return (
        <MainBox nColumns={nColumns}>
            <StyledLabel>{label}</StyledLabel>
            <InputBox>{children}</InputBox>
        </MainBox>
    )
}
