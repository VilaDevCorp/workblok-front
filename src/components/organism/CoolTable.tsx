import React, { SetStateAction, useEffect, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { Page } from '../../types/types';
import { CoolPagination } from '../molecule/CoolPagination';
import { ContextMenuPosition, CoolContextMenu } from '../molecule/CoolContextMenu';
import { PulseLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import { useMisc } from '../../hooks/useMisc';
import { ContextOption } from '../atom/CoolContextOption';
import { CoolTextInput } from '../atom/CoolTextInput';
import { IconTypeEnum } from '../atom/CoolIcon';


interface SizeProps {
    widthProp?: number;
    heightProp?: number;
}

interface TableProps extends SizeProps {
    contextVisible: boolean;
}


interface RowProps {
    isSelected?: boolean;
}


const MainBox = styled.div<SizeProps>`
    width: ${(props) => props.widthProp !== undefined ? `${props.widthProp}%` : '100%'} ;
    height: ${(props) => props.heightProp !== undefined ? `${props.heightProp}vh` : '100%'} ;
    display: flex;
    justify-content: center;
`;

const TableWithPagBox = styled.div<SizeProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const TableBox = styled.div<TableProps>`
    width: 100% ;
    height: 100% ;
    position:relative;
    overflow:auto;
    border-right: 0;
    box-sizing: border-box;
    border-radius: 14px;
`;


const StyledTable = styled.table`
    color: ${(props) => props.theme.color.main.l3} ;
    width: 100%;
    top:0;
    cursor: default;
    border-spacing: 0;

    background: ${(props) => props.theme.color.background.l1};
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
        color: ${(props) => props.theme.color.main.l7};
    }
    & th {
        background: ${(props) => props.theme.color.main.l3};
        color: ${(props) => props.theme.color.background.l1};
        padding: .3rem .2rem;
        text-align:center;
    }
    & thead tr {
        line-height: 45px;
    }

    & tbody tr {
        line-height: 35px;
    }

    & td{  
        border-bottom: 1px solid ${props => props.theme.color.main.lowOp};
        padding: .3rem .2rem;
        text-align: center;
    } 
`;

interface TableBodyProps {
    isLoading?: boolean
}

const StyledTableBody = styled.tbody<TableBodyProps>`
    padding-bottom: 50px;
`

const TableHeader = styled.th<HeaderData>`
    width: ${props => props.width};
`

export interface HeaderData {
    name?: string;
    width: string;
}



const RowSelectedStyle = styled.tr<RowProps>`
    &:hover {
     background: ${props => props.isSelected ? undefined : props.theme.color.main.l5} !important;
     color: ${props => props.isSelected ? undefined : props.theme.color.main.d7} !important;
    }
    background: ${(props) => props.isSelected ? props.theme.color.main.l1 : undefined} !important;
    color: ${(props) => props.isSelected ? props.theme.color.main.l7 : undefined} !important;
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
    background: ${props => props.theme.color.main.lowOp};
    position: sticky;
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

const SearchBarBox = styled.div`
    margin-bottom: 20px;
    min-width: 250px;
    width: 20%;
    max-width: 100%;
`

export function CoolTable({ id, headers, data, setPage, contextOptions, isLoading, page, searchKey, setSearchKey }: {
    id: string, headers: HeaderData[], data?: Page<any>, page?: number,
    setPage?: React.Dispatch<React.SetStateAction<number>>, contextOptions?: ContextOption[], isLoading?: boolean,
    searchKey?: string, setSearchKey?: React.Dispatch<SetStateAction<string>>
}) {


    const [contextMenuProps, setContextMenuProps] = useState<ContextMenuPosition>({ top: 0, left: 0, visible: false })
    const [selectedElements, setSelectedElements] = useState<string[]>([])
    const { clearContext } = useMisc()
    const { t } = useTranslation()

    useEffect(() => {
        setContextMenuProps({ visible: false, top: 0, left: 0 })
        setSelectedElements([])
    }, [clearContext, data?.page])


    const onSelect = (id: string) => {
        if (selectedElements.includes(id)) {
            setSelectedElements((oldValue) => oldValue.filter((elementId) => elementId !== id))
        } else {
            setSelectedElements((oldValue) => [id, ...oldValue])
        }
    }
    const onOpenContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
        if (contextOptions) {
            e.preventDefault()
            if (!selectedElements.includes(id)) {
                setSelectedElements([id])
            }
            setContextMenuProps({
                top: e.clientY, left: e.clientX, visible: true, nOptions: contextOptions.length,
                invertedX: e.clientX > window.innerWidth / 2, invertedY: e.clientY > innerHeight / 2
            })
        }
    }

    const theme = useTheme()


    return (
        <MainBox>
            <TableWithPagBox>
                {searchKey !== undefined && setSearchKey ?
                    <SearchBarBox>
                        <CoolTextInput key='search_input' id='search' iconType={IconTypeEnum.SEARCH} value={searchKey} setValue={setSearchKey} />
                    </SearchBarBox>
                    :
                    undefined
                }
                <TableBox contextVisible={contextMenuProps.visible}>
                    {isLoading ?
                        <LoadingIconBlur>
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
                                        {t(`table.${id}.${header.name}`)}
                                    </TableHeader>
                                )}
                            </tr>
                        </thead>
                        <StyledTableBody isLoading={true}>
                            {data?.content ? data.content.map((element) => {
                                const isSelected = selectedElements?.includes(element.id)
                                return <RowSelectedStyle key={`element_${element.id}`} isSelected={isSelected}
                                    onContextMenu={(e) => { onOpenContextMenu(e, element.id) }}
                                    onClick={() => onSelect(element.id)}>
                                    {headers.map((header) =>
                                        <td key={`element_${element.id}_${header.name}`}>{header.name ? element[header.name] : ''}</td>
                                    )}
                                </RowSelectedStyle>
                            })
                                : <></>}
                        </StyledTableBody>
                    </StyledTable>
                </TableBox>
                {setPage && page !== undefined ?
                    <CoolPagination page={page} setPage={setPage} totalPages={data?.totalPages ? data?.totalPages : 0} isLoading={isLoading} />
                    :
                    undefined
                }
                {contextOptions ?
                    <CoolContextMenu top={contextMenuProps.top} left={contextMenuProps.left} visible={contextMenuProps.visible}
                        invertedX={contextMenuProps.invertedX} invertedY={contextMenuProps.invertedY} options={contextOptions} selectedElements={selectedElements}></CoolContextMenu>
                    : undefined
                }
            </TableWithPagBox>
        </MainBox>
    )
}