import axios from 'axios';
import apiCache from './apiCacheService';

const BASE_URL = 'https://apitourism.today.alayaarts.com/api';

// Role mappings for better code readability
export const USER_ROLES = {
    BUYER: 1,
    SELLER: 2,
    AGENT: 10,
    CONTRACTOR: 14,
    REALTOR: 15,
    DEVELOPER: 17
};

// Get users based on role-based filtering
export const getUsersByRole = async (currentUserRole, currentUserId) => {
    try {
        const response = await axios.get(`${BASE_URL}/all-users`);
        const allUsers = response.data.allusers;
        
        // Filter users based on current user's role
        let filteredUsers = [];
        
        switch (parseInt(currentUserRole)) {
            case USER_ROLES.AGENT:
                // Agents can chat with sellers and buyers
                filteredUsers = allUsers.filter(user => 
                    user.id !== parseInt(currentUserId) && 
                    (parseInt(user.user_role) === USER_ROLES.SELLER || 
                     parseInt(user.user_role) === USER_ROLES.BUYER)
                );
                break;
                
            case USER_ROLES.SELLER:
                // Sellers can only chat with agents
                filteredUsers = allUsers.filter(user => 
                    user.id !== parseInt(currentUserId) && 
                    parseInt(user.user_role) === USER_ROLES.AGENT
                );
                break;
                
            case USER_ROLES.BUYER:
                // Buyers can only chat with agents
                filteredUsers = allUsers.filter(user => 
                    user.id !== parseInt(currentUserId) && 
                    parseInt(user.user_role) === USER_ROLES.AGENT
                );
                break;
                
            default:
                // For other roles, show all users except themselves
                filteredUsers = allUsers.filter(user => 
                    user.id !== parseInt(currentUserId)
                );
                break;
        }
        
        // Add role information for better display
        const usersWithRoleInfo = filteredUsers.map(user => ({
            ...user,
            user_id: user.id,
            role_display: user.roles?.role_name || 'Unknown',
            avatar: user.image ? `https://apitourism.today.alayaarts.com/uploads/users/${user.image}` : null,
            initials: user.name?.charAt(0)?.toUpperCase() || '?'
        }));
        
        return {
            success: true,
            users: usersWithRoleInfo,
            total: usersWithRoleInfo.length
        };
        
    } catch (error) {
        console.error('Error fetching users by role:', error);
        return {
            success: false,
            users: [],
            error: error.message
        };
    }
};

// Categorize users for agents (separate sellers and buyers)
export const getCategorizedUsersForAgent = async (currentUserId) => {
    try {
        const response = await axios.get(`${BASE_URL}/all-users`);
        const allUsers = response.data.allusers;
        
        const sellers = allUsers.filter(user => 
            user.id !== parseInt(currentUserId) && 
            parseInt(user.user_role) === USER_ROLES.SELLER
        ).map(user => ({
            ...user,
            user_id: user.id,
            role_display: 'Seller',
            avatar: user.image ? `https://apitourism.today.alayaarts.com/uploads/users/${user.image}` : null,
            initials: user.name?.charAt(0)?.toUpperCase() || '?'
        }));
        
        const buyers = allUsers.filter(user => 
            user.id !== parseInt(currentUserId) && 
            parseInt(user.user_role) === USER_ROLES.BUYER
        ).map(user => ({
            ...user,
            user_id: user.id,
            role_display: 'Buyer',
            avatar: user.image ? `https://apitourism.today.alayaarts.com/uploads/users/${user.image}` : null,
            initials: user.name?.charAt(0)?.toUpperCase() || '?'
        }));
        
        return {
            success: true,
            sellers,
            buyers,
            totalSellers: sellers.length,
            totalBuyers: buyers.length
        };
        
    } catch (error) {
        console.error('Error fetching categorized users:', error);
        return {
            success: false,
            sellers: [],
            buyers: [],
            error: error.message
        };
    }
};

// Chat API functions using the existing backend endpoints
export const sendMessage = async (senderId, receiverId, message) => {
    try {
        // Ensure parameters are properly formatted before sending to the API
        if (!senderId || !receiverId || !message) {
            throw new Error('Missing required parameters for sending message');
        }
        
        // Ensure IDs are integers (very important for Laravel backend)
        const sId = parseInt(senderId);
        const rId = parseInt(receiverId);
        
        // Debug logging
        // console.log(`Sending message from ${sId} to ${rId}: ${message.substring(0, 20)}${message.length > 20 ? '...' : ''}`);
        
        const response = await axios.post(`${BASE_URL}/storechat`, {
            senderId: sId,
            receiverId: rId,
            message
        });
        
        return { success: true, data: response.data };
        
    } catch (error) {
        console.error('Error sending message:', error);
        // Provide more detail about the error
        return { 
            success: false, 
            error: error.message,
            details: error.response?.data || 'No response details available'
        };
    }
};

export const getMessages = async (senderId, receiverId) => {
    try {
        // Validation
        if (!senderId || !receiverId) {
            throw new Error('Missing required parameters for fetching messages');
        }
        
        // Ensure IDs are integers
        const sId = parseInt(senderId);
        const rId = parseInt(receiverId);
        
        // console.log(`Fetching messages API call: ${BASE_URL}/get-chat/${sId}/${rId}`);
        
        const response = await axios.get(`${BASE_URL}/get-chat/${sId}/${rId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching messages:', error);
        console.error('Response details:', error.response?.data);
        
        return { 
            success: false, 
            error: error.message,
            details: error.response?.data || 'No response details available',
            status: error.response?.status
        };
    }
};

export const getNewMessages = async (senderId, receiverId, lastMessageId) => {
    try {
        // Validation
        if (!senderId || !receiverId || !lastMessageId) {
            throw new Error('Missing required parameters for fetching new messages');
        }
        
        // Ensure IDs are integers
        const sId = parseInt(senderId);
        const rId = parseInt(receiverId);
        const msgId = parseInt(lastMessageId);
        
        const response = await axios.get(`${BASE_URL}/get-new-messages/${sId}/${rId}/${msgId}`);
        return { success: true, data: response.data, count: response.data?.length || 0 };
    } catch (error) {
        console.error('Error fetching new messages:', error);
        return { 
            success: false, 
            data: [],
            count: 0,
            error: error.message,
            details: error.response?.data || 'No response details available'
        };
    }
};

export const markMessagesAsRead = async (senderId, receiverId) => {
    try {
        // Validation
        if (!senderId || !receiverId) {
            throw new Error('Missing required parameters for marking messages as read');
        }
        
        // Ensure IDs are integers
        const sId = parseInt(senderId);
        const rId = parseInt(receiverId);
        
        console.log(`Marking messages as read: From ${sId} to ${rId}`);
        
        const response = await axios.post(`${BASE_URL}/mark-messages-read`, {
            senderId: sId,
            receiverId: rId
        });
        
        return { 
            success: true, 
            data: response.data,
            markedCount: response.data?.marked_as_read || 0
        };
    } catch (error) {
        console.error('Error marking messages as read:', error);
        return { 
            success: false, 
            error: error.message,
            details: error.response?.data || 'No response details available' 
        };
    }
};

export const getUnreadCount = async (senderId, receiverId) => {
    try {
        // Validation
        if (!senderId || !receiverId) {
            throw new Error('Missing required parameters for fetching unread count');
        }
        
        // Ensure IDs are integers
        const sId = parseInt(senderId);
        const rId = parseInt(receiverId);
        
        // Create a cache key based on the sender and receiver IDs
        const cacheKey = `unread-messages-${sId}-${rId}`;
        
        // Use the cache service to fetch or reuse data
        const result = await apiCache.get(cacheKey, async () => {
            const response = await axios.get(`${BASE_URL}/unread-messages/${sId}/${rId}`);
            return { 
                success: true, 
                data: response.data,
                count: response.data?.unread_messages || 0
            };
        });
        
        return result;
    } catch (error) {
        console.error('Error fetching unread count:', error);
        return { 
            success: false, 
            count: 0,
            error: error.message,
            details: error.response?.data || 'No response details available'
        };
    }
};

// Get unread messages for a specific conversation
export const getConversationUnreadCount = async (senderId, receiverId) => {
    try {
        // Create a cache key based on the sender and receiver IDs
        const cacheKey = `unread-messages-${senderId}-${receiverId}`;
        
        // Use the cache service to fetch or reuse data
        return await apiCache.get(cacheKey, async () => {
            const response = await axios.get(`${BASE_URL}/unread-messages/${senderId}/${receiverId}`);
            return { 
                success: true, 
                count: response.data.unread_messages || 0
            };
        });
    } catch (error) {
        console.error(`Error fetching unread messages between ${senderId} and ${receiverId}:`, error);
        return { success: false, count: 0, error: error.message };
    }
};

// Helper function to determine if the user has access to the chat feature based on role
export const hasChatAccess = (userRole) => {
    const role = parseInt(userRole);
    return role === USER_ROLES.AGENT || role === USER_ROLES.BUYER || role === USER_ROLES.SELLER;
};

// Helper function to get role display name
export const getRoleDisplayName = (roleId) => {
    const role = parseInt(roleId);
    switch(role) {
        case USER_ROLES.BUYER:
            return 'Buyer';
        case USER_ROLES.SELLER:
            return 'Seller';
        case USER_ROLES.AGENT:
            return 'Agent';
        case USER_ROLES.CONTRACTOR:
            return 'Contractor';
        case USER_ROLES.REALTOR:
            return 'Realtor';
        case USER_ROLES.DEVELOPER:
            return 'Developer';
        default:
            return 'User';
    }
};

// Get total unread messages for a user
export const getTotalUnreadMessages = async (userId) => {
    try {
        // Create a cache key for this specific user's total unread messages
        const cacheKey = `total-unread-messages-${userId}`;
        
        // Use the cache service to fetch or reuse data with a 60 second cache lifetime
        return await apiCache.get(cacheKey, async () => {
            // Get all users that might have sent messages to this user
            const usersResponse = await axios.get(`${BASE_URL}/all-users`);
            const allUsers = usersResponse.data.allusers;
            
            // Create an array of promises for parallel execution
            const unreadPromises = allUsers
                .filter(user => user.id !== parseInt(userId)) // Skip self
                .map(user => {
                    // For each other user, check unread messages they sent to current user
                    const unreadCacheKey = `unread-messages-${user.id}-${userId}`;
                    
                    // Use cache for individual requests too
                    return apiCache.get(unreadCacheKey, async () => {
                        const response = await axios.get(`${BASE_URL}/unread-messages/${user.id}/${userId}`);
                        return response.data?.unread_messages || 0;
                    }).catch(() => 0); // Return 0 if request fails for this user
                });
            
            // Execute all promises in parallel for better performance
            const unreadCounts = await Promise.all(unreadPromises);
            
            // Sum up all unread counts
            const totalUnread = unreadCounts.reduce((sum, count) => sum + count, 0);
            
            return { 
                success: true, 
                count: totalUnread 
            };
        }, 60000); // 60 second cache for total unread
    } catch (error) {
        console.error('Error fetching total unread count:', error);
        return { success: false, count: 0, error: error.message };
    }
};
