// PUBLIC_INTERFACE
/**
 * Service for interacting with the GitHub API
 * Provides functions for searching repositories by topic/keyword
 * Handles rate limits and API errors
 */

/**
 * Search GitHub repositories by keyword or topic
 * @param {string} searchTerm - The keyword or topic to search for
 * @param {number} limit - The maximum number of repositories to return (default: 5)
 * @returns {Promise<Array>} - Array of repository objects
 */
export const searchRepositories = async (searchTerm, limit = 5) => {
  try {
    // Encode the search term for URL
    const encodedTerm = encodeURIComponent(searchTerm);
    
    // Construct the GitHub search API URL
    // Sort by stars to get the most popular repositories
    const url = `https://api.github.com/search/repositories?q=${encodedTerm}&sort=stars&order=desc&per_page=${limit}`;
    
    // Make the API request
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Check for rate limit errors
    if (response.status === 403) {
      const rateLimitReset = response.headers.get('X-RateLimit-Reset');
      const resetDate = rateLimitReset ? new Date(rateLimitReset * 1000) : new Date(Date.now() + 60000);
      
      return {
        error: true,
        type: 'RATE_LIMIT',
        message: 'GitHub API rate limit exceeded',
        resetTime: resetDate.toISOString()
      };
    }
    
    // Handle other API errors
    if (!response.ok) {
      return {
        error: true,
        type: 'API_ERROR',
        message: `GitHub API error: ${response.status} ${response.statusText}`,
        status: response.status
      };
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Transform the response to a simpler format
    const repositories = data.items.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      owner: {
        login: repo.owner.login,
        avatarUrl: repo.owner.avatar_url,
        url: repo.owner.html_url
      },
      updatedAt: repo.updated_at
    }));
    
    return repositories;
    
  } catch (error) {
    console.error('Error searching GitHub repositories:', error);
    return {
      error: true,
      type: 'FETCH_ERROR',
      message: error.message
    };
  }
};

/**
 * Check the current GitHub API rate limit status
 * @returns {Promise<Object>} - Rate limit information
 */
export const checkRateLimit = async () => {
  try {
    const response = await fetch('https://api.github.com/rate_limit');
    
    if (!response.ok) {
      return {
        error: true,
        message: `GitHub API error: ${response.status} ${response.statusText}`
      };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking GitHub API rate limit:', error);
    return {
      error: true,
      message: error.message
    };
  }
};
