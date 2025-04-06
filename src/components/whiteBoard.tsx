import * as fabric from "fabric";
import { useRef, useEffect, useState } from "react";
import "../index.css";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  //   const canvasStyles: React.CSSProperties = {
  //     border: "1px solid #ccc",
  //     background: "#fff",
  //     display: "block",
  //   };
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: "#ffffff",
      width: 800,
      height:500
    });
    fabricCanvasRef.current = initCanvas;
    fabricCanvasRef.current.isDrawingMode = true;
    initCanvas.renderAll();
    return () => {
      initCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    const brush = fabricCanvasRef.current?.freeDrawingBrush;
    if (brush) {
      brush.width = brushSize;
    }
    // if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
    //   fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
    // }
  }, [brushSize]);

  useEffect(() => {
    const brush = fabricCanvasRef.current?.freeDrawingBrush;
    if (brush) {
      brush.color = brushColor;
    }
    // if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
    //   fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
    // }
  }, [brushColor]);

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = "#ffffff";
      fabricCanvasRef.current.renderAll();
    }
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-3 d-flex gap-3">
        {/* Brush Color */}
        <div>
          <label htmlFor="brush-color" className="form-label">
            Brush Color
          </label>
          <input
            id="brush-color"
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="form-control form-control-color"
          />
        </div>

        {/* Brush Size */}
        <div>
          <label htmlFor="brush-size" className="form-label">
            Brush Size
          </label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="form-range"
          />
          <button onClick={clearCanvas} className="clear-button">
            Clear Canvas
          </button>
        </div>
        <div className="canvas-container">
          <canvas ref={canvasRef} id="fabric-canvas" />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
