* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #090b16;
  --panel: #131629;
  --border: #292d46;
  --text: #f5f5ff;
  --muted: #a0a6c0;
  --purple: #9878ff;
  --cyan: #64d9ec;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at top left, #282052 0%, transparent 38%),
    radial-gradient(ellipse at bottom right, #102a3a 0%, transparent 35%),
    var(--bg);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.topbar {
  min-height: 72px;
  padding: 16px 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff12;
  background: #090b16cc;
}

.logo {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.7px;
}

.logo span {
  color: var(--purple);
}

.status {
  color: #a9f0d2;
  border: 1px solid #345b51;
  background: #14251f;
  padding: 8px 12px;
  border-radius: 30px;
  font-size: 12px;
}

.container {
  width: min(1100px, 92%);
  margin: auto;
}

.hero {
  text-align: center;
  padding: 58px 12px 38px;
}

.eyebrow {
  color: #b6a5ff;
  letter-spacing: 3px;
  font-size: 11px;
  font-weight: bold;
}

.hero h1 {
  font-size: clamp(34px, 5vw, 55px);
  line-height: 1.12;
  letter-spacing: -1.7px;
  margin: 19px 0 16px;
}

.hero h1 span {
  background: linear-gradient(90deg, #b49cff, #69deed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--muted);
  line-height: 1.7;
  font-size: 14px;
}

.studio {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
}

.panel {
  background: linear-gradient(145deg, #171a30, #101322);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 24px;
  min-width: 0;
  box-shadow: 0 18px 55px #0003;
}

.panel h2 {
  font-size: 19px;
  margin-bottom: 22px;
}

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 5px;
  border-radius: 11px;
  background: #090b16;
  margin-bottom: 18px;
}

.tabs button {
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  padding: 12px 5px;
  border-radius: 8px;
  font-size: 12px;
}

.tabs button.active {
  color: white;
  background: #30264e;
  border-color: #7659b9;
}

.upload-area {
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px dashed #555476;
  border-radius: 13px;
  background: #0c0e1c;
  margin-bottom: 22px;
  overflow: hidden;
  padding: 18px;
}

.upload-icon,
.result-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  margin: 0 auto 13px;
  border-radius: 15px;
  color: #c5b7ff;
  background: #9878ff20;
  border: 1px solid #9878ff55;
  font-size: 26px;
}

.upload-area p {
  margin-bottom: 12px;
  font-size: 14px;
}

#browseBtn,
#removeImage {
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #725bd0;
  color: #e3dbff;
  background: #322650;
  font-size: 12px;
}

.upload-area small {
  display: block;
  margin-top: 12px;
  color: #858ba8;
  font-size: 10px;
}

#previewBox img {
  display: block;
  max-width: 100%;
  max-height: 230px;
  margin: 0 auto 12px;
  border-radius: 9px;
  object-fit: contain;
}

.hidden {
  display: none !important;
}

.panel > label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin: 18px 0 9px;
}

textarea,
select {
  width: 100%;
  color: var(--text);
  background: #0a0c19;
  border: 1px solid #30344d;
  border-radius: 10px;
  outline: none;
}

textarea {
  min-height: 115px;
  padding: 13px;
  resize: vertical;
  font-size: 13px;
  line-height: 1.7;
}

textarea::placeholder {
  color: #727994;
}

textarea:focus,
select:focus {
  border-color: var(--purple);
}

.settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}

.settings label {
  display: block;
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 8px;
}

.settings select {
  padding: 12px 8px;
  font-size: 12px;
}

.generate {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 11px;
  background: linear-gradient(100deg, #8661ed, #6c83f1, #49b9d2);
  color: white;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 8px 25px #7658e833;
  transition: transform 0.2s;
}

.generate:hover {
  transform: translateY(-2px);
}

.generate:disabled {
  opacity: 0.6;
  cursor: wait;
}

#message {
  color: #ffb8c2;
  font-size: 12px;
  line-height: 1.6;
  margin-top: 14px;
  overflow-wrap: anywhere;
}

.result-panel {
  display: flex;
  flex-direction: column;
}

.placeholder {
  min-height: 330px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  border-radius: 13px;
  border: 1px solid #292d46;
  background: radial-gradient(ellipse at center, #272044, #0b0d1a 75%);
}

.placeholder h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.placeholder p {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

#resultVideo {
  display: block;
  width: 100%;
  max-height: 420px;
  border-radius: 12px;
  background: #000;
}

.download {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 13px;
  margin-top: 15px;
  border: 1px solid #725bd0;
  border-radius: 9px;
  background: #30264e;
  color: white;
  font-size: 13px;
}

.download[hidden],
#resultVideo[hidden] {
  display: none;
}

.note {
  color: #9298b2;
  font-size: 11px;
  line-height: 1.7;
  padding: 14px;
  margin-top: 16px;
  border-radius: 10px;
  background: #0b0e1b;
  border: 1px solid #242840;
}

@media (max-width: 760px) {
  .studio {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 42px;
  }

  .hero h1 {
    font-size: 37px;
  }

  .panel {
    padding: 19px;
  }

  .placeholder {
    min-height: 260px;
  }
}

@media (max-width: 380px) {
  .logo {
    font-size: 17px;
  }

  .status {
    font-size: 10px;
    padding: 7px 9px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .tabs button {
    font-size: 11px;
  }
}
