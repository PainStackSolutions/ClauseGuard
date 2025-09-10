// Google Analytics composable for tracking events
export function useGoogleAnalytics() {
  // Track page views
  const trackPageView = (pagePath, pageTitle) => {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-V12BDM5WTD', {
        page_path: pagePath,
        page_title: pageTitle,
      })
    }
  }

  // Track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'ClauseGuard',
        event_label: parameters.label || '',
        value: parameters.value || 0,
        ...parameters,
      })
    }
  }

  // Predefined tracking events for ClauseGuard
  const trackContractUpload = (fileSize, fileType) => {
    trackEvent('contract_upload', {
      event_category: 'Contract Analysis',
      file_size: fileSize,
      file_type: fileType,
      label: 'Contract Upload Started',
    })
  }

  const trackContractAnalysis = (analysisTime, riskLevel) => {
    trackEvent('contract_analysis_complete', {
      event_category: 'Contract Analysis',
      analysis_time: analysisTime,
      risk_level: riskLevel,
      label: 'Contract Analysis Completed',
    })
  }

  const trackReportDownload = (reportType) => {
    trackEvent('report_download', {
      event_category: 'User Engagement',
      report_type: reportType,
      label: 'Report Downloaded',
    })
  }

  const trackButtonClick = (buttonName, location) => {
    trackEvent('button_click', {
      event_category: 'User Interaction',
      button_name: buttonName,
      page_location: location,
      label: `${buttonName} clicked on ${location}`,
    })
  }

  const trackFeatureView = (featureName) => {
    trackEvent('feature_view', {
      event_category: 'User Engagement',
      feature_name: featureName,
      label: `${featureName} feature viewed`,
    })
  }

  const trackUserJourney = (step, action) => {
    trackEvent('user_journey', {
      event_category: 'User Flow',
      journey_step: step,
      action: action,
      label: `User ${action} at ${step}`,
    })
  }

  const trackError = (errorType, errorMessage) => {
    trackEvent('error_occurred', {
      event_category: 'Errors',
      error_type: errorType,
      error_message: errorMessage,
      label: `Error: ${errorType}`,
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackContractUpload,
    trackContractAnalysis,
    trackReportDownload,
    trackButtonClick,
    trackFeatureView,
    trackUserJourney,
    trackError,
  }
}
