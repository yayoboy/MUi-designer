import { useStore } from "../store";

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
        <label>Zoom: {Math.round(zoom * 100)}%</label>
        <div className="button-group">
          <button onClick={handleZoomOut} disabled={zoom <= 0.25}>
            -
          </button>
          <button onClick={handleZoomReset}>Reset</button>
          <button onClick={handleZoomIn} disabled={zoom >= 4}>
            +
          </button>
        </div>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={toggleGrid}
          />
          Show Grid
        </label>
        {showGrid && (
          <div className="grid-size-control">
            <label>Grid Size:</label>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
            >
              <option value={5}>5px</option>
              <option value={10}>10px</option>
              <option value={20}>20px</option>
              <option value={50}>50px</option>
            </select>
          </div>
        )}
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={showRulers}
            onChange={toggleRulers}
          />
          Show Rulers
        </label>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={toggleSnapToGrid}
          />
          Snap to Grid
        </label>
      </div>
    </div>
  );
}
