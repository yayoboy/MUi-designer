# Changelog

All notable changes to MUi Designer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-14

### Added
- Initial release of MUi Designer
- Complete Tauri + React/TypeScript hybrid application setup
- Visual drag-and-drop editor for microcontroller UIs
- Support for multiple display types (ST7789, ST7735, ILI9341, SSD1306)
- Canvas with real-time preview and component manipulation
- UI Components: Label, Button, Rectangle, Circle, Image, Line
- Properties panel for component customization
- Display configuration panel (driver, protocol, pinout)
- Arduino code generator with Adafruit GFX support
- ESPHome YAML generator for Home Assistant integration
- Code viewer with syntax highlighting and copy functionality
- Project save/load functionality (.mui format)
- macOS optimization and configuration
- Dark theme UI with VS Code-inspired design

### Technical Details
- Frontend: React 18.2, TypeScript 5.3, Vite 5.0
- Backend: Rust (Tauri 1.5)
- State Management: Zustand 4.5
- Drag & Drop: react-dnd 16.0
- Build System: Vite with TypeScript compilation

### Supported Platforms
- macOS (10.13+)
- Linux (Ubuntu 20.04+, Debian 11+)
- Windows 10/11

### Known Issues
- Icons are placeholders and should be replaced for production
- Some npm audit warnings (development dependencies only)
- System tray icon requires proper icon setup

### Security
- File system access limited to user documents
- Dialog prompts for all file operations
- No network access by default
- Shell commands restricted to safe operations

## [Unreleased]

### Planned Features
- Advanced Tera templating engine integration
- Bitmap image support for components
- Direct flash to microcontroller via USB
- Component library with presets
- Animation support
- Pure C++ code export (without Arduino)
- Custom UI themes
- Multi-language support
- Undo/Redo functionality
- Grid snapping and alignment tools
- Component grouping
- Export to multiple platforms (PlatformIO, MicroPython)

### Future Improvements
- Automated testing setup
- CI/CD pipeline
- Professional icon set
- Comprehensive documentation
- Video tutorials
- Example projects library
