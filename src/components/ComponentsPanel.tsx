import { useDrag } from "react-dnd";
import { ComponentType } from "../types";

const COMPONENTS = [
  { type: ComponentType.Label, icon: "T", label: "Label" },
  { type: ComponentType.Button, icon: "▭", label: "Button" },
  { type: ComponentType.Rectangle, icon: "▢", label: "Rectangle" },
  { type: ComponentType.Circle, icon: "○", label: "Circle" },
  { type: ComponentType.Image, icon: "🖼", label: "Image" },
  { type: ComponentType.Line, icon: "─", label: "Line" },
];

function DraggableComponent({
  type,
  icon,
  label,
}: {
  type: ComponentType;
  icon: string;
  label: string;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { componentType: type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="component-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="component-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function ComponentsPanel() {
  return (
    <div className="components-panel">
      <h3>Components</h3>
      {COMPONENTS.map((comp) => (
        <DraggableComponent
          key={comp.type}
          type={comp.type}
          icon={comp.icon}
          label={comp.label}
        />
      ))}
    </div>
  );
}
