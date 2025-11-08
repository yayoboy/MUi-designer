import { useState } from "react";
import { useDrag } from "react-dnd";

interface ImageItem {
  id: string;
  name: string;
  data: string; // base64 data URL
  width: number;
  height: number;
}

function DraggableImage({ image }: { image: ImageItem }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { imageData: image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="image-library-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={image.data}
        alt={image.name}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: 80,
          objectFit: "contain",
        }}
      />
      <div className="image-name">{image.name}</div>
      <div className="image-size">{image.width}x{image.height}</div>
    </div>
  );
}

export default function ImageLibrary() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newImage: ImageItem = {
            id: `img-${Date.now()}-${Math.random()}`,
            name: file.name,
            data: event.target?.result as string,
            width: img.width,
            height: img.height,
          };
          setImages((prev) => [...prev, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="image-library">
      <div className="image-library-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Image Library {isExpanded ? "▼" : "▶"}</h3>
        <span className="image-count">{images.length} images</span>
      </div>

      {isExpanded && (
        <>
          <div className="upload-section">
            <label htmlFor="image-upload" className="upload-button">
              Upload Images
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="image-library-grid">
            {images.length === 0 ? (
              <div className="empty-library">
                <p>No images uploaded yet</p>
                <p style={{ fontSize: 11 }}>Upload images to use in your design</p>
              </div>
            ) : (
              images.map((image) => (
                <div key={image.id} className="image-item-wrapper">
                  <DraggableImage image={image} />
                  <button
                    className="delete-image-btn"
                    onClick={() => handleDelete(image.id)}
                    title="Delete image"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
