import { ref } from 'vue'
import { getAuth } from 'firebase/auth'

// Get auth token helper
async function getAuthToken() {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')
  return await user.getIdToken()
}

const API_BASE_URL = (import.meta.env?.VITE_API_URL || process.env?.VUE_APP_API_URL || 'http://localhost:8000') + '/api'

// Log API URL for debugging (always log to help troubleshoot)
console.log('API_BASE_URL (useSubjects):', API_BASE_URL)
console.log('VITE_API_URL:', import.meta.env?.VITE_API_URL)
console.log('VUE_APP_API_URL:', process.env?.VUE_APP_API_URL)

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
        const networkError = new Error(
          `Network error: Cannot reach API at ${API_BASE_URL}. ` +
          `Please check that VITE_API_URL is set correctly in your Vercel environment variables.`
        )
        error.value = networkError.message
        console.error('Network error creating subject:', networkError.message)
        console.error('Original error:', e)
        throw networkError
      }
      
      error.value = e.message
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
      
      // Log URL for debugging
      if (import.meta.env?.DEV) {
        console.log('Fetching subjects from:', url)
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        const err = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }))
        throw new Error(err.detail || 'Failed to fetch subjects')
      }
      
      subjects.value = await response.json()
      return subjects.value
    } catch (e) {
      // Handle network errors specifically (Failed to fetch, network errors, etc.)
      if (e.name === 'TypeError' && (e.message.includes('fetch') || e.message.includes('Failed to fetch'))) {
        const networkError = new Error(
          `Network error: Cannot reach API at ${API_BASE_URL}. ` +
          `Please check that VITE_API_URL is set correctly in your Vercel environment variables.`
        )
        error.value = networkError.message
        console.error('Network error fetching subjects:', networkError.message)
        console.error('Original error:', e)
        throw networkError
      }
      
      error.value = e.message
      console.error('Error fetching subjects:', e)
      throw e
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
      error.value = e.message
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
      error.value = e.message
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
      error.value = e.message
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
      error.value = e.message
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
      error.value = e.message
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
      error.value = e.message
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