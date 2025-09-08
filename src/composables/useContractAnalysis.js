import { ref, computed } from 'vue'
import { apiService } from '../services/api.js'

/**
 * Composable for managing contract analysis state and operations
 */
export function useContractAnalysis() {
  // State
  const uploadedFile = ref(null)
  const isProcessing = ref(false)
  const currentStep = ref(0)
  const jobId = ref(null)
  const jobStatus = ref(null)
  const analysisResult = ref(null)
  const error = ref(null)

  // Computed
  const isUploaded = computed(() => !!uploadedFile.value)
  const isCompleted = computed(() => jobStatus.value?.state === 'done')
  const hasError = computed(() => !!error.value || jobStatus.value?.state === 'error')
  const progress = computed(() => jobStatus.value?.progress || 0)

  // Methods
  const setUploadedFile = (file) => {
    uploadedFile.value = file
    error.value = null
    analysisResult.value = null
    jobStatus.value = null
    jobId.value = null
  }

  const removeFile = () => {
    uploadedFile.value = null
    isProcessing.value = false
    currentStep.value = 0
    jobId.value = null
    jobStatus.value = null
    analysisResult.value = null
    error.value = null
  }

  const startAnalysis = async () => {
    if (!uploadedFile.value) {
      throw new Error('No file uploaded')
    }

    try {
      isProcessing.value = true
      currentStep.value = 0
      error.value = null

      // Step 1: Upload file
      currentStep.value = 1
      const uploadResult = await apiService.uploadContract(uploadedFile.value)
      jobId.value = uploadResult.job_id

      // Step 2: Poll for status
      currentStep.value = 2
      await pollJobStatus()

    } catch (err) {
      error.value = err.message
      isProcessing.value = false
      throw err
    }
  }

  const pollJobStatus = async () => {
    if (!jobId.value) return

    const pollInterval = setInterval(async () => {
      try {
        const status = await apiService.getJobStatus(jobId.value)
        jobStatus.value = status

        // Update step based on status
        switch (status.state) {
          case 'extracting':
            currentStep.value = 1
            break
          case 'analyzing':
            currentStep.value = 2
            break
          case 'reporting':
            currentStep.value = 3
            break
          case 'done':
            currentStep.value = 4
            await loadAnalysisResults()
            clearInterval(pollInterval)
            isProcessing.value = false
            break
          case 'error':
            error.value = status.error || 'Analysis failed'
            clearInterval(pollInterval)
            isProcessing.value = false
            break
        }
      } catch (err) {
        error.value = err.message
        clearInterval(pollInterval)
        isProcessing.value = false
      }
    }, 2000) // Poll every 2 seconds

    // Timeout after 5 minutes
    setTimeout(() => {
      if (isProcessing.value) {
        clearInterval(pollInterval)
        error.value = 'Analysis timed out. Please try again.'
        isProcessing.value = false
      }
    }, 300000)
  }

  const loadAnalysisResults = async () => {
    if (!jobId.value) return

    try {
      const results = await apiService.getJobResults(jobId.value)
      const analysisData = await apiService.downloadAnalysisData(results.json_url)
      
      // Transform backend data to frontend format
      analysisResult.value = transformAnalysisData(analysisData)
    } catch (err) {
      error.value = err.message
    }
  }

  const downloadReport = async () => {
    if (!jobId.value || !jobStatus.value?.pdf_url) {
      throw new Error('No report available')
    }

    try {
      const pdfBlob = await apiService.downloadPDFReport(jobStatus.value.pdf_url)
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `clauseguard-analysis-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteJob = async () => {
    if (!jobId.value) return

    try {
      await apiService.deleteJob(jobId.value)
      removeFile()
    } catch (err) {
      error.value = err.message
    }
  }

  const reset = () => {
    removeFile()
  }

  return {
    // State
    uploadedFile,
    isProcessing,
    currentStep,
    jobId,
    jobStatus,
    analysisResult,
    error,
    
    // Computed
    isUploaded,
    isCompleted,
    hasError,
    progress,
    
    // Methods
    setUploadedFile,
    removeFile,
    startAnalysis,
    downloadReport,
    deleteJob,
    reset,
  }
}

/**
 * Transform backend analysis data to frontend format
 */
function transformAnalysisData(data) {
  return {
    riskyClauses: data.clauses?.map(clause => ({
      type: clause.type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      riskLevel: clause.risk_level,
      text: clause.text,
      recommendation: clause.rationale || 'Review this clause carefully.',
      page: clause.page
    })) || [],
    
    missingSignatures: data.signatures?.missing?.map(signature => ({
      party: signature,
      location: 'Contract signature section'
    })) || [],
    
    renewalDeadlines: data.deadlines?.map(deadline => ({
      type: deadline.kind?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      date: deadline.date_iso || 'Not specified',
      description: deadline.source_text,
      windowDays: deadline.window_days
    })) || [],
    
    parties: data.parties || [],
    riskSummary: data.risk_summary || {
      overall: 'medium',
      top_risks: [],
      recommendations: []
    }
  }
}
