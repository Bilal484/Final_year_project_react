import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Badge, Nav, Tab } from 'react-bootstrap';
import { 
    getUsersByRole, 
    getCategorizedUsersForAgent, 
    USER_ROLES,
    markMessagesAsRead
} from '../../services/chatAPI';
import './UsersList.css';

const UsersList = ({ onSelectUser }) => {
    const [similarUsers, setSimilarUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterUsers, setFilterUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Role-based state
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    
    const userId = localStorage.getItem('user_id');
    const userRole = localStorage.getItem('roles')?.replace(/"/g, '');
    const isAgent = parseInt(userRole) === USER_ROLES.AGENT;    // Effect to fetch users based on role
    useEffect(() => {
        const fetchUsersByRole = async () => {
            setLoading(true);
            setError(null);
            
            try {
                if (isAgent) {
                    // For agents, get categorized users (sellers and buyers separately)
                    const result = await getCategorizedUsersForAgent(userId);
                    if (result.success) {
                        setSellers(result.sellers);
                        setBuyers(result.buyers);
                        // Set default to show all users
                        const allUsers = [...result.sellers, ...result.buyers];
                        setSimilarUsers(allUsers);
                        setFilterUsers(allUsers);
                    } else {
                        setError(result.error);
                    }
                } else {
                    // For sellers and buyers, get filtered users based on role
                    const result = await getUsersByRole(userRole, userId);
                    if (result.success) {
                        setSimilarUsers(result.users);
                        setFilterUsers(result.users);
                    } else {
                        setError(result.error);
                    }
                }
            } catch (error) {
                console.error("Error fetching users by role:", error);
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        if (userId && userRole) {
            fetchUsersByRole();
        }
    }, [userId, userRole, isAgent]);

    // Function to handle user click, mark messages as read, and update UI accordingly
    const handleUserClick = async (user) => {
        setActiveUser(user.user_id);
        onSelectUser(user);
        
        // Mark messages as read using our service function
        try {
            const result = await markMessagesAsRead(userId, user.user_id);
            
            if (result.success) {
                console.log(`Marked ${result.markedCount} messages as read`);
                
                // Update the unread count in the UI
                const updatedUsers = similarUsers.map(u => ({
                    ...u,
                    unread: u.user_id === user.user_id ? 0 : u.unread,
                }));
                
                setSimilarUsers(updatedUsers);
                setFilterUsers(updatedUsers);
            } else {
                console.error('Error marking messages as read:', result.error);
            }
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
    };    // Function to handle tab changes for agents
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        
        let filteredList = [];
        switch(tab) {
            case 'sellers':
                filteredList = sellers;
                break;
            case 'buyers':
                filteredList = buyers;
                break;
            default:
                filteredList = [...sellers, ...buyers];
                break;
        }
        
        // Apply current search filter if any
        if (search) {
            filteredList = filteredList.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        setFilterUsers(filteredList);
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
            </div>
            
            {/* Role-based tabs for agents */}
            {isAgent && (
                <Nav variant="tabs" className="mb-3 user-role-tabs">
                    <Nav.Item>
                        <Nav.Link 
                            className={activeTab === 'all' ? 'active' : ''} 
                            onClick={() => handleTabChange('all')}
                        >
                            All ({sellers.length + buyers.length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                            className={activeTab === 'sellers' ? 'active' : ''} 
                            onClick={() => handleTabChange('sellers')}
                        >
                            Sellers ({sellers.length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                            className={activeTab === 'buyers' ? 'active' : ''} 
                            onClick={() => handleTabChange('buyers')}
                        >
                            Buyers ({buyers.length})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            )}
            
            {/* Loading and error states */}
            {loading && (
                <div className="text-center p-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading users...</p>
                </div>
            )}
            
            {error && !loading && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            {/* User list */}
            {!loading && !error && filterUsers.length > 0 ? (
                <ListGroup className="user-list custom-scrollbar">
                    {filterUsers.map(user => (
                        <ListGroup.Item
                            key={user.user_id}
                            action
                            onClick={() => handleUserClick(user)}
                            className={`user-list-item ${activeUser === user.user_id ? 'active-user' : ''}`}
                        >
                            <div className="user-item-content">
                                {user.avatar ? (
                                    <img 
                                        src={user.avatar} 
                                        alt={user.name} 
                                        className="user-avatar-image" 
                                    />
                                ) : (
                                    <div className="user-avatar">
                                        {user.initials}
                                    </div>
                                )}
                                <div className="user-info">
                                    <div className="user-name">{user.name}</div>
                                    <div className="user-role">
                                        <small>{user.role_display}</small>
                                    </div>
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
                !loading && !error && (
                    <div className="no-users">
                        <i className="fas fa-users"></i>
                        <p>No users found</p>
                        {search && (
                            <p className="search-tip">Try a different search term</p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default UsersList;
