import styled from 'styled-components';

interface CoolStyledSelectProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-bottom: 4vh;
`
const StyledLabel = styled.label`
    font-size: ${props => props.theme.fontSize.title};
    color: ${props => props.theme.color.mainColor};
    font-weight: bold;
`
const InputBox = styled.div`

`

export function CoolFormElement({ label, children }: { label: string, children: JSX.Element | JSX.Element[] }) {

    return (
        <MainBox>
            <StyledLabel>{label}</StyledLabel>
            <InputBox>{children}</InputBox>
        </MainBox>
    )
}