// Type definitions matching Rust backend structures

export enum Protocol {
  SPI = "SPI",
  I2C = "I2C",
}

export interface Pinout {
  cs?: number;
  dc?: number;
  rst?: number;
  mosi?: number;
  sck?: number;
  sda?: number;
  scl?: number;
}

export interface DisplayConfig {
  width: number;
  height: number;
  driver: string;
  protocol: Protocol;
  pinout: Pinout;
  rotation: number;
}

export enum ComponentType {
  Button = "Button",
  Label = "Label",
  Image = "Image",
  Rectangle = "Rectangle",
  Circle = "Circle",
  Line = "Line",
}

export interface ComponentProperties {
  text?: string;
  font_size?: number;
  color?: string;
  background_color?: string;
  border_color?: string;
  border_width?: number;
  image_path?: string;
  image_data?: string; // Base64 encoded image data
  image_name?: string; // Original image filename
  alignment?: string;
}

export interface Component {
  id: string;
  component_type: { type: ComponentType };
  x: number;
  y: number;
  width: number;
  height: number;
  properties: ComponentProperties;
}

export interface Project {
  name: string;
  version: string;
  display: DisplayConfig;
  components: Component[];
}
