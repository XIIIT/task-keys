import { useState, useEffect, useRef } from 'react';
import { IItem } from './index';

interface KeysProps {
    initialData: IItem[];
    sorting: 'ASC' | 'DESC';
}

export function Keys(props: KeysProps) {
    const { initialData, sorting } = props;
    const [data, setData] = useState<IItem[]>(initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const currentSorting: 'ASC' | 'DESC' = sorting;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const sortData = () => {
            const sortedData = [...props.initialData].sort((a, b) => {
                console.log(a, b);
                if (currentSorting === 'ASC') {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });

            setData(sortedData);
            console.log(sortedData);
        };

        sortData();
        console.log(sorting);
    }, [sorting]);

    const handleNameClick = (id: number, name: string) => {
        setEditingId(id);
        setEditedName(name);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleSave = () => {
        setData(
            data.map((item) =>
                item.id === editingId ? { ...item, name: editedName } : item,
            ),
        );
        setEditingId(null);
        setEditedName('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedName('');
    };

    useEffect(() => {
        if (editingId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    return (
        <>
            <ul>
                {data.map((item) => {
                    return (
                        <li key={item.id}>
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={handleInputChange}
                                    onKeyDown={handleInputKeyDown}
                                    ref={inputRef}
                                />
                            ) : (
                                <span
                                    onClick={() =>
                                        handleNameClick(item.id, item.name)
                                    }
                                >
                                    {item.name}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
