/**
 * Message Helper Functions
 * 
 * This file contains helper functions for managing messages, especially
 * functions that help reduce unnecessary API calls.
 */

import apiCache from './apiCacheService';
import { markMessagesAsRead } from './chatAPI';

/**
 * A debounced version of markMessagesAsRead that ensures we don't call the
 * API multiple times in quick succession for the same conversation.
 * 
 * This uses a combination of debouncing and the cache service to prevent
 * duplicate API calls.
 */

// Store timeouts by conversation key
const markReadTimeouts = {};
const DEBOUNCE_DELAY = 2000; // 2 seconds

/**
 * Mark messages as read with debounce to prevent multiple rapid API calls
 * 
 * @param {number|string} senderId - ID of the message sender
 * @param {number|string} receiverId - ID of the message receiver
 * @returns {Promise<void>}
 */
export const debouncedMarkMessagesAsRead = (senderId, receiverId) => {
    // Create a unique key for this conversation
    const conversationKey = `${senderId}-${receiverId}`;
    
    // Clear any existing timeout for this conversation
    if (markReadTimeouts[conversationKey]) {
        clearTimeout(markReadTimeouts[conversationKey]);
    }
    
    // Set a new timeout
    return new Promise((resolve) => {
        markReadTimeouts[conversationKey] = setTimeout(async () => {
            try {
                // Perform the actual API call
                const result = await markMessagesAsRead(senderId, receiverId);
                
                // If successful, invalidate related cache entries to ensure fresh data
                if (result.success) {
                    // Invalidate the unread count cache for this conversation
                    apiCache.invalidate(`unread-messages-${senderId}-${receiverId}`);
                    
                    // Also invalidate the total unread messages cache
                    apiCache.invalidate(`total-unread-messages-${receiverId}`);
                }
                
                resolve(result);
            } catch (error) {
                console.error('Error in debouncedMarkMessagesAsRead:', error);
                resolve({ 
                    success: false, 
                    error: error.message
                });
            }
        }, DEBOUNCE_DELAY);
    });
};

/**
 * Marks messages as read immediately without debouncing
 * Use this in cases where immediate update is critical
 * 
 * @param {number|string} senderId - ID of the message sender
 * @param {number|string} receiverId - ID of the message receiver
 * @returns {Promise<object>} - Result object with success flag
 */
export const markMessagesAsReadImmediately = async (senderId, receiverId) => {
    try {
        const result = await markMessagesAsRead(senderId, receiverId);
        
        // If successful, invalidate related cache entries
        if (result.success) {
            // Invalidate the unread count cache for this conversation
            apiCache.invalidate(`unread-messages-${senderId}-${receiverId}`);
            
            // Also invalidate the total unread messages cache
            apiCache.invalidate(`total-unread-messages-${receiverId}`);
        }
        
        return result;
    } catch (error) {
        console.error('Error marking messages as read immediately:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
};
