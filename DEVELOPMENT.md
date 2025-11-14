# Development Guide - MUi Designer

## Setup Ambiente di Sviluppo

### Prerequisiti

#### macOS
```bash
# Installa Homebrew se non presente
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installa Node.js
brew install node

# Installa Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Installa dipendenze Tauri per macOS
brew install pkg-config
brew install openssl
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

# Installa Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Windows
```powershell
# Installa Node.js da nodejs.org
# Installa Rust da rustup.rs
# Installa Visual Studio Build Tools

# Poi esegui:
npm install -g @tauri-apps/cli
```

### Installazione Dipendenze

```bash
# Clona il repository
git clone https://github.com/yourusername/MUi-designer.git
cd MUi-designer

# Installa dipendenze npm
npm install

# Verifica installazione Tauri
npm run tauri info
```

## Workflow di Sviluppo

### Avvio Dev Server

```bash
# Avvia l'applicazione in modalità sviluppo
npm run tauri:dev

# Solo frontend (senza Tauri window)
npm run dev
```

### Build

```bash
# Build completa per produzione
npm run tauri:build

# Build solo frontend
npm run build
```

### Testing

```bash
# Type checking TypeScript
npx tsc --noEmit

# Build test
npm run build
```

## Struttura del Progetto

```
MUi-designer/
├── src/                        # Frontend React/TypeScript
│   ├── components/            # Componenti React
│   │   ├── Canvas.tsx         # Canvas per editing UI
│   │   ├── Toolbar.tsx        # Barra strumenti principale
│   │   ├── PropertiesPanel.tsx # Pannello proprietà
│   │   ├── ComponentsPanel.tsx # Pannello componenti
│   │   └── CodeViewer.tsx     # Viewer codice generato
│   ├── styles/               # CSS files
│   ├── types.ts              # Definizioni TypeScript
│   ├── store.ts              # State management (Zustand)
│   └── main.tsx              # Entry point React
│
├── src-tauri/                 # Backend Rust
│   ├── src/
│   │   └── main.rs           # Backend logic e Tauri commands
│   ├── Cargo.toml            # Dipendenze Rust
│   ├── tauri.conf.json       # Configurazione Tauri
│   └── icons/                # App icons
│
├── dist/                      # Build output (gitignored)
├── node_modules/              # npm dependencies (gitignored)
└── package.json               # Configurazione npm
```

## Debugging

### macOS Specific

#### Problemi di Firma Codice
Su macOS potresti vedere warning relativi alla firma del codice:
```bash
# Durante lo sviluppo, puoi ignorare questi warning
# Per distribuzione, configura:
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name"
```

#### Permessi File System
L'app richiede permessi per salvare/caricare file:
- Verifica che `tauri.conf.json` includa gli scope corretti
- Durante dev, i permessi vengono richiesti automaticamente

#### Performance su Apple Silicon (M1/M2/M3)
```bash
# Verifica che Rust compili per l'architettura corretta
rustup target add aarch64-apple-darwin
```

### Debug Frontend (React DevTools)

```bash
# Apri DevTools nel Tauri window
# macOS: Cmd + Option + I
# Windows/Linux: F12 o Ctrl + Shift + I
```

### Debug Backend (Rust)

```rust
// Usa println! o log crate per debug output
println!("Debug: {:?}", variable);

// Oppure usa il logger
log::debug!("Debug message");
```

## Problemi Comuni

### 1. "Failed to load icon"
**Soluzione**: Genera le icone richieste
```bash
# Crea un'icona PNG 1024x1024 chiamata app-icon.png
# Poi esegui:
npm install -g @tauri-apps/cli
tauri icon app-icon.png
```

### 2. Type checking errors
**Soluzione**: Esegui type check completo
```bash
npx tsc --noEmit
```

### 3. Port 1420 già in uso
**Soluzione**: Cambia porta in `vite.config.ts` e `tauri.conf.json`

### 4. Rust compilation errors
**Soluzione**: Verifica versione Rust
```bash
rustup update
cargo clean
```

### 5. npm vulnerabilities
```bash
# Le vulnerabilità in esbuild/vite sono solo per dev
# Non influiscono sulla build finale
# Se vuoi aggiornarle (breaking changes):
npm audit fix --force
```

## Hot Reload

Il progetto supporta hot reload sia per frontend che backend:
- **Frontend (React)**: Salva file → auto-reload immediato
- **Backend (Rust)**: Salva `.rs` → ricompila automaticamente

## Ottimizzazioni Produzione

### Build Size

Per ridurre la dimensione del bundle:

1. **Frontend**
```javascript
// vite.config.ts
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
    }
  }
}
```

2. **Backend Rust**
```toml
# Cargo.toml
[profile.release]
opt-level = 'z'     # Optimize for size
lto = true          # Enable Link Time Optimization
codegen-units = 1   # Better optimization
strip = true        # Strip symbols
```

### macOS App Bundle

Il bundle macOS (`.app`) viene creato in:
```
src-tauri/target/release/bundle/macos/MUi Designer.app
```

Per creare DMG installer:
```bash
npm run tauri:build
# Output: src-tauri/target/release/bundle/dmg/
```

## Code Style

### TypeScript/React
- Usa functional components con hooks
- Preferisci `const` e arrow functions
- Type safety: sempre definire tipi espliciti

### Rust
- Segui le convenzioni Rust standard
- Usa `rustfmt` per formattazione
- Esegui `clippy` per linting

```bash
# Format Rust code
cargo fmt

# Lint Rust code
cargo clippy
```

## Contribuire

1. Fork il repository
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

## Risorse

- [Tauri Docs](https://tauri.app/)
- [React DnD](https://react-dnd.github.io/react-dnd/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
