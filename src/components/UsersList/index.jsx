import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Badge } from 'react-bootstrap';
import './UsersList.css';

const UsersList = ({ onSelectUser }) => {
    const [similarUsers, setSimilarUsers] = useState([]); // State to hold similar users
    const [search, setSearch] = useState(""); // State to handle search input
    const [filterUsers, setFilterUsers] = useState([]); // State to hold filtered users based on search
    const userId = localStorage.getItem('user_id'); // Fetching user id from localStorage

    // Effect to fetch similar users on component mount
    useEffect(() => {
        const fetchSimilarUsers = async () => {
            try {
                const response = await axios.get(`https://api.biznetusa.com/api/getsimilarusers/${userId}`);
                const similarUsersData = response.data.similar_users ? response.data.similar_users.map(user => ({
                    ...user,
                    unread: 0,
                })) : [];
                setSimilarUsers(similarUsersData);
                setFilterUsers(similarUsersData);
            } catch (error) {
                console.error("Error fetching similar users:", error);
            }
        };

        fetchSimilarUsers();
    }, [userId]);

    // Function to handle user click, mark messages as read, and update UI accordingly
    const handleUserClick = async (user) => {
        onSelectUser(user);
        try {
            await axios.post('https://api.biznetusa.com/api/mark-messages-read', {
                senderId: userId,
                receiverId: user.user_id,
            });

            const updatedUsers = similarUsers.map(u => ({
                ...u,
                unread: u.id === user.id ? 0 : u.unread,
            }));

            setSimilarUsers(updatedUsers);
            setFilterUsers(updatedUsers);
        } catch (err) {
            console.error('Failed to mark messages as read:', err);
        }
    };

    // Function to handle search input changes
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        const filtered = similarUsers.filter(user => user.name.toLowerCase().includes(query));
        setFilterUsers(filtered);
    };

    return (
        <div>
            <Form.Control
                type="text"
                name="searchUsers"
                id="searchUsers"
                placeholder="Enter User Name"
                className="mb-2 p-2"
                value={search}
                onChange={handleSearch}
            />
            <ListGroup className="user-list">
                {filterUsers.map(user => (
                    <ListGroup.Item
                        key={user.user_id}
                        action
                        onClick={() => handleUserClick(user)}
                        className="user-list-item d-flex justify-content-between"
                    >
                        {user.name}
                        {user.unread > 0 && (
                            <Badge bg="danger" className="ms-2">
                                {user.unread}
                            </Badge>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default UsersList;
