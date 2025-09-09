/**
 * API service for communicating with ClauseGuard backend
 */

const API_BASE_URL = 'https://clauseguard-backend-r3m9.onrender.com'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  /**
   * Upload a contract file and start analysis
   * @param {File} file - The contract file to analyze
   * @returns {Promise<{job_id: string}>}
   */
  async uploadContract(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${this.baseURL}/analyze`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get job status and progress
   * @param {string} jobId - The job ID
   * @returns {Promise<{state: string, progress: number, json_url?: string, pdf_url?: string, error?: string}>}
   */
  async getJobStatus(jobId) {
    const response = await fetch(`${this.baseURL}/jobs/${jobId}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get result URLs for completed job
   * @param {string} jobId - The job ID
   * @returns {Promise<{json_url: string, pdf_url: string}>}
   */
  async getJobResults(jobId) {
    const response = await fetch(`${this.baseURL}/jobs/${jobId}/results`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Download analysis data from URL
   * @param {string} url - The presigned URL
   * @returns {Promise<any>}
   */
  async downloadAnalysisData(url) {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to download analysis data: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Download PDF report from URL
   * @param {string} url - The presigned URL
   * @returns {Promise<Blob>}
   */
  async downloadPDFReport(url) {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to download PDF report: ${response.statusText}`)
    }

    return response.blob()
  }

  /**
   * Delete job artifacts
   * @param {string} jobId - The job ID
   * @returns {Promise<{deleted: boolean}>}
   */
  async deleteJob(jobId) {
    const response = await fetch(`${this.baseURL}/jobs/${jobId}/delete`, {
      method: 'POST',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Check if backend is healthy
   * @returns {Promise<boolean>}
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/healthz`)
      return response.ok
    } catch (error) {
      return false
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService()
export default apiService
