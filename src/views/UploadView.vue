<template>
  <div class="upload">
    <div class="upload-container">
      <div class="upload-header animate-fade-in-up">
        <h1>Upload Your Contract</h1>
        <p>Upload a PDF or DOCX file to get instant AI-powered contract analysis</p>
      </div>

      <div class="upload-section">
        <div
          class="upload-area"
          :class="{ dragover: isDragOver, uploaded: uploadedFile }"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            accept=".pdf,.docx"
            @change="handleFileSelect"
            style="display: none"
          />

          <div v-if="!uploadedFile" class="upload-content">
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3>Drop your contract here</h3>
            <p>or <span class="upload-link">browse files</span></p>
            <div class="upload-formats">
              <span class="format-tag">PDF</span>
              <span class="format-tag">DOCX</span>
            </div>
          </div>

          <div v-else class="uploaded-file">
            <div class="file-icon">
              <!-- Document icon for PDF/DOCX -->
              <svg
                v-if="!isImageFile(uploadedFile)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <!-- Image icon for image files -->
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="file-info">
              <h4>{{ uploadedFile.name }}</h4>
              <p>{{ formatFileSize(uploadedFile.size) }}</p>
            </div>
            <button @click.stop="removeFile" class="remove-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="uploadedFile && !isProcessing && !analysisResult && !error" class="upload-actions">
          <button
            @click="analyzeContract"
            class="btn btn-primary btn-large"
            :disabled="isProcessing"
          >
            <span>Analyze Contract</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="error-section">
          <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h3>Analysis Failed</h3>
            <p>{{ error }}</p>
            <button @click="reset" class="btn btn-primary">Try Again</button>
          </div>
        </div>

        <!-- Loading Animation -->
        <div v-if="isProcessing" class="processing-section">
          <div class="loading-animation">
            <div class="loading-spinner"></div>
            <h3>Analyzing your contract...</h3>
            <p>Our AI is reviewing your document for potential risks and issues</p>
            <div class="loading-steps">
              <div class="step" :class="{ active: currentStep >= 1 }">
                <div class="step-icon">📄</div>
                <span>Reading document</span>
              </div>
              <div class="step" :class="{ active: currentStep >= 2 }">
                <div class="step-icon">🔍</div>
                <span>Analyzing clauses</span>
              </div>
              <div class="step" :class="{ active: currentStep >= 3 }">
                <div class="step-icon">⚠️</div>
                <span>Identifying risks</span>
              </div>
              <div class="step" :class="{ active: currentStep >= 4 }">
                <div class="step-icon">📊</div>
                <span>Generating report</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="analysisResult" class="results-section">
          <div class="results-header">
            <h2>Analysis Complete</h2>
            <p>Here's what our AI found in your contract</p>
          </div>

          <div class="results-summary">
            <div class="summary-card risk">
              <div class="summary-icon">⚠️</div>
              <div class="summary-content">
                <h3>{{ analysisResult.riskyClauses.length }}</h3>
                <p>Risky Clauses</p>
              </div>
            </div>
            <div class="summary-card warning">
              <div class="summary-icon">📝</div>
              <div class="summary-content">
                <h3>{{ analysisResult.missingSignatures.length }}</h3>
                <p>Missing Signatures</p>
              </div>
            </div>
            <div class="summary-card info">
              <div class="summary-icon">📅</div>
              <div class="summary-content">
                <h3>{{ analysisResult.renewalDeadlines.length }}</h3>
                <p>Renewal Deadlines</p>
              </div>
            </div>
          </div>

          <div class="results-details">
            <div class="results-tabs">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                class="tab-btn"
                :class="{ active: activeTab === tab.key }"
              >
                {{ tab.label }}
                <span class="tab-count">{{ getTabCount(tab.key) }}</span>
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'risky'" class="tab-panel">
                <div
                  v-for="(clause, index) in analysisResult.riskyClauses"
                  :key="index"
                  class="clause-item"
                >
                  <div class="clause-header">
                    <span class="clause-type">{{ clause.type }}</span>
                    <span class="risk-level" :class="clause.riskLevel">{{ clause.riskLevel }}</span>
                  </div>
                  <p class="clause-text">{{ clause.text }}</p>
                  <div class="clause-recommendation">
                    <strong>Recommendation:</strong> {{ clause.recommendation }}
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'signatures'" class="tab-panel">
                <div
                  v-for="(signature, index) in analysisResult.missingSignatures"
                  :key="index"
                  class="signature-item"
                >
                  <div class="signature-header">
                    <span class="signature-party">{{ signature.party }}</span>
                    <span class="signature-status missing">Missing</span>
                  </div>
                  <p class="signature-location">Location: {{ signature.location }}</p>
                </div>
              </div>

              <div v-if="activeTab === 'deadlines'" class="tab-panel">
                <div
                  v-for="(deadline, index) in analysisResult.renewalDeadlines"
                  :key="index"
                  class="deadline-item"
                >
                  <div class="deadline-header">
                    <span class="deadline-type">{{ deadline.type }}</span>
                    <span class="deadline-date">{{ deadline.date }}</span>
                  </div>
                  <p class="deadline-description">{{ deadline.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="results-actions">
            <button @click="handleDownloadReport" class="btn btn-secondary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF Report
            </button>
            <button @click="uploadNew" class="btn btn-primary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Another
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContractAnalysis } from '../composables/useContractAnalysis.js'

const fileInput = ref(null)
const isDragOver = ref(false)
const activeTab = ref('risky')

// Use the contract analysis composable
const {
  uploadedFile,
  isProcessing,
  currentStep,
  analysisResult,
  error,
  isUploaded,
  isCompleted,
  hasError,
  progress,
  setUploadedFile,
  removeFile,
  startAnalysis,
  downloadReport,
  reset
} = useContractAnalysis()

const tabs = [
  { key: 'risky', label: 'Risky Clauses' },
  { key: 'signatures', label: 'Missing Signatures' },
  { key: 'deadlines', label: 'Renewal Deadlines' },
]

// Check backend health on mount
onMounted(async () => {
  try {
    const { apiService } = await import('../services/api.js')
    const isHealthy = await apiService.checkHealth()
    if (!isHealthy) {
      console.warn('Backend is not responding. Using demo mode.')
    }
  } catch (err) {
    console.warn('Could not check backend health:', err)
  }
})

const handleDragOver = (e) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  isDragOver.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragOver.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const triggerFileInput = () => {
  if (!uploadedFile.value) {
    fileInput.value.click()
  }
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = (file) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (!allowedTypes.includes(file.type)) {
    alert('Please upload a PDF or DOCX file')
    return
  }

  setUploadedFile(file)
}

// removeFile is now provided by the composable

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const isImageFile = (file) => {
  return file && file.type.startsWith('image/')
}

const analyzeContract = async () => {
  try {
    await startAnalysis()
  } catch (err) {
    console.error('Analysis failed:', err)
    // Error is handled by the composable
  }
}

const getTabCount = (tabKey) => {
  if (!analysisResult.value) return 0
  return (
    analysisResult.value[`${tabKey}Clauses`]?.length ||
    analysisResult.value[`missing${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`]?.length ||
    analysisResult.value[`renewal${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`]?.length ||
    0
  )
}

const handleDownloadReport = async () => {
  try {
    await downloadReport()
  } catch (err) {
    console.error('Download failed:', err)
    // Error is handled by the composable
  }
}

const generatePDFContent = (data) => {
  // This is a simplified PDF generation
  // In a real application, you'd use a library like jsPDF or Puppeteer
  const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${generatePDFStream(data).length}
>>
stream
${generatePDFStream(data)}
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
000000${String(generatePDFStream(data).length + 300).padStart(6, '0')} 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${generatePDFStream(data).length + 400}
%%EOF`

  return pdfHeader
}

const generatePDFStream = (data) => {
  const content = `BT
/F1 12 Tf
50 750 Td
(ClauseGuard Contract Analysis Report) Tj
0 -20 Td
(Generated on: ${new Date().toLocaleDateString()}) Tj
0 -30 Td
(========================================) Tj
0 -20 Td
() Tj
0 -20 Td
(SUMMARY) Tj
0 -15 Td
(Risky Clauses: ${data.riskyClauses.length}) Tj
0 -15 Td
(Missing Signatures: ${data.missingSignatures.length}) Tj
0 -15 Td
(Renewal Deadlines: ${data.renewalDeadlines.length}) Tj
0 -30 Td
() Tj
0 -20 Td
(RISKY CLAUSES) Tj
0 -15 Td
(========================================) Tj`

  let riskyClausesContent = ''
  data.riskyClauses.forEach((clause, index) => {
    riskyClausesContent += `0 -15 Td
(${index + 1}. ${clause.type} - Risk Level: ${clause.riskLevel.toUpperCase()}) Tj
0 -10 Td
(${clause.text.substring(0, 80)}...) Tj
0 -10 Td
(Recommendation: ${clause.recommendation.substring(0, 80)}...) Tj
0 -15 Td
() Tj`
  })

  let signaturesContent = `0 -20 Td
(MISSING SIGNATURES) Tj
0 -15 Td
(========================================) Tj`

  data.missingSignatures.forEach((signature, index) => {
    signaturesContent += `0 -15 Td
(${index + 1}. ${signature.party}) Tj
0 -10 Td
(Location: ${signature.location}) Tj
0 -15 Td
() Tj`
  })

  let deadlinesContent = `0 -20 Td
(RENEWAL DEADLINES) Tj
0 -15 Td
(========================================) Tj`

  data.renewalDeadlines.forEach((deadline, index) => {
    deadlinesContent += `0 -15 Td
(${index + 1}. ${deadline.type}) Tj
0 -10 Td
(Date: ${deadline.date}) Tj
0 -10 Td
(Description: ${deadline.description.substring(0, 80)}...) Tj
0 -15 Td
() Tj`
  })

  const footer = `0 -30 Td
() Tj
0 -20 Td
(========================================) Tj
0 -15 Td
(This report was generated by ClauseGuard) Tj
0 -10 Td
(AI-Powered Contract Analysis Tool) Tj
0 -15 Td
(For more information, visit our website) Tj
ET`

  return content + riskyClausesContent + signaturesContent + deadlinesContent + footer
}

const uploadNew = () => {
  reset()
  fileInput.value.value = ''
}
</script>

<style scoped>
.upload {
  min-height: 100vh;
  background: #fafafa;
  padding: 2rem 0;
}

.upload-container {
  width: 100%;
  padding: 0 2rem;
  position: relative;
}

.upload-header {
  text-align: center;
  margin-bottom: 3rem;
}

.upload-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.upload-header p {
  font-size: 1.125rem;
  color: #666;
}

.upload-area {
  background: white;
  border: 2px dashed #d1d5db;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.upload-area:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.upload-area.dragover {
  border-color: #667eea;
  background: #f0f4ff;
  transform: scale(1.02);
}

.upload-area.uploaded {
  border-color: #10b981;
  background: #f0fdf4;
  cursor: default;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 64px;
  height: 64px;
  color: #667eea;
  margin-bottom: 1rem;
}

.upload-icon svg {
  width: 100%;
  height: 100%;
}

.upload-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.upload-content p {
  color: #666;
  margin-bottom: 1rem;
}

.upload-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: underline;
}

.upload-formats {
  display: flex;
  gap: 0.5rem;
}

.format-tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.uploaded-file {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.file-icon {
  width: 48px;
  height: 48px;
  color: #10b981;
  flex-shrink: 0;
}

.file-icon svg {
  width: 100%;
  height: 100%;
}

.file-info {
  flex: 1;
}

.file-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.file-info p {
  color: #666;
  font-size: 0.875rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.remove-btn:hover {
  background: #fef2f2;
}

.upload-actions {
  text-align: center;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.error-section {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #fef2f2;
}

.error-content {
  max-width: 400px;
  margin: 0 auto;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #dc2626;
}

.error-content p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.processing-section {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  max-width: none;
}

.loading-animation h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.loading-animation p {
  color: #666;
  margin-bottom: 2rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.step.active {
  background: #f0f4ff;
  color: #667eea;
}

.step-icon {
  font-size: 1.5rem;
}

.results-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  max-width: none;
}

.results-header {
  text-align: center;
  margin-bottom: 2rem;
}

.results-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.results-header p {
  color: #666;
}

.results-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f9fafb;
}

.summary-card.risk {
  border-left: 4px solid #ef4444;
}

.summary-card.warning {
  border-left: 4px solid #f59e0b;
}

.summary-card.info {
  border-left: 4px solid #3b82f6;
}

.summary-icon {
  font-size: 2rem;
}

.summary-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.summary-content p {
  color: #666;
  font-size: 0.875rem;
}

.results-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  color: #667eea;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-count {
  background: #e5e7eb;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tab-btn.active .tab-count {
  background: #667eea;
  color: white;
}

.tab-panel {
  min-height: 300px;
}

.clause-item,
.signature-item,
.deadline-item {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #e5e7eb;
}

.clause-item {
  border-left-color: #f59e0b;
}

.signature-item {
  border-left-color: #ef4444;
}

.deadline-item {
  border-left-color: #3b82f6;
}

.clause-header,
.signature-header,
.deadline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.clause-type,
.signature-party,
.deadline-type {
  font-weight: 600;
  color: #1a1a1a;
}

.risk-level {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.risk-level.high {
  background: #fef2f2;
  color: #dc2626;
}

.risk-level.medium {
  background: #fffbeb;
  color: #d97706;
}

.risk-level.low {
  background: #f0fdf4;
  color: #16a34a;
}

.signature-status.missing {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.clause-text,
.signature-location,
.deadline-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.clause-recommendation {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  color: #374151;
  font-size: 0.875rem;
}

.deadline-date {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .upload-container {
    padding: 0 1rem;
  }

  .upload-header h1 {
    font-size: 2rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }

  .results-section {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding: 1.5rem;
    border-radius: 0;
  }

  .processing-section {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding: 2rem 1rem;
    border-radius: 0;
  }

  .results-summary {
    grid-template-columns: 1fr;
  }

  .results-tabs {
    flex-direction: column;
  }

  .results-actions {
    flex-direction: column;
  }
}
</style>
