<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" role="banner">
      <div class="hero-container">
        <div class="hero-content">
          <header class="hero-text animate-fade-in-up">
            <h1 class="hero-title">
              AI-Powered Contract Review
              <span class="gradient-text">Made Simple</span>
            </h1>
            <p class="hero-subtitle">
              Upload your contracts and let ClauseGuard's AI instantly flag risky clauses, missing
              signatures, and renewal deadlines. Save time and reduce legal risks.
            </p>
            <div class="hero-actions">
              <router-link
                to="/upload"
                class="btn btn-primary"
                @click="trackButtonClick('Start Reviewing', 'Homepage Hero')"
              >
                <span>Start Reviewing</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </router-link>
              <router-link
                to="/about"
                class="btn btn-secondary"
                @click="trackButtonClick('Learn More', 'Homepage Hero')"
              >
                Learn More
              </router-link>
            </div>
          </header>
          <aside
            class="hero-visual animate-slide-in-right"
            aria-label="Contract preview demonstration"
          >
            <div class="contract-preview">
              <div class="contract-header">
                <div class="contract-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="contract-title">Contract Review</div>
              </div>
              <div class="contract-content">
                <div class="contract-line flagged">
                  <span class="line-number">1</span>
                  <span class="line-text">This agreement shall be binding upon the parties...</span>
                  <span class="flag-icon">⚠️</span>
                </div>
                <div class="contract-line">
                  <span class="line-number">2</span>
                  <span class="line-text">The term of this contract is 24 months...</span>
                </div>
                <div class="contract-line flagged">
                  <span class="line-number">3</span>
                  <span class="line-text">Either party may terminate with 30 days notice...</span>
                  <span class="flag-icon">⚠️</span>
                </div>
                <div class="contract-line">
                  <span class="line-number">4</span>
                  <span class="line-text">Payment terms are net 30 days...</span>
                </div>
                <div class="contract-line flagged">
                  <span class="line-number">5</span>
                  <span class="line-text">This contract auto-renews unless terminated...</span>
                  <span class="flag-icon">⚠️</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" role="main">
      <div class="features-container">
        <header class="features-header animate-fade-in-up">
          <h2>Why Choose ClauseGuard?</h2>
          <p>
            Powerful AI technology that understands legal language and identifies potential risks
          </p>
        </header>
        <div class="features-grid">
          <article class="feature-card animate-fade-in-up" style="animation-delay: 0.1s">
            <div class="feature-icon" role="img" aria-label="Smart analysis icon">🔍</div>
            <h3>Smart Analysis</h3>
            <p>
              Advanced AI algorithms analyze contract language to identify potential risks and
              issues
            </p>
          </article>
          <article class="feature-card animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="feature-icon" role="img" aria-label="Lightning fast results icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get comprehensive contract analysis in seconds, not hours or days</p>
          </article>
          <article class="feature-card animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="feature-icon">
              <img
                src="/logo.svg"
                alt="ClauseGuard logo representing risk protection"
                class="feature-logo"
              />
            </div>
            <h3>Risk Protection</h3>
            <p>
              Identify missing signatures, renewal deadlines, and risky clauses before they become
              problems
            </p>
          </article>
          <article class="feature-card animate-fade-in-up" style="animation-delay: 0.4s">
            <div class="feature-icon" role="img" aria-label="Detailed reports icon">📊</div>
            <h3>Detailed Reports</h3>
            <p>Receive structured PDF reports with actionable insights and recommendations</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-container">
        <div class="cta-content animate-fade-in-up">
          <h2>Ready to Review Your Contracts?</h2>
          <p>
            Join thousands of professionals who trust ClauseGuard for their contract analysis needs
          </p>
          <router-link
            to="/upload"
            class="btn btn-primary btn-large"
            @click="trackButtonClick('Upload Your First Contract', 'Homepage CTA')"
          >
            <span>Upload Your First Contract</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSEO, seoPages } from '../composables/useSEO.js'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics.js'

// Apply SEO for home page
useSEO(seoPages.home)

// Initialize Google Analytics
const { trackButtonClick, trackFeatureView } = useGoogleAnalytics()

// Track feature views when component mounts
import { onMounted } from 'vue'
onMounted(() => {
  trackFeatureView('Homepage Hero')
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-container {
  width: 100%;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  animation: subtleGlow 4s ease-in-out infinite;
}

@keyframes subtleGlow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contract-preview {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  color: #333;
}

.contract-header {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contract-dots {
  display: flex;
  gap: 0.5rem;
}

.contract-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dee2e6;
}

.contract-dots span:nth-child(1) {
  background: #ff5f57;
}
.contract-dots span:nth-child(2) {
  background: #ffbd2e;
}
.contract-dots span:nth-child(3) {
  background: #28ca42;
}

.contract-title {
  font-weight: 600;
  color: #495057;
}

.contract-content {
  padding: 1.5rem;
}

.contract-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
  position: relative;
}

.contract-line.flagged {
  background: rgba(255, 193, 7, 0.1);
  margin: 0 -1.5rem;
  padding: 0.5rem 1.5rem;
  border-left: 4px solid #ffc107;
}

.line-number {
  font-size: 0.875rem;
  color: #6c757d;
  min-width: 20px;
}

.line-text {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.4;
}

.flag-icon {
  font-size: 1rem;
}

.features {
  padding: 6rem 0;
  background: white;
}

.features-container {
  width: 100%;
  padding: 0 2rem;
}

.features-header {
  text-align: center;
  margin-bottom: 4rem;
}

.features-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.features-header p {
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f1f3f4;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-logo {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.cta {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 6rem 0;
}

.cta-container {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>
