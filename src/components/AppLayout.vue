<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">🛡️</span>
            <span class="brand-text">ClauseGuard</span>
          </router-link>
        </div>
        <div class="nav-menu">
          <router-link to="/" class="nav-link" :class="{ active: $route.name === 'home' }">
            Home
          </router-link>
          <router-link to="/upload" class="nav-link" :class="{ active: $route.name === 'upload' }">
            Upload
          </router-link>
          <router-link to="/about" class="nav-link" :class="{ active: $route.name === 'about' }">
            About
          </router-link>
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
        <router-link to="/upload" class="mobile-nav-link" @click="closeMobileMenu"
          >Upload</router-link
        >
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu"
          >About</router-link
        >
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="brand-icon">🛡️</span>
            <span class="brand-text">ClauseGuard</span>
          </div>
          <p class="footer-description">
            AI-powered contract review assistant that flags risky clauses, missing signatures, and
            renewal deadlines.
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 ClauseGuard. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.brand-link:hover {
  transform: translateY(-2px);
}

.brand-icon {
  font-size: 1.8rem;
}

.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-link.active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-menu {
  display: none;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  flex-direction: column;
  gap: 1rem;
}

.mobile-menu.open {
  display: flex;
}

.mobile-nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #667eea;
}

.main-content {
  flex: 1;
}

.footer {
  background: #1a1a1a;
  color: white;
  margin-top: auto;
}

.footer-container {
  width: 100%;
  padding: 3rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.footer-brand .brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: #ccc;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding: 1.5rem 2rem;
  text-align: center;
  color: #999;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .footer-container {
    padding: 2rem 1rem 1rem;
  }
}
</style>
