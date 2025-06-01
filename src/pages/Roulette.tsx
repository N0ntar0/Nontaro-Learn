import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Roulette.css";
import CustomButton from "../componets/Button/Button";

type Item = {
  name: string;
  weight: number;
};

export default function Roulette() {
  const [items, setItems] = useState<Item[]>([
    { name: "項目1", weight: 40 },
    { name: "項目2", weight: 30 },
    { name: "項目3", weight: 30 },
  ]);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  const handleChange = (index: number, key: keyof Item, value: string) => {
    const newItems = [...items];
    if (key === "weight") newItems[index].weight = Number(value);
    else newItems[index].name = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", weight: 0 }]);
  };
  const drawRoulette = useCallback(
    (rotation = 0) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const center = width / 2;
      ctx.clearRect(0, 0, width, height);

      let startAngle = rotation;
      items.forEach((item, i) => {
        const sliceAngle = (item.weight / totalWeight) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, center - 10, startAngle, endAngle);
        ctx.fillStyle = `hsl(${i * 60}, 50%, 70%)`;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        const textAngle = startAngle + sliceAngle / 2;
        const textX = center + Math.cos(textAngle) * (center / 1.7);
        const textY = center + Math.sin(textAngle) * (center / 1.7);
        ctx.fillStyle = "#34251F";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${item.name}`, textX, textY);
        startAngle = endAngle;
      });

      // Draw pointer
      ctx.beginPath();
      ctx.moveTo(center, center - (center - 20));
      ctx.lineTo(center - 10, center - (center - 5));
      ctx.lineTo(center + 10, center - (center - 5));
      ctx.closePath();
      ctx.fillStyle = "#34251F";
      ctx.fill();
    },
    [items, totalWeight]
  );

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let angle = 0;
    let velocity = Math.random() * 20 + 30;

    const animate = () => {
      angle += velocity;
      velocity *= 0.97;

      drawRoulette((angle * Math.PI) / 180);
      if (velocity > 0.5) {
        requestAnimationFrame(animate);
      } else {
        const normalizedAngle = (angle % 360) * (Math.PI / 180);
        determineWinner(normalizedAngle);
        setSpinning(false);
      }
    };

    animate();
  };

  const determineWinner = (angle: number) => {
    let acc = 0;
    const pointerAngle = (3 * Math.PI) / 2 - angle;
    const normalized = (pointerAngle + Math.PI * 2) % (Math.PI * 2);

    for (const item of items) {
      const sliceAngle = (item.weight / totalWeight) * Math.PI * 2;
      if (normalized >= acc && normalized < acc + sliceAngle) {
        setResult(item.name);
        return;
      }
      acc += sliceAngle;
    }
  };

  useEffect(() => {
    drawRoulette();
  }, [items, drawRoulette]);

  return (
    <div className="roulette-container">
      <h2>ルーレット抽選</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="roulette-canvas"
      />
      {items.map((item, index) => (
        <div key={index} className="item-row">
          <input
            type="text"
            value={item.name}
            placeholder="項目名"
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            value={item.weight}
            placeholder="確率(%)"
            onChange={(e) => handleChange(index, "weight", e.target.value)}
          />
        </div>
      ))}
      <div className="buttons">
        <CustomButton variant="light" onClick={addItem}>
          +
        </CustomButton>
        <CustomButton variant="dark" onClick={spin}>
          抽選
        </CustomButton>
      </div>
      {result && <div className="result">🎉 当選: {result} 🎉</div>}
    </div>
  );
}
