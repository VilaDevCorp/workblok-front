import React, { SetStateAction, useEffect, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { ContextOption, IconTypeEnum, Page, SizeEnum } from '../../types/types';
import { useRecoilValue } from 'recoil';
import { clearContextAtom } from '../../recoil/mainAtoms';
import { CoolPagination } from '../molecule/CoolPagination';
import { device } from '../../StyledTheme';
import { ContextMenuPosition, CoolContextMenu } from '../molecule/CoolContextMenu';
import { PulseLoader } from 'react-spinners';
// import { CoolSearchBar } from '../atom/CoolSearchBar';
import { User } from '../../types/entities';
import { CoolSearchBar } from '../atom/CoolSearchBar';


interface SizeProps {
    widthProp?: number;
    heightProp?: number;
}

interface TableProps extends SizeProps {
    contextVisible: boolean;
}


interface RowProps {
    selected: boolean;
    picked?: boolean;
}


const MainBox = styled.div<SizeProps>`
    width: ${(props) => `${props.widthProp !== undefined ? props.widthProp : 80}%`} ;
    height: ${(props) => `${props.heightProp !== undefined ? props.heightProp : 60}vh`} ;
    display: flex;
    justify-content: center;
`;

const TableWithPagBox = styled.div<SizeProps>`
    width: 80%;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
`;

const TableBox = styled.div<TableProps>`
    width: 100% ;
    height: 100% ;
    position:relative;
    overflow: ${(props) => `${props.contextVisible ? 'auto' : 'auto'}`};
    overflow-x: hidden;
    border: 1px solid ${props => props.theme.color.mainLowOp};
    border-right: 0;
    border-radius: 12px;

box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;


const StyledTable = styled.table`
    color: ${(props) => props.theme.color.lightFont} ;
    width: 100%;
    top:0;
    cursor: default;
    border-spacing: 0;
    text-align: center;
    background-color: ${props => props.theme.color.background.l1};
    font-size: ${(props) => props.theme.fontSize.regularText};
    & thead {
        width: 100%;
        z-index: 3;
        box-sizing: border-box;
        position: sticky;
        top:0;
        text-align: left;
    }
    & tbody {
        position:relative;
        width: 100%;
        overflow: auto;
    }
    & th {
        background-color: ${props => props.theme.color.background.n};
        color: ${(props) => props.theme.color.lightFont};
        text-align: center;

    }
    & thead tr {
        line-height: 7vh;
        @media ${device.desktopL} { 
            line-height: 4vh;
        }
    }

    & tbody tr {
        line-height: 5vh;
        @media ${device.desktopL} { 
            line-height: 4vh;
        }
    }

    & tbody 
    & td{  
        border-bottom: 1px solid ${props => props.theme.color.mainLowOp};
        padding: 1vh 2%;
    } 
`;

interface TableBodyProps {
    isLoading?: boolean
}

const StyledTableBody = styled.tbody<TableBodyProps>`
`

const TableHeader = styled.th<HeaderData>`
    width: ${props => props.width};
`

interface HeaderData {
    name?: string;
    width: string;
}



const RowSelectedStyle = styled.tr<RowProps>`
    line-height: 5vh;
    @media ${device.desktopL} { 
       line-height: 4vh;
    }
    &:hover {
     background: ${props => props.picked ? undefined : props.theme.color.main.l5} !important;
     color: ${props => props.picked ? undefined : props.theme.color.main.d7} !important;
    }
    opacity: ${(props) => props.picked ? .5 : 1} !important;

    background: ${(props) => props.picked ? props.theme.color.main.l5 : props.selected ? props.theme.color.main.l5 : undefined} !important;
    color: ${(props) => props.selected ? props.theme.color.main.d7 : undefined} !important;
`

const opacity = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const LoadingIconBlur = styled.div<SizeProps>`
    top:0;
    animation-name: ${opacity};
    animation-duration: 0.5s;
    background: ${props => props.theme.color.mainLowOp};
    position: sticky;
    opacity: .4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${(props) => `${props.heightProp !== undefined ? props.heightProp : 60}vh`} ;
    z-index:100;
    margin-top: ${(props) => `-${props.heightProp !== undefined ? props.heightProp : 60}vh`} ;

`


const LoadingIconBox = styled.div`
    width: 100%;
    height: 100%;
`

const LoadingIconInsideBox = styled.div`
    width: 100%;
    position: sticky;
    display: flex;
    justify-content: center;
    top: 50%;`

const ButtonsBox = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    margin-top: 10vh;
`
const StyledCoolSearchBar = styled(CoolSearchBar)`
    margin-bottom: 3vh;
`

export function CoolTable({ width, height, headers, data, setPage, contextOptions, isLoading = false, sideButtons, page, searchKey, setSearchKey, selectedIds, onPick }: {
    width?: number, height?: number, size?: SizeEnum, headers: HeaderData[], data?: Page<any>, page?: number,
    setPage?: React.Dispatch<React.SetStateAction<number>>, contextOptions?: ContextOption[], isLoading?: boolean,
    sideButtons?: JSX.Element[], searchKey?: string, setSearchKey?: React.Dispatch<SetStateAction<string>>, selectedIds?: string[], onPick?: (user: User) => void
}) {


    const [contextMenuProps, setContextMenuProps] = useState<ContextMenuPosition>({ top: 0, left: 0, visible: false })
    const [selectedElement, setSelectedElement] = useState<string>('')
    const clearContext = useRecoilValue<boolean>(clearContextAtom)

    useEffect(() => {
        setContextMenuProps({ visible: false, top: 0, left: 0 })
        setSelectedElement('')
    }, [clearContext, data?.page])


    const onOpenContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
        if (contextOptions) {
            e.preventDefault()
            setSelectedElement(id)
            setContextMenuProps({ top: e.clientY, left: e.clientX, visible: true })
        }
    }

    const theme = useTheme()


    return (
        <MainBox widthProp={width} heightProp={height}>
            <TableWithPagBox widthProp={width} heightProp={height}>
                {searchKey !== undefined && setSearchKey ?
                    <StyledCoolSearchBar key='search_input' id='search' value={searchKey} setValue={setSearchKey} />
                    :
                    undefined
                }
                <TableBox contextVisible={contextMenuProps.visible}>
                    {isLoading ?
                        <LoadingIconBlur widthProp={width} heightProp={height}>
                            <LoadingIconBox>
                                <LoadingIconInsideBox>
                                    <PulseLoader size={30} color={theme.color.background.l1} />
                                </LoadingIconInsideBox>
                            </LoadingIconBox>
                        </LoadingIconBlur>
                        : undefined}

                    <StyledTable>
                        <thead>
                            <tr>
                                {headers.map((header) =>
                                    <TableHeader width={header.width} key={`key_${header.name}`}>
                                        {header.name}
                                    </TableHeader>
                                )}
                            </tr>
                        </thead>
                        <StyledTableBody isLoading={true}>
                            {data ? data.content.map((element: any) => {
                                const isPicked = selectedIds?.includes(element.id)
                                return <RowSelectedStyle key={`element_${element.id}`} selected={selectedElement === element.id} picked={isPicked}
                                    onContextMenu={(e) => { onOpenContextMenu(e, element.id) }}
                                    onClick={onPick && !isPicked ? (e) => onPick(element) : undefined}>
                                    {headers.map((header) =>
                                        <td key={`element_${element.id}_${header}`}>{header.name ? element[header.name] : ''}</td>
                                    )}
                                </RowSelectedStyle>
                            })
                                : <></>}
                        </StyledTableBody>
                    </StyledTable>
                </TableBox>
                {setPage && page !== undefined && data && data.totalPages > 0 ?
                    <CoolPagination page={page} setPage={setPage} totalPages={data.totalPages} isLoading={isLoading} />
                    :
                    undefined
                }
                {contextOptions ?
                    <CoolContextMenu top={contextMenuProps.top} left={contextMenuProps.left} visible={contextMenuProps.visible} options={contextOptions} selectedElement={selectedElement}></CoolContextMenu>
                    : undefined
                }
            </TableWithPagBox>
            <ButtonsBox>
                {sideButtons?.map((button) => button)}
            </ButtonsBox>
        </MainBox>
    )
}