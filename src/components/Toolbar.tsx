import { invoke } from "@tauri-apps/api/tauri";
import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { useStore } from "../store";

export default function Toolbar() {
  const { project, setProject } = useStore();

  const handleNew = () => {
    if (confirm("Create new project? Unsaved changes will be lost.")) {
      window.location.reload();
    }
  };

  const handleOpen = async () => {
    try {
      const selected = await open({
        filters: [{ name: "MUi Project", extensions: ["mui"] }],
      });

      if (selected && typeof selected === "string") {
        const content = await readTextFile(selected);
        const loadedProject = JSON.parse(content);
        setProject(loadedProject);
      }
    } catch (error) {
      console.error("Error opening project:", error);
      alert("Failed to open project");
    }
  };

  const handleSave = async () => {
    try {
      const filePath = await save({
        filters: [{ name: "MUi Project", extensions: ["mui"] }],
        defaultPath: `${project.name}.mui`,
      });

      if (filePath) {
        const result = await invoke("save_project", {
          path: filePath,
          project,
        });
        console.log(result);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleExport = async () => {
    try {
      const arduinoCode = await invoke<string>("generate_arduino_code", {
        project,
      });

      const filePath = await save({
        filters: [{ name: "Arduino Sketch", extensions: ["ino"] }],
        defaultPath: `${project.name}.ino`,
      });

      if (filePath) {
        await writeTextFile(filePath, arduinoCode);
        alert("Arduino code exported successfully!");
      }
    } catch (error) {
      console.error("Error exporting Arduino code:", error);
      alert("Failed to export Arduino code");
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button onClick={handleNew}>New</button>
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <label htmlFor="project-name">Project:</label>
        <input
          id="project-name"
          type="text"
          value={project.name}
          onChange={(e) =>
            setProject({ ...project, name: e.target.value })
          }
        />
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={handleExport}>Export Arduino</button>
      </div>
    </div>
  );
}
