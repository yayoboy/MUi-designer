import { useStore } from "../store";
import { Protocol } from "../types";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";

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
              <Label.Root htmlFor="display-width">Width</Label.Root>
              <input
                id="display-width"
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
              <Label.Root htmlFor="display-height">Height</Label.Root>
              <input
                id="display-height"
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

        <Separator.Root className="property-separator" />

        <div className="property-group">
          <h4>Configuration</h4>
          <div className="property-field">
            <Label.Root htmlFor="driver-select">Driver</Label.Root>
            <Select.Root
              value={project.display.driver}
              onValueChange={(value) =>
                setDisplayConfig({
                  ...project.display,
                  driver: value,
                })
              }
            >
              <Select.Trigger className="select-trigger" id="driver-select">
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport className="select-viewport">
                    <Select.Item className="select-item" value="ST7789">
                      <Select.ItemText>ST7789</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="ST7735">
                      <Select.ItemText>ST7735</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="ILI9341">
                      <Select.ItemText>ILI9341</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="SSD1306">
                      <Select.ItemText>SSD1306</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="property-field">
            <Label.Root htmlFor="protocol-select">Protocol</Label.Root>
            <Select.Root
              value={project.display.protocol}
              onValueChange={(value) =>
                setDisplayConfig({
                  ...project.display,
                  protocol: value as Protocol,
                })
              }
            >
              <Select.Trigger className="select-trigger" id="protocol-select">
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport className="select-viewport">
                    <Select.Item className="select-item" value={Protocol.SPI}>
                      <Select.ItemText>SPI</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value={Protocol.I2C}>
                      <Select.ItemText>I2C</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        <Separator.Root className="property-separator" />

        <div className="property-group">
          <h4>Pinout</h4>
          {project.display.protocol === Protocol.SPI ? (
            <>
              <div className="property-row">
                <div className="property-field">
                  <Label.Root htmlFor="cs-pin">CS Pin</Label.Root>
                  <input
                    id="cs-pin"
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
                  <Label.Root htmlFor="dc-pin">DC Pin</Label.Root>
                  <input
                    id="dc-pin"
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
                <Label.Root htmlFor="rst-pin">RST Pin</Label.Root>
                <input
                  id="rst-pin"
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
                <Label.Root htmlFor="sda-pin">SDA Pin</Label.Root>
                <input
                  id="sda-pin"
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
                <Label.Root htmlFor="scl-pin">SCL Pin</Label.Root>
                <input
                  id="scl-pin"
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
            <Label.Root htmlFor="component-x">X</Label.Root>
            <input
              id="component-x"
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
            <Label.Root htmlFor="component-y">Y</Label.Root>
            <input
              id="component-y"
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
            <Label.Root htmlFor="component-width">Width</Label.Root>
            <input
              id="component-width"
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
            <Label.Root htmlFor="component-height">Height</Label.Root>
            <input
              id="component-height"
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

      <Separator.Root className="property-separator" />

      <div className="property-group">
        <h4>Appearance</h4>
        {selectedComponent.properties.text !== undefined && (
          <div className="property-field">
            <Label.Root htmlFor="component-text">Text</Label.Root>
            <input
              id="component-text"
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
          <Label.Root htmlFor="text-color">Text Color</Label.Root>
          <input
            id="text-color"
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
          <Label.Root htmlFor="bg-color">Background Color</Label.Root>
          <input
            id="bg-color"
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
          <Label.Root htmlFor="border-color">Border Color</Label.Root>
          <input
            id="border-color"
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
            <Label.Root htmlFor="font-size">Font Size</Label.Root>
            <input
              id="font-size"
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

      <Separator.Root className="property-separator" />

      <div className="property-group">
        <button
          className="delete-button"
          onClick={() => deleteComponent(selectedComponent.id)}
        >
          <TrashIcon />
          <span>Delete Component</span>
        </button>
      </div>
    </div>
  );
}
