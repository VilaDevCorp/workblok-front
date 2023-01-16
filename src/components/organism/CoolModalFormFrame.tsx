import { useModal } from '../../hooks/useModal';
import styled from 'styled-components';


const MainBox = styled.div`
    display:flex;
    flex-direction: column;
    padding: 1vh 5%;
`;

const Title = styled.h1`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.main.l6};
    font-weight :lighter ;
`;

const Fields = styled.div`
    margin: 2vh 0;
    display:flex;
    flex-wrap: wrap;
`;

export function CoolModalFormFrame({ children, title }: { title: string, children?: JSX.Element | JSX.Element[] }) {

    return (
        <MainBox>
            <Title>{title}</Title>
            <Fields>{children}</Fields>
        </MainBox>
    )
}