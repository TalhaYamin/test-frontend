import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser } from '../../store/slices/userSlice/apis';
import { getAllUsers } from '../../store/slices/userSlice/selector';

const BulletList = () => {
    const [text, setText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    const userData = useSelector(getAllUsers);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleSubmit = () => {
        if (selectedItem !== null) {
            const userId = selectedItem?._id
            dispatch(updateUser({ userId, text: selectedItem?.text })).then(res => {
                if (res) {
                    setSelectedItem(null);

                }
            })
        } else {
            dispatch(createUser({ text }));
            setText('')
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setText('')
    };

    return (
        <div style={{ margin: "40px", padding: "20px", width: '500px', backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", borderRadius: "20px" }}>
            <textarea
                value={text}
                onClick={() => setSelectedItem(null)}
                onChange={handleInputChange}
                style={{ width: "80%", padding: "10px" }}
                placeholder='Type Here'
            />

            <ul>
                {userData?.map((item, index) => (
                    <li key={item._id} onClick={() => handleEdit(item)} style={{ padding: '4px' }}>
                        {selectedItem?._id === item?._id ? (
                            <input
                                value={selectedItem?.text}
                                onChange={(e) => { setSelectedItem({ ...selectedItem, text: e.target.value }) }}
                                style={{ width: "80%" }}
                            />
                        ) : (
                            item.text
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit} disabled={!text && !selectedItem?.text && true}>{selectedItem ? 'Update' : 'Submit'}</button>
        </div>
    );
};

export default BulletList;
