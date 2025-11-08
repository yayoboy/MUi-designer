import { useStore } from "../store";
import { Protocol } from "../types";

export default function PropertiesPanel() {
  const { selectedComponent, updateComponent, deleteComponent, project, setDisplayConfig } =
    useStore();

  if (!selectedComponent) {
    return (
      <div className="properties-panel">
        <h3>Display Settings</h3>

        <div className="property-group">
          <h4>Dimensions</h4>
          <div className="property-row">
            <div className="property-field">
              <label>Width</label>
              <input
                type="number"
                value={project.display.width}
                onChange={(e) =>
                  setDisplayConfig({
                    ...project.display,
                    width: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="property-field">
              <label>Height</label>
              <input
                type="number"
                value={project.display.height}
                onChange={(e) =>
                  setDisplayConfig({
                    ...project.display,
                    height: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="property-group">
          <h4>Configuration</h4>
          <div className="property-field">
            <label>Driver</label>
            <select
              value={project.display.driver}
              onChange={(e) =>
                setDisplayConfig({
                  ...project.display,
                  driver: e.target.value,
                })
              }
            >
              <option value="ST7789">ST7789</option>
              <option value="ST7735">ST7735</option>
              <option value="ILI9341">ILI9341</option>
              <option value="SSD1306">SSD1306</option>
            </select>
          </div>

          <div className="property-field">
            <label>Protocol</label>
            <select
              value={project.display.protocol}
              onChange={(e) =>
                setDisplayConfig({
                  ...project.display,
                  protocol: e.target.value as Protocol,
                })
              }
            >
              <option value={Protocol.SPI}>SPI</option>
              <option value={Protocol.I2C}>I2C</option>
            </select>
          </div>
        </div>

        <div className="property-group">
          <h4>Pinout</h4>
          {project.display.protocol === Protocol.SPI ? (
            <>
              <div className="property-row">
                <div className="property-field">
                  <label>CS Pin</label>
                  <input
                    type="number"
                    value={project.display.pinout.cs || ""}
                    onChange={(e) =>
                      setDisplayConfig({
                        ...project.display,
                        pinout: {
                          ...project.display.pinout,
                          cs: parseInt(e.target.value) || undefined,
                        },
                      })
                    }
                  />
                </div>
                <div className="property-field">
                  <label>DC Pin</label>
                  <input
                    type="number"
                    value={project.display.pinout.dc || ""}
                    onChange={(e) =>
                      setDisplayConfig({
                        ...project.display,
                        pinout: {
                          ...project.display.pinout,
                          dc: parseInt(e.target.value) || undefined,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="property-field">
                <label>RST Pin</label>
                <input
                  type="number"
                  value={project.display.pinout.rst || ""}
                  onChange={(e) =>
                    setDisplayConfig({
                      ...project.display,
                      pinout: {
                        ...project.display.pinout,
                        rst: parseInt(e.target.value) || undefined,
                      },
                    })
                  }
                />
              </div>
            </>
          ) : (
            <div className="property-row">
              <div className="property-field">
                <label>SDA Pin</label>
                <input
                  type="number"
                  value={project.display.pinout.sda || ""}
                  onChange={(e) =>
                    setDisplayConfig({
                      ...project.display,
                      pinout: {
                        ...project.display.pinout,
                        sda: parseInt(e.target.value) || undefined,
                      },
                    })
                  }
                />
              </div>
              <div className="property-field">
                <label>SCL Pin</label>
                <input
                  type="number"
                  value={project.display.pinout.scl || ""}
                  onChange={(e) =>
                    setDisplayConfig({
                      ...project.display,
                      pinout: {
                        ...project.display.pinout,
                        scl: parseInt(e.target.value) || undefined,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <h3>Properties</h3>

      <div className="property-group">
        <h4>Position & Size</h4>
        <div className="property-row">
          <div className="property-field">
            <label>X</label>
            <input
              type="number"
              value={selectedComponent.x}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  x: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="property-field">
            <label>Y</label>
            <input
              type="number"
              value={selectedComponent.y}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  y: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        <div className="property-row">
          <div className="property-field">
            <label>Width</label>
            <input
              type="number"
              value={selectedComponent.width}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  width: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="property-field">
            <label>Height</label>
            <input
              type="number"
              value={selectedComponent.height}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  height: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="property-group">
        <h4>Appearance</h4>
        {selectedComponent.properties.text !== undefined && (
          <div className="property-field">
            <label>Text</label>
            <input
              type="text"
              value={selectedComponent.properties.text || ""}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  properties: {
                    ...selectedComponent.properties,
                    text: e.target.value,
                  },
                })
              }
            />
          </div>
        )}
        <div className="property-field">
          <label>Text Color</label>
          <input
            type="color"
            value={selectedComponent.properties.color || "#000000"}
            onChange={(e) =>
              updateComponent(selectedComponent.id, {
                properties: {
                  ...selectedComponent.properties,
                  color: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="property-field">
          <label>Background Color</label>
          <input
            type="color"
            value={selectedComponent.properties.background_color || "#FFFFFF"}
            onChange={(e) =>
              updateComponent(selectedComponent.id, {
                properties: {
                  ...selectedComponent.properties,
                  background_color: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="property-field">
          <label>Border Color</label>
          <input
            type="color"
            value={selectedComponent.properties.border_color || "#CCCCCC"}
            onChange={(e) =>
              updateComponent(selectedComponent.id, {
                properties: {
                  ...selectedComponent.properties,
                  border_color: e.target.value,
                },
              })
            }
          />
        </div>
        {selectedComponent.properties.font_size !== undefined && (
          <div className="property-field">
            <label>Font Size</label>
            <input
              type="number"
              value={selectedComponent.properties.font_size || 14}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  properties: {
                    ...selectedComponent.properties,
                    font_size: parseInt(e.target.value) || 14,
                  },
                })
              }
            />
          </div>
        )}
      </div>

      <div className="property-group">
        <button
          onClick={() => deleteComponent(selectedComponent.id)}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "var(--color-danger)",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Delete Component
        </button>
      </div>
    </div>
  );
}
