import { useStore } from "../store";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export default function ViewControls() {
  const {
    zoom,
    setZoom,
    showGrid,
    toggleGrid,
    showRulers,
    toggleRulers,
    snapToGrid,
    toggleSnapToGrid,
    gridSize,
    setGridSize,
  } = useStore();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.25));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  return (
    <div className="view-controls">
      <div className="control-group">
        <span className="toolbar-label">
          Zoom: {Math.round(zoom * 100)}%
        </span>
        <button
          className="toolbar-button"
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
        >
          −
        </button>
        <button className="toolbar-button" onClick={handleZoomReset}>
          Reset
        </button>
        <button
          className="toolbar-button"
          onClick={handleZoomIn}
          disabled={zoom >= 4}
        >
          +
        </button>
      </div>

      <Separator.Root className="toolbar-separator" orientation="vertical" />

      <div className="control-group">
        <label className="checkbox-label">
          <Checkbox.Root
            className="checkbox-root"
            checked={showGrid}
            onCheckedChange={toggleGrid}
          >
            <Checkbox.Indicator className="checkbox-indicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span>Show Grid</span>
        </label>

        {showGrid && (
          <div className="grid-size-control">
            <label>Grid Size:</label>
            <Select.Root
              value={gridSize.toString()}
              onValueChange={(value) => setGridSize(Number(value))}
            >
              <Select.Trigger className="select-trigger">
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport className="select-viewport">
                    <Select.Item className="select-item" value="5">
                      <Select.ItemText>5px</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="10">
                      <Select.ItemText>10px</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="20">
                      <Select.ItemText>20px</Select.ItemText>
                    </Select.Item>
                    <Select.Item className="select-item" value="50">
                      <Select.ItemText>50px</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        )}
      </div>

      <Separator.Root className="toolbar-separator" orientation="vertical" />

      <div className="control-group">
        <label className="checkbox-label">
          <Checkbox.Root
            className="checkbox-root"
            checked={showRulers}
            onCheckedChange={toggleRulers}
          >
            <Checkbox.Indicator className="checkbox-indicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span>Show Rulers</span>
        </label>
      </div>

      <Separator.Root className="toolbar-separator" orientation="vertical" />

      <div className="control-group">
        <label className="checkbox-label">
          <Checkbox.Root
            className="checkbox-root"
            checked={snapToGrid}
            onCheckedChange={toggleSnapToGrid}
          >
            <Checkbox.Indicator className="checkbox-indicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span>Snap to Grid</span>
        </label>
      </div>
    </div>
  );
}
