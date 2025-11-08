import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "../store";

type CodeType = "arduino" | "esphome";

export default function CodeViewer() {
  const { project } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CodeType>("arduino");
  const [code, setCode] = useState("");

  const generateCode = async (type: CodeType) => {
    try {
      let generatedCode: string;
      if (type === "arduino") {
        generatedCode = await invoke<string>("generate_arduino_code", {
          project,
        });
      } else {
        generatedCode = await invoke<string>("generate_esphome_code", {
          project,
        });
      }
      setCode(generatedCode);
      setActiveTab(type);
      setIsOpen(true);
    } catch (error) {
      console.error("Error generating code:", error);
      alert("Failed to generate code");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <>
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={() => generateCode("arduino")}
            style={{
              padding: "12px 24px",
              backgroundColor: "var(--color-accent)",
              borderRadius: "4px",
            }}
          >
            Generate Arduino Code
          </button>
          <button
            onClick={() => generateCode("esphome")}
            style={{
              padding: "12px 24px",
              backgroundColor: "var(--color-accent)",
              borderRadius: "4px",
            }}
          >
            Generate ESPHome Code
          </button>
        </div>
      )}

      <div className={`code-viewer ${isOpen ? "open" : ""}`}>
        <div className="code-viewer-header">
          <div className="code-viewer-tabs">
            <button
              className={`code-viewer-tab ${
                activeTab === "arduino" ? "active" : ""
              }`}
              onClick={() => generateCode("arduino")}
            >
              Arduino (.ino)
            </button>
            <button
              className={`code-viewer-tab ${
                activeTab === "esphome" ? "active" : ""
              }`}
              onClick={() => generateCode("esphome")}
            >
              ESPHome (.yaml)
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
        <div className="code-viewer-content">
          <pre>{code}</pre>
        </div>
      </div>
    </>
  );
}
