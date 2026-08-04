/* Reset and Base Styles */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: #0d0d1a;
  color: #ffffff;
  scroll-behavior: smooth;
}

/* Fixed WebGL Background */
#canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(100deg, #e31837 0%, #7c1a8e 45%, #1a156c 80%, #151152 100%);
}

#canvas-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* Navigation Bar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5%;
  box-sizing: border-box;
  z-index: 10;
  background: rgba(13, 13, 26, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-weight: bold;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.nav-links {
  display: none; /* Hide on very small screens */
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 1;
}

.nav-btn {
  border: 1px solid #df2b4c;
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: rgba(223, 43, 76, 0.2);
}

/* Content Layout */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 20px 50px 20px;
}

/* Typography & Sections */
.hero-section {
  margin-bottom: 80px;
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -1px;
}

.dot {
  color: #df2b4c;
}

.subtitle {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 15px;
}

.contact-info {
  font-size: 0.9rem;
  color: #a0aec0;
}

.cv-section {
  background: rgba(20, 20, 40, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 40px;
}

h2 {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

h3 {
  color: #df2b4c;
  margin-bottom: 5px;
}

p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.item {
  margin-bottom: 25px;
}

.highlight {
  font-weight: bold;
  color: #ffffff;
}

.split-section {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.half {
  flex: 1;
  min-width: 300px;
}

.skills-list {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
}

/* Upload Section & Gallery */
.upload-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.upload-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #df2b4c;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
  transition: background 0.3s;
}

.upload-btn:hover {
  background-color: #c42240;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.gallery-grid img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}
