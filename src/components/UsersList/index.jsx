import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Badge } from 'react-bootstrap';
import './UsersList.css';

const UsersList = ({ onSelectUser }) => {
    const [similarUsers, setSimilarUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterUsers, setFilterUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const userId = localStorage.getItem('user_id');

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
        setActiveUser(user.user_id);
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
        const filtered = similarUsers.filter(user => 
            user.name.toLowerCase().includes(query)
        );
        setFilterUsers(filtered);
    };

    return (
        <div className="users-container">
            <div className="search-container">
                <Form.Control
                    type="text"
                    name="searchUsers"
                    id="searchUsers"
                    placeholder="Search for users..."
                    className="search-input"
                    value={search}
                    onChange={handleSearch}
                />
                {/* <i className="fas fa-search search-icon"></i> */}
            </div>
            
            {filterUsers.length > 0 ? (
                <ListGroup className="user-list custom-scrollbar">
                    {filterUsers.map(user => (
                        <ListGroup.Item
                            key={user.user_id}
                            action
                            onClick={() => handleUserClick(user)}
                            className={`user-list-item ${activeUser === user.user_id ? 'active-user' : ''}`}
                        >
                            <div className="user-item-content">
                                <div className="user-avatar">
                                    {user.name[0].toUpperCase()}
                                </div>
                                <div className="user-info">
                                    <div className="user-name">{user.name}</div>
                                    <div className="user-status">
                                        <span className="status-indicator online"></span>
                                        Online
                                    </div>
                                </div>
                                {user.unread > 0 && (
                                    <Badge bg="danger" className="unread-badge">
                                        {user.unread}
                                    </Badge>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div className="no-users">
                    <i className="fas fa-users"></i>
                    <p>No users found</p>
                    {search && (
                        <p className="search-tip">Try a different search term</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UsersList;
