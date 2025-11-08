# MUi Designer - Microcontroller UI Editor

Un editor visuale desktop ibrido per la creazione di interfacce per display di microcontrollori ESP32/RP2040.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Caratteristiche

- **Editor Visuale Drag & Drop**: Interfaccia intuitiva per progettare UI senza scrivere codice
- **Supporto Multi-Display**: ST7789, ST7735, ILI9341, SSD1306 e altri
- **Generazione Codice Automatica**: Esporta in Arduino (.ino) o ESPHome (.yaml)
- **Configurazione Completa**: Personalizza driver, protocollo (SPI/I2C), pinout
- **Preview in Tempo Reale**: Visualizza il layout esattamente come apparirà sul display
- **Componenti UI Integrati**: Label, Button, Rectangle, Circle, Image e altro

## 🛠️ Tecnologie

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Rust + Tauri
- **State Management**: Zustand
- **Drag & Drop**: react-dnd
- **Code Generation**: Template engine Rust

## 📋 Prerequisiti

- Node.js (v18 o superiore)
- Rust (ultima versione stabile)
- Tauri CLI

## 🚀 Installazione

```bash
# Clona il repository
git clone https://github.com/yourusername/MUi-designer.git
cd MUi-designer

# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run tauri:dev

# Build per produzione
npm run tauri:build
```

## 📖 Utilizzo

1. **Crea un nuovo progetto** e configura le dimensioni del display
2. **Trascina componenti** dal pannello laterale al canvas
3. **Personalizza** posizione, dimensioni, colori e proprietà
4. **Configura il display** (driver, protocollo, pinout) nel pannello proprietà
5. **Genera il codice** Arduino o ESPHome con un click
6. **Esporta** il file generato sul tuo microcontroller

## 🎨 Componenti Disponibili

- **Label**: Testo statico con font e colore personalizzabili
- **Button**: Pulsante con testo e stile configurabile
- **Rectangle**: Rettangolo con riempimento e bordo
- **Circle**: Cerchio/ellisse con stile personalizzabile
- **Image**: Visualizzazione immagini (bitmap)
- **Line**: Linea con spessore e colore

## 🔧 Configurazione Display

### Display Supportati
- ST7789 (TFT 240x240)
- ST7735 (TFT 128x160)
- ILI9341 (TFT 240x320)
- SSD1306 (OLED 128x64)

### Protocolli
- **SPI**: CS, DC, RST, MOSI, SCK
- **I2C**: SDA, SCL

## 📝 Generazione Codice

### Arduino
Genera sketch completi con:
- Inizializzazione display
- Configurazione pin
- Funzioni di disegno UI
- Librerie Adafruit GFX

### ESPHome
Genera configurazioni YAML con:
- Setup display
- Configurazione WiFi/API
- Lambda per rendering UI
- Integrazione Home Assistant

## 🗂️ Struttura Progetto

```
MUi-designer/
├── src/                    # Frontend React/TypeScript
│   ├── components/         # Componenti UI React
│   ├── styles/            # CSS styles
│   ├── types.ts           # Definizioni TypeScript
│   ├── store.ts           # State management
│   └── main.tsx           # Entry point
├── src-tauri/             # Backend Rust
│   ├── src/
│   │   └── main.rs        # Logica backend e API
│   ├── Cargo.toml         # Dipendenze Rust
│   └── tauri.conf.json    # Configurazione Tauri
└── package.json           # Dipendenze Node.js
```

## ✅ Funzionalità Implementate

- [x] Setup progetto Tauri + React/TypeScript
- [x] Strutture dati core (Project, Display, Components)
- [x] API backend per salvataggio/caricamento progetti
- [x] Canvas dinamico con visualizzazione display
- [x] Componenti UI di base (Button, Label, Rectangle, Circle)
- [x] Drag-and-drop per aggiungere/spostare componenti
- [x] Pannello proprietà per editing completo
- [x] Generatore codice Arduino (.ino)
- [x] Generatore codice ESPHome (.yaml)
- [x] Visualizzatore codice generato
- [x] Customizzazione display (driver, protocollo, pinout)
- [x] Preview/simulazione layout in tempo reale

## 🔮 Roadmap Futura

- [ ] Motore di templating avanzato con Tera
- [ ] Supporto immagini bitmap
- [ ] Integrazione flash diretto su microcontrollore
- [ ] Libreria componenti predefiniti
- [ ] Supporto animazioni
- [ ] Export C++ puro (senza Arduino)
- [ ] Temi UI personalizzabili

## 🤝 Contribuire

Le contribuzioni sono benvenute! Sentiti libero di aprire issue o pull request.

## 📄 Licenza

MIT License - vedi LICENSE per dettagli

## 👨‍💻 Autore

Sviluppato con ❤️ per la community maker
