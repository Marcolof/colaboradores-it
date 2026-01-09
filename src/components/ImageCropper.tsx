import { useRef, useState, useEffect } from 'react';
import { Upload, ZoomIn, ZoomOut } from 'lucide-react';

type Props = {
  onImageCropped: (dataUrl: string) => void;
  initialImage?: string | null;
};

export function ImageCropper({ onImageCropped, initialImage }: Props) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    if (image) {
      imgRef.current.src = image;
      imgRef.current.onload = () => {
        drawImage();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, scale, position]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 105;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.scale(scale, scale);
    ctx.translate(-size / 2 + position.x, -size / 2 + position.y);

    const img = imgRef.current;
    const imgAspect = img.width / img.height;
    const canvasAspect = 1;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawHeight = size;
      drawWidth = size * imgAspect;
      offsetX = (size - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = size;
      drawHeight = size / imgAspect;
      offsetX = 0;
      offsetY = (size - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/png');
    onImageCropped(dataUrl);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!image ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-[105px] h-[105px] border-2 border-dashed border-vortex-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-vortex-primary transition-all duration-200"
          >
            <Upload className="w-6 h-6 text-vortex-primary" />
            <span className="text-xs text-vortex-text-secondary font-medium">Subir foto</span>
          </button>
        ) : (
          <>
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={105}
                height={105}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="border-2 border-vortex-primary rounded-lg cursor-move shadow-vortex"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                className="p-2 border border-vortex-border rounded-lg hover:bg-vortex-primary hover:text-white transition-all duration-200"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-body-sm text-vortex-text-primary font-semibold min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale(Math.min(3, scale + 0.1))}
                className="p-2 border border-vortex-border rounded-lg hover:bg-vortex-primary hover:text-white transition-all duration-200"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-body-sm text-vortex-accent hover:text-vortex-accent-dark hover:underline font-semibold transition-all duration-200"
            >
              Cambiar imagen
            </button>
          </>
        )}
      </div>
    </div>
  );
}
