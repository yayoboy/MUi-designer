import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import ComponentsPanel from "./components/ComponentsPanel";
import CodeViewer from "./components/CodeViewer";
import ViewControls from "./components/ViewControls";
import "./styles/App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Toolbar />
        <ViewControls />
        <div className="workspace">
          <ComponentsPanel />
          <Canvas />
          <PropertiesPanel />
        </div>
        <CodeViewer />
      </div>
    </DndProvider>
  );
}

export default App;
