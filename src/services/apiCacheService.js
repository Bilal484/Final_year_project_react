/**
 * API Cache Service
 * 
 * This service provides caching and request deduplication for API calls to prevent
 * duplicate network requests for the same data within a specified time window.
 */

class ApiCacheService {
    constructor() {
        this.cache = new Map();
        this.pendingRequests = new Map();
    }

    /**
     * Get cached data for a key or execute the fetcher function if cache is invalid
     * 
     * @param {string} key - Unique key for the cache entry
     * @param {Function} fetcher - Async function that fetches the data
     * @param {number} maxAge - Maximum age of the cache in milliseconds
     * @returns {Promise<any>} - The cached or freshly fetched data
     */
    async get(key, fetcher, maxAge = 30000) { // Default 30 seconds cache
        // Check if we already have a valid cached value
        const cached = this.cache.get(key);
        const now = Date.now();

        if (cached && now - cached.timestamp < maxAge) {
            return cached.data;
        }

        // Check if there's already a pending request for this key
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key);
        }

        // Start a new request
        const promise = (async () => {
            try {
                const result = await fetcher();
                
                // Cache the successful result
                this.cache.set(key, {
                    data: result,
                    timestamp: Date.now()
                });
                
                return result;
            } finally {
                // Remove from pending requests when done
                this.pendingRequests.delete(key);
            }
        })();

        // Store the pending request
        this.pendingRequests.set(key, promise);
        
        return promise;
    }

    /**
     * Clear a specific cache entry
     * 
     * @param {string} key - The cache key to clear
     */
    invalidate(key) {
        this.cache.delete(key);
    }

    /**
     * Clear all cache entries
     */
    clearAll() {
        this.cache.clear();
    }
}

// Create a singleton instance
const apiCache = new ApiCacheService();

export default apiCache;
