import { ref } from 'vue'
import { getAuth } from 'firebase/auth'

// Get auth token helper
async function getAuthToken() {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')
  return await user.getIdToken()
}

// Support both Vite (VITE_*) and Vue CLI (VUE_APP_*) environment variable conventions
// Vue CLI uses import.meta.env with VUE_APP_ prefix, Vite uses VITE_ prefix
// Construct API base URL: normalize to avoid double /api
const getApiBaseUrl = () => {
  // Try VITE_API_URL first (for Vite), then VUE_APP_API_URL (for Vue CLI)
  const baseUrl = import.meta.env?.VITE_API_URL || 
                  import.meta.env?.VUE_APP_API_URL || 
                  'http://localhost:8000'
  // Remove trailing slash if present
  const normalized = baseUrl.replace(/\/$/, '')
  // Check if /api is already included
  if (normalized.endsWith('/api')) {
    return normalized
  }
  return `${normalized}/api`
}
const API_BASE_URL = getApiBaseUrl()

// Log API URL for debugging 
console.log('[useSubjects] API_BASE_URL:', API_BASE_URL)
console.log('[useSubjects] VITE_API_URL:', import.meta.env?.VITE_API_URL || 'NOT SET')
console.log('[useSubjects] VUE_APP_API_URL:', import.meta.env?.VUE_APP_API_URL || 'NOT SET')
console.log('[useSubjects] Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'N/A')

// ============================================================================
// SUBJECTS COMPOSABLE
// ============================================================================

export function useSubjects() {
  const subjects = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Create a new subject
  async function createSubject(subjectData) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const url = `${API_BASE_URL}/study-sessions/subjects`
      
      // Log URL for debugging
      if (import.meta.env?.DEV) {
        console.log('Creating subject at:', url)
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(subjectData)
      })
      
      if (!response.ok) {
        const err = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }))
        throw new Error(err.detail || 'Failed to create subject')
      }
      
      const newSubject = await response.json()
      subjects.value.push(newSubject)
      return newSubject
    } catch (e) {
      // Handle network errors specifically (Failed to fetch, network errors, etc.)
      if (e.name === 'TypeError' && (e.message.includes('fetch') || e.message.includes('Failed to fetch'))) {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        let errorMsg = `Network error: Cannot reach API at ${API_BASE_URL}.`
        
        if (isLocalhost) {
          errorMsg += ` Make sure your backend server is running on ${API_BASE_URL.replace('/api', '')}.`
        } else {
          errorMsg += ` Please check that VITE_API_URL is set correctly in your Vercel environment variables.`
        }
        
        console.error('Network error creating subject:', errorMsg)
        console.error('Original error:', e)
        // Return silently - don't throw to avoid UI error displays
        return
      }
      
      console.error('Error creating subject:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Get all subjects
  async function fetchSubjects() {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const url = `${API_BASE_URL}/study-sessions/subjects`
      
      // Log URL for debugging (always log in production to help debug)
      console.log('[fetchSubjects] Fetching from:', url)
      console.log('[fetchSubjects] VITE_API_URL:', import.meta.env?.VITE_API_URL || 'NOT SET')
      console.log('[fetchSubjects] VUE_APP_API_URL:', import.meta.env?.VUE_APP_API_URL || 'NOT SET')
      console.log('[fetchSubjects] Current hostname:', window.location.hostname)
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('[fetchSubjects] Response status:', response.status, response.statusText)
      
      if (!response.ok) {
        const err = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }))
        console.error('[fetchSubjects] Response error:', err)
        throw new Error(err.detail || 'Failed to fetch subjects')
      }
      
      const data = await response.json()
      console.log('[fetchSubjects] Success, received subjects:', data?.length || 0)
      subjects.value = data
      return subjects.value
    } catch (e) {
      // Handle network errors specifically (Failed to fetch, network errors, etc.)
      if (e.name === 'TypeError' && (e.message.includes('fetch') || e.message.includes('Failed to fetch'))) {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        let errorMsg = `Network error: Cannot reach API at ${API_BASE_URL}.`
        
        if (isLocalhost) {
          errorMsg += ` Make sure your backend server is running on ${API_BASE_URL.replace('/api', '')}.`
        } else {
          const envValue = import.meta.env?.VITE_API_URL || import.meta.env?.VUE_APP_API_URL || 'NOT SET'
          errorMsg += ` Please check that VITE_API_URL or VUE_APP_API_URL is set correctly in your Vercel environment variables. Current value: ${envValue}`
        }
        
        // Set error state so it can be displayed
        error.value = errorMsg
        console.error('[fetchSubjects] Network error:', errorMsg)
        console.error('[fetchSubjects] Original error:', e)
        // Return empty array instead of throwing to prevent UI crash
        subjects.value = []
        return []
      }
      
      // Set error state for other errors too
      error.value = e.message || 'Failed to fetch subjects'
      console.error('[fetchSubjects] Error fetching subjects:', e)
      // Don't throw - return empty array to prevent UI crash
      subjects.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  // Update subject
  async function updateSubject(subjectId, updateData) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/study-sessions/subjects/${subjectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Failed to update subject')
      }
      
      const updatedSubject = await response.json()
      const index = subjects.value.findIndex(s => s.id === subjectId)
      if (index !== -1) {
        subjects.value[index] = updatedSubject
      }
      return updatedSubject
    } catch (e) {
      console.error('Error updating subject:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Delete subject
  async function deleteSubject(subjectId) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/study-sessions/subjects/${subjectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete subject')
      }
      
      subjects.value = subjects.value.filter(s => s.id !== subjectId)
      return true
    } catch (e) {
      console.error('Error deleting subject:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    subjects,
    loading,
    error,
    createSubject,
    fetchSubjects,
    updateSubject,
    deleteSubject
  }
}

// ============================================================================
// RECURRING TOPICS COMPOSABLE
// ============================================================================

export function useRecurringTopics() {
  const topics = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Create a new recurring topic
  async function createTopic(topicData) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/study-sessions/recurring-topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(topicData)
      })
      
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Failed to create topic')
      }
      
      const newTopic = await response.json()
      topics.value.push(newTopic)
      return newTopic
    } catch (e) {
      console.error('Error creating topic:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Get all recurring topics (optionally filtered by subject)
  async function fetchTopics(subjectId = null) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const url = subjectId 
        ? `${API_BASE_URL}/study-sessions/recurring-topics?subject_id=${subjectId}`
        : `${API_BASE_URL}/study-sessions/recurring-topics`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch topics')
      }
      
      topics.value = await response.json()
      return topics.value
    } catch (e) {
      console.error('Error fetching topics:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Update recurring topic
  async function updateTopic(topicId, updateData) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/study-sessions/recurring-topics/${topicId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Failed to update topic')
      }
      
      const updatedTopic = await response.json()
      const index = topics.value.findIndex(t => t.id === topicId)
      if (index !== -1) {
        topics.value[index] = updatedTopic
      }
      return updatedTopic
    } catch (e) {
      console.error('Error updating topic:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Delete recurring topic
  async function deleteTopic(topicId) {
    try {
      loading.value = true
      error.value = null
      
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/study-sessions/recurring-topics/${topicId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete topic')
      }
      
      topics.value = topics.value.filter(t => t.id !== topicId)
      return true
    } catch (e) {
      console.error('Error deleting topic:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    topics,
    loading,
    error,
    createTopic,
    fetchTopics,
    updateTopic,
    deleteTopic
  }
}