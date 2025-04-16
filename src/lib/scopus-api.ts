import axios from 'axios';

export async function searchScopus(query: string) {
  // Log the API key to verify it's being set
  console.log('API Key:', process.env.NEXT_PUBLIC_SCOPUS_API_KEY ? 'Present' : 'Missing');

  try {
    const response = await axios.get('https://api.elsevier.com/content/search/scopus', {
      params: {
        query,
        count: 10,
        start: 0,
        view: 'STANDARD'
      },
      headers: {
        'Accept': 'application/json',
        'X-ELS-APIKey': process.env.NEXT_PUBLIC_SCOPUS_API_KEY || '',
        // Optional: Add Authorization header if you have an access token
        // 'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    // More detailed error logging
    if (axios.isAxiosError(error)) {
      console.error('Scopus API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    throw error;
  }
}



// Search for Google Scholar profiles
export async function searchScholarProfiles(query: string) {
  try {
    const response = await fetch(`/api/scholar/profiles?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Google Scholar profiles:", error)
    throw error
  }
}

// Search for Google Scholar citations using result_id
export async function searchScholarCitations(resultId: string) {
  try {
    const response = await fetch(`/api/scholar/citations?resultId=${encodeURIComponent(resultId)}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Google Scholar citations:", error)
    throw error
  }
}

// Search for Google Scholar articles
export async function searchScholarArticles(query: string) {
  try {
    const response = await fetch(`/api/scholar/articles?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Google Scholar articles:", error)
    throw error
  }
}
