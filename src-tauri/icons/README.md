# Icon Placeholders

Le icone in questa directory sono placeholder e dovrebbero essere sostituite con icone professionali.

Per generare le icone richieste da Tauri, puoi usare:

## Online Tools
- https://icon.kitchen/
- https://www.appicon.co/

## CLI Tools
```bash
# Installa tauri-cli icon generator
npm install -g @tauri-apps/cli

# Genera tutte le icone da un PNG source
tauri icon path/to/icon.png
```

## Icone Richieste

### macOS
- icon.icns (bundle icon per app macOS)

### Windows
- icon.ico (bundle icon per app Windows)

### Linux/General
- 32x32.png
- 128x128.png
- 128x128@2x.png (256x256)

## Raccomandazioni

1. Usa un'immagine PNG quadrata di almeno 1024x1024
2. L'immagine dovrebbe avere uno sfondo trasparente
3. Design minimalista e riconoscibile anche in dimensioni piccole
4. Colori che rappresentino il brand (attualmente: #007acc blu)
