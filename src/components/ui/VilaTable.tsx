import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { PuffLoader, PulseLoader } from 'react-spinners';
import { useMisc } from '../../hooks//useMisc';
import { VilaTextInput } from './VilaTextInput';
import { ContextMenuPosition, ContextOption, VilaContextMenu } from './VilaContextMenu';


export interface TableCell {
    displayFields: (string | JSX.Element)[]
    realEntity: unknown
}

type Props = {
    headers: string[]
    data: TableCell[]
    contextOptions?: ContextOption[]
    isLoading?: boolean
    searchKey?: string
    setSearchKey?: React.Dispatch<SetStateAction<string>>
    buttons?: JSX.Element[]
}

export function VilaTable(props: Props) {


    const [contextMenuProps, setContextMenuProps] = useState<ContextMenuPosition>({ top: 0, left: 0, visible: false })
    const [selectedElements, setSelectedElements] = useState<Map<number, unknown>>(new Map<number, unknown>())

    const { clearContext} = useMisc()

    const [loadingContainerHeight, setLoadingContainerHeight] = useState<number>()
    const loadingContainer = useRef<HTMLDivElement>(null)

    const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);

    useEffect(() => {
        setLoadingContainerHeight(loadingContainer.current?.clientHeight)
    }, [])


    useEffect(() => {
        setContextMenuProps({ visible: false, top: 0, left: 0 })
        setSelectedElements(new Map<number, unknown>())
    }, [clearContext])


    const onSelect = (index: number) => {
        setContextMenuProps({ visible: false, top: 0, left: 0 })
        if (selectedElements.has(index)) {
            setSelectedElements((oldValue) => {
                oldValue.delete(index)
                return oldValue
            })
        } else {
            setSelectedElements((oldValue) => {
                console.log(oldValue)
                oldValue.set(index, props.data[index].realEntity)
                return oldValue
            })
        }
    }

    const onOpenContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, index: number) => {
        if (props.contextOptions) {
            e.preventDefault()
            if (!selectedElements.has(index)) {
                setSelectedElements(new Map<number, unknown>([[index, props.data[index].realEntity]]))
            }
            setContextMenuProps({
                top: e.pageY, left: e.pageX, visible: true, nOptions: props.contextOptions.length,
                invertedX: e.clientX > window.innerWidth / 2, invertedY: e.clientY > innerHeight / 2
            })
        }
    }

    return (
        <div className='w-full flex flex-col h-full'>
            <div className='flex gap-4 flex-col md:flex-row'>
                {props.searchKey !== undefined && props.setSearchKey ?
                    <div className='min-w-[50%]'>
                        <VilaTextInput icon={'search'} value={props.searchKey} setValue={props.setSearchKey} />
                    </div>
                    :
                    undefined
                }
                {props.buttons &&
                    <div className='ml-auto flex gap-3'>
                        {props.buttons}
                    </div>
                }
            </div>
            <div className='w-full h-full overflow-auto mt-4 relative' ref={loadingContainer}>
                {props.isLoading &&
                    <div style={{ height: `${loadingContainerHeight}px`, marginTop: `-${loadingContainerHeight}px` }} className={`w-full sticky justify-center items-center flex top-0 bg-background-900 z-10 opacity-80`}>
                        <div className='w-full h-full flex justify-center items-center'>
                            <div className='w-full flex sticky justify-center align-middle backdrop-opacity-50 '>
                                <PuffLoader size={100} color={'#77B78E'} />
                            </div>
                        </div>
                    </div>
                }
                <table className='w-full leading-10  rounded-lg'>
                    <thead className='w-full text-lightFont-500 text-left sticky top-0 bg-background-900'>
                        <tr>
                            {props.headers.map((header) =>
                                <th key={`key_${header}_header`} className={`px-4 py-3`}>
                                    {header.toUpperCase()}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody ref={tableBodyRef} className='text-lightFont-500'>
                        {props.data && props.data.map((element, index) => {
                            return <tr key={`table_element_${index}`} className={`leading-[40px] cursor-default border-b border-background-400  
                            ${selectedElements.has(index) ? ' bg-background-300 text-lightFont-500' : ' hover:bg-background-400 hover:text-lightFont-500 '}`}
                                onContextMenu={(e) => { onOpenContextMenu(e, index) }}
                                onClick={() => onSelect(index)}>
                                {element.displayFields.map((field, index) =>
                                    <td key={`table_element_${index}_${index}`} className={`px-4 py-3`} >{field ? field : ''}</td>
                                )}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            {props.contextOptions ?
                <VilaContextMenu top={contextMenuProps.top} left={contextMenuProps.left} visible={contextMenuProps.visible}
                    invertedX={contextMenuProps.invertedX} invertedY={contextMenuProps.invertedY} options={props.contextOptions} selectedElements={Array.from(selectedElements.values())}
                    tableBodyRef={tableBodyRef}></VilaContextMenu>
                : undefined
            }
        </div>
    )
}