import React, { useEffect, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { ContextOption, Page, SizeEnum } from '../../types/types';
import { useRecoilValue } from 'recoil';
import { clearContextAtom } from '../../recoil/mainAtoms';
import { CoolPagination } from '../molecule/CoolPagination';
import { device } from '../../StyledTheme';
import { ContextMenuPosition, CoolContextMenu } from '../molecule/CoolContextMenu';
import { PulseLoader } from 'react-spinners';


interface SizeProps {
    widthProp?: number;
    heightProp?: number;
}

interface TableProps extends SizeProps {
    contextVisible: boolean;
}


interface RowProps {
    selected: boolean;
}


const MainBox = styled.div<SizeProps>`
    width: ${(props) => `${props.widthProp !== undefined ? props.widthProp : 80}%`} ;
    height: ${(props) => `${props.heightProp !== undefined ? props.heightProp : 60}vh`} ;
`;


const TableBox = styled.div<TableProps>`
    width: 100% ;
    height: 100% ;
    position: relative;
    overflow: ${(props) => `${props.contextVisible ? 'auto' : 'auto'}`};
`;


const StyledTable = styled.table`
    color: ${(props) => props.theme.color.lightFont} ;
    width: 100%;
    height: 100%;
    cursor: default;
    border-spacing: 0;
    overflow: auto;
    & thead {
        width: 100%;
        z-index: 3;
        color: ${(props) => props.theme.color.lightFont};
        background: ${(props) => props.theme.color.mainColor};
        font-size: ${(props) => props.theme.fontSize.title};
        height: 8vh;
        @media ${device.desktopL} { 
            height: 5vh;
        }
        box-sizing: border-box;
        position: sticky;
        top: 0;
    }
    & tbody {
        position:relative;
        width: 100%;
        text-align: center;

        color: ${(props) => props.theme.color.mainColor};
    }
    & th {
        width: 33%;
        background: ${(props) => props.theme.color.mainColor};
    }
    & tr {
        @media ${device.desktopL} { 
            line-height: 4vh;
        }
        line-height: 6vh;
    }

    & tbody tr:hover {
        background: ${props => props.theme.color.secondColor} !important;
        color: ${(props) => props.theme.color.lightFont};
    }
    & tr:nth-child(odd) {
        background: ${(props) => props.theme.color.lightBackground};
    }
    & td{  
    } 
`;

interface TableBodyProps {
    isLoading?: boolean
}

const StyledTableBody = styled.tbody<TableBodyProps>`
`


const RowSelectedStyle = styled.tr<RowProps>`
background: ${(props) => props.selected ? props.theme.color.secondColor : undefined} !important;
color: ${(props) => props.selected ? props.theme.color.lightFont : undefined} !important;
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
    width: 100%;
    top:0;
    animation-name: ${opacity};
    animation-duration: 0.5s;
    background: ${props => props.theme.color.modalBackground};
    position: sticky;
    opacity: .4;
    display: flex;
    justify-content: center;
    align-items: center;
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


export function CoolTable({ width, height, headers, data, setPage, contextOptions, isLoading = false }: {
    width?: number, height?: number, size?: SizeEnum, headers: string[], data?: Page<any>,
    setPage?: React.Dispatch<React.SetStateAction<number>>, contextOptions?: ContextOption[], isLoading?: boolean
}) {


    const [contextMenuProps, setContextMenuProps] = useState<ContextMenuPosition>({ top: 0, left: 0, visible: false })
    const [selectedElements, setSelectedElements] = useState<string[]>([])
    const clearContext = useRecoilValue<boolean>(clearContextAtom)

    useEffect(() => {
        setContextMenuProps({ visible: false, top: 0, left: 0 })
        setSelectedElements([])
    }, [clearContext, data?.page])


    const addSelectedElement = (id: string) => {
        setSelectedElements((old) =>
            [id, ...old]
        )
    }
    const onOpenContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
        if (contextOptions) {
            e.preventDefault()
            setSelectedElements([])
            addSelectedElement(id)
            setContextMenuProps({ top: e.clientY, left: e.clientX, visible: true })
        }
    }


    const theme = useTheme()


    return (
        <MainBox widthProp={width} heightProp={height}>
            <TableBox contextVisible={contextMenuProps.visible}>
                {isLoading ?
                    <LoadingIconBlur widthProp={width} heightProp={height}>
                        <LoadingIconBox>
                            <LoadingIconInsideBox>
                                <PulseLoader size={30} color={theme.color.bgColor} />
                            </LoadingIconInsideBox>
                        </LoadingIconBox>
                    </LoadingIconBlur>
                    : undefined}
                <StyledTable>
                    <thead>
                        <tr>
                            {headers.map((header) =>
                                <th key={`key_${header}`}>
                                    {header}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <StyledTableBody isLoading={isLoading}>
                        {data ? data.content.map((element) =>
                            <RowSelectedStyle key={`element_${element.id}`} selected={selectedElements.includes(element.id)} onContextMenu={(e) => { onOpenContextMenu(e, element.id) }}>
                                {headers.map((header) =>
                                    <td key={`element_${element.id}_${header}`}>{element[header]}</td>
                                )}
                            </RowSelectedStyle>)
                            : <></>}
                    </StyledTableBody>
                </StyledTable>
            </TableBox>
            {setPage && data ?
                <CoolPagination page={data?.page ? data.page : 0} setPage={setPage} totalPages={data?.totalPages} isLoading={isLoading} />
                :
                undefined
            }
            {contextOptions ?
                <CoolContextMenu top={contextMenuProps.top} left={contextMenuProps.left} visible={contextMenuProps.visible} options={contextOptions} selectedElements={selectedElements}></CoolContextMenu>
                : undefined
            }
        </MainBox>
    )
}