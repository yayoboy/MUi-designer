import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useStore } from "../store";
import { Component, ComponentType } from "../types";

function CanvasComponent({ component }: { component: Component }) {
  const { selectedComponent, setSelectedComponent, updateComponent } =
    useStore();
  const isSelected = selectedComponent?.id === component.id;

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(component);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const canvas = document.querySelector(".canvas");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    updateComponent(component.id, {
      x: Math.max(0, Math.min(newX, rect.width - component.width)),
      y: Math.max(0, Math.min(newY, rect.height - component.height)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const renderComponent = () => {
    const style: React.CSSProperties = {
      left: component.x,
      top: component.y,
      width: component.width,
      height: component.height,
      backgroundColor: component.properties.background_color,
      color: component.properties.color,
      borderColor: component.properties.border_color,
      borderWidth: component.properties.border_width || 1,
      borderStyle: "solid",
    };

    switch (component.component_type.type) {
      case ComponentType.Label:
        return (
          <div className="canvas-component" style={style} onMouseDown={handleMouseDown}>
            <span style={{ fontSize: component.properties.font_size || 14 }}>
              {component.properties.text || "Label"}
            </span>
          </div>
        );

      case ComponentType.Button:
        return (
          <div
            className="canvas-component"
            style={{
              ...style,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            onMouseDown={handleMouseDown}
          >
            {component.properties.text || "Button"}
          </div>
        );

      case ComponentType.Rectangle:
        return (
          <div className="canvas-component" style={style} onMouseDown={handleMouseDown} />
        );

      case ComponentType.Circle:
        return (
          <div
            className="canvas-component"
            style={{ ...style, borderRadius: "50%" }}
            onMouseDown={handleMouseDown}
          />
        );

      default:
        return (
          <div className="canvas-component" style={style} onMouseDown={handleMouseDown}>
            {component.component_type.type}
          </div>
        );
    }
  };

  return (
    <>
      {renderComponent()}
      {isSelected && (
        <div
          className="resize-handle se"
          style={{
            left: component.x + component.width - 4,
            top: component.y + component.height - 4,
            position: "absolute",
          }}
        />
      )}
    </>
  );
}

export default function Canvas() {
  const { project, addComponent, setSelectedComponent } = useStore();
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { componentType: ComponentType }, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      const newComponent: Component = {
        id: `comp-${Date.now()}`,
        component_type: { type: item.componentType },
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 25),
        width: 100,
        height: 50,
        properties: {
          text: item.componentType === ComponentType.Label ? "Text" : undefined,
          font_size: 14,
          color: "#000000",
          background_color: "#FFFFFF",
          border_color: "#CCCCCC",
          border_width: 1,
        },
      };

      addComponent(newComponent);
    },
  }));

  const handleCanvasClick = () => {
    setSelectedComponent(null);
  };

  const setCanvasRef = (node: HTMLDivElement | null) => {
    canvasRef.current = node;
    drop(node);
  };

  return (
    <div className="canvas-container">
      <div
        ref={setCanvasRef}
        className="canvas"
        style={{
          width: project.display.width,
          height: project.display.height,
        }}
        onClick={handleCanvasClick}
      >
        {project.components.map((comp) => (
          <CanvasComponent key={comp.id} component={comp} />
        ))}
      </div>
    </div>
  );
}
