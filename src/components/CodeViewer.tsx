import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "../store";
import * as Tabs from "@radix-ui/react-tabs";
import { CopyIcon, Cross2Icon, CodeIcon } from "@radix-ui/react-icons";

type CodeType = "arduino" | "esphome";

export default function CodeViewer() {
  const { project } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CodeType>("arduino");
  const [arduinoCode, setArduinoCode] = useState("");
  const [esphomeCode, setEsphomeCode] = useState("");

  const generateCode = async (type: CodeType) => {
    try {
      if (type === "arduino" && !arduinoCode) {
        const generatedCode = await invoke<string>("generate_arduino_code", {
          project,
        });
        setArduinoCode(generatedCode);
      } else if (type === "esphome" && !esphomeCode) {
        const generatedCode = await invoke<string>("generate_esphome_code", {
          project,
        });
        setEsphomeCode(generatedCode);
      }
      setActiveTab(type);
      setIsOpen(true);
    } catch (error) {
      console.error("Error generating code:", error);
      alert("Failed to generate code");
    }
  };

  const copyToClipboard = () => {
    const code = activeTab === "arduino" ? arduinoCode : esphomeCode;
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <>
      {!isOpen && (
        <div className="code-viewer-fab">
          <button
            className="fab-button"
            onClick={() => generateCode("arduino")}
            title="Generate Arduino Code"
          >
            <CodeIcon />
            <span>Arduino</span>
          </button>
          <button
            className="fab-button"
            onClick={() => generateCode("esphome")}
            title="Generate ESPHome Code"
          >
            <CodeIcon />
            <span>ESPHome</span>
          </button>
        </div>
      )}

      <div className={`code-viewer ${isOpen ? "open" : ""}`}>
        <Tabs.Root
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as CodeType);
            generateCode(value as CodeType);
          }}
        >
          <div className="code-viewer-header">
            <Tabs.List className="tabs-list">
              <Tabs.Trigger className="tabs-trigger" value="arduino">
                Arduino (.ino)
              </Tabs.Trigger>
              <Tabs.Trigger className="tabs-trigger" value="esphome">
                ESPHome (.yaml)
              </Tabs.Trigger>
            </Tabs.List>
            <div className="header-actions">
              <button className="icon-button" onClick={copyToClipboard} title="Copy code">
                <CopyIcon />
                <span>Copy</span>
              </button>
              <button className="icon-button" onClick={() => setIsOpen(false)} title="Close">
                <Cross2Icon />
              </button>
            </div>
          </div>

          <div className="code-viewer-content">
            <Tabs.Content className="tabs-content" value="arduino">
              {arduinoCode ? (
                <pre>{arduinoCode}</pre>
              ) : (
                <div className="empty-state">
                  <p>Generate Arduino code to see it here</p>
                </div>
              )}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="esphome">
              {esphomeCode ? (
                <pre>{esphomeCode}</pre>
              ) : (
                <div className="empty-state">
                  <p>Generate ESPHome code to see it here</p>
                </div>
              )}
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </>
  );
}
