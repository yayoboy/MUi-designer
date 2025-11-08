import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useStore } from "../store";
import { Component, ComponentType } from "../types";

function CanvasComponent({ component }: { component: Component }) {
  const { selectedComponent, setSelectedComponent, updateComponent, snapToGrid, gridSize } =
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
    let newX = e.clientX - rect.left - dragOffset.x;
    let newY = e.clientY - rect.top - dragOffset.y;

    // Apply snap to grid if enabled
    if (snapToGrid) {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

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

      case ComponentType.Image:
        return (
          <div className="canvas-component" style={style} onMouseDown={handleMouseDown}>
            {component.properties.image_data && (
              <img
                src={component.properties.image_data}
                alt={component.properties.image_name || "Image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
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
  const {
    project,
    addComponent,
    setSelectedComponent,
    zoom,
    showGrid,
    gridSize,
    showRulers,
    snapToGrid,
  } = useStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["component", "image"],
    drop: (item: { componentType?: ComponentType; imageData?: any }, monitor) => {
      const offset = monitor.getClientOffset();

      if (!offset) return;

      // Get the canvas element from the drop target
      const canvasElement = document.querySelector('.canvas');
      if (!canvasElement) return;

      const canvasRect = canvasElement.getBoundingClientRect();
      let x = offset.x - canvasRect.left;
      let y = offset.y - canvasRect.top;

      // Handle image drop
      if (item.imageData) {
        const img = item.imageData;
        if (snapToGrid) {
          x = snapToGridCoord(x - img.width / 2);
          y = snapToGridCoord(y - img.height / 2);
        } else {
          x = Math.max(0, x - img.width / 2);
          y = Math.max(0, y - img.height / 2);
        }

        const newComponent: Component = {
          id: `comp-${Date.now()}`,
          component_type: { type: ComponentType.Image },
          x,
          y,
          width: img.width,
          height: img.height,
          properties: {
            image_data: img.data,
            image_name: img.name,
            color: "#000000",
            background_color: "transparent",
            border_color: "#CCCCCC",
            border_width: 0,
          },
        };
        addComponent(newComponent);
        return;
      }

      // Handle component drop
      if (!item.componentType) return;

      // Apply snap to grid if enabled
      if (snapToGrid) {
        x = snapToGridCoord(x - 50);
        y = snapToGridCoord(y - 25);
      } else {
        x = Math.max(0, x - 50);
        y = Math.max(0, y - 25);
      }

      const newComponent: Component = {
        id: `comp-${Date.now()}`,
        component_type: { type: item.componentType },
        x,
        y,
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleCanvasClick = () => {
    setSelectedComponent(null);
  };

  // Helper function to snap coordinates to grid
  const snapToGridCoord = (value: number) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  // Render grid overlay
  const renderGrid = () => {
    if (!showGrid) return null;

    const lines = [];
    const width = project.display.width;
    const height = project.display.height;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="#e0e0e0"
          strokeWidth={1 / zoom}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#e0e0e0"
          strokeWidth={1 / zoom}
        />
      );
    }

    return (
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {lines}
      </svg>
    );
  };

  // Render rulers
  const renderRulers = () => {
    if (!showRulers) return null;

    const width = project.display.width;
    const height = project.display.height;
    const rulerSize = 20;

    return (
      <>
        {/* Horizontal ruler */}
        <div
          className="ruler horizontal"
          style={{
            position: "absolute",
            top: -rulerSize,
            left: 0,
            width: width * zoom,
            height: rulerSize,
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ccc",
            fontSize: 10,
          }}
        >
          {Array.from({ length: Math.floor(width / 50) + 1 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * 50 * zoom,
                top: 0,
                height: "100%",
                borderLeft: "1px solid #999",
                paddingLeft: 2,
              }}
            >
              {i * 50}
            </div>
          ))}
        </div>

        {/* Vertical ruler */}
        <div
          className="ruler vertical"
          style={{
            position: "absolute",
            top: 0,
            left: -rulerSize,
            width: rulerSize,
            height: height * zoom,
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #ccc",
            fontSize: 10,
          }}
        >
          {Array.from({ length: Math.floor(height / 50) + 1 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: i * 50 * zoom,
                left: 0,
                width: "100%",
                borderTop: "1px solid #999",
                paddingLeft: 2,
              }}
            >
              {i * 50}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="canvas-container" style={{ position: "relative", padding: showRulers ? 20 : 0 }}>
      {showRulers && renderRulers()}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          position: "relative",
        }}
      >
        <div
          ref={drop}
          className="canvas"
          style={{
            width: project.display.width,
            height: project.display.height,
            backgroundColor: isOver ? "#f0f0f0" : "#ffffff",
            transition: "background-color 0.2s ease",
            position: "relative",
            border: "1px solid #ccc",
          }}
          onClick={handleCanvasClick}
        >
          {renderGrid()}
          {project.components.map((comp) => (
            <CanvasComponent key={comp.id} component={comp} />
          ))}
        </div>
      </div>
    </div>
  );
}
