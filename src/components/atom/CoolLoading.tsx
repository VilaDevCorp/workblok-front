import { ClipLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import { useMisc } from '../../hooks/useMisc';


const MainBox = styled.div`
    position: absolute;
    width: 100%;
    top:0;
    display: flex;
    height: 100vh;
    & span {
        margin:auto;
    }
`;

export function CoolLoading() {

    const { isLoading } = useMisc()
    const theme = useTheme()

    return (
        isLoading ?
            <MainBox>
                <ClipLoader color={theme.color.main.n}
                    loading={isLoading} size={100} />
            </MainBox>
            :
            <></>
    )
}