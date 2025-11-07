import { create } from "zustand";
import { Project, Component, DisplayConfig, Protocol } from "./types";

interface AppState {
  project: Project;
  selectedComponent: Component | null;
  zoom: number;

  // Actions
  setProject: (project: Project) => void;
  setSelectedComponent: (component: Component | null) => void;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  deleteComponent: (id: string) => void;
  setDisplayConfig: (config: DisplayConfig) => void;
  setZoom: (zoom: number) => void;
}

const defaultDisplay: DisplayConfig = {
  width: 240,
  height: 240,
  driver: "ST7789",
  protocol: Protocol.SPI,
  pinout: {
    cs: 5,
    dc: 4,
    rst: 16,
    mosi: 23,
    sck: 18,
  },
  rotation: 0,
};

const defaultProject: Project = {
  name: "New Project",
  version: "1.0.0",
  display: defaultDisplay,
  components: [],
};

export const useStore = create<AppState>((set) => ({
  project: defaultProject,
  selectedComponent: null,
  zoom: 1,

  setProject: (project) => set({ project }),

  setSelectedComponent: (component) => set({ selectedComponent: component }),

  addComponent: (component) =>
    set((state) => ({
      project: {
        ...state.project,
        components: [...state.project.components, component],
      },
    })),

  updateComponent: (id, updates) =>
    set((state) => ({
      project: {
        ...state.project,
        components: state.project.components.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp
        ),
      },
      selectedComponent:
        state.selectedComponent?.id === id
          ? { ...state.selectedComponent, ...updates }
          : state.selectedComponent,
    })),

  deleteComponent: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        components: state.project.components.filter((comp) => comp.id !== id),
      },
      selectedComponent:
        state.selectedComponent?.id === id ? null : state.selectedComponent,
    })),

  setDisplayConfig: (config) =>
    set((state) => ({
      project: {
        ...state.project,
        display: config,
      },
    })),

  setZoom: (zoom) => set({ zoom }),
}));
