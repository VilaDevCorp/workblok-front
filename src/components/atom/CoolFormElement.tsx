import styled from 'styled-components';


interface FormElementProps {
    fullWidth?: boolean
}

const MainBox = styled.div<FormElementProps>`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: ${props => props.fullWidth ? '100%' : '40%'};
    margin-right: 10%;
    margin-bottom: 4vh;
`
const StyledLabel = styled.label`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.main.l6};
    font-weight: bold;
`
const InputBox = styled.div`

`

export function CoolFormElement({ label, children, fullWidth }: { label: string, children: JSX.Element | JSX.Element[], fullWidth?: boolean }) {

    return (
        <MainBox fullWidth={fullWidth} >
            <StyledLabel>{label}</StyledLabel>
            <InputBox>{children}</InputBox>
        </MainBox>
    )
}