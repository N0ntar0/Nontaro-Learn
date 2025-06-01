import { useState } from "react";
import "../styles/Roulette.css";
import CustomButton from "../componets/Button/Button";

type Item = {
  name: string;
  weight: number;
};

export default function Roulette() {
  const [items, setItems] = useState<Item[]>([{ name: "", weight: 0 }]);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (index: number, key: keyof Item, value: string) => {
    const newItems = [...items];
    if (key === "weight") {
      newItems[index].weight = Number(value);
    } else if (key === "name") {
      newItems[index].name = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", weight: 0 }]);
  };

  const draw = () => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight <= 0) {
      alert("抽選確率の合計が0です");
      return;
    }

    const rand = Math.random() * totalWeight;
    let acc = 0;
    for (const item of items) {
      acc += item.weight;
      if (rand <= acc) {
        setResult(item.name);
        return;
      }
    }
  };

  return (
    <div className="roulette-container">
      <h2>ルーレット抽選</h2>
      {items.map((item, index) => (
        <div key={index} className="item-row">
          <input
            type="text"
            placeholder="項目名"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="確率（%）"
            value={item.weight}
            onChange={(e) => handleChange(index, "weight", e.target.value)}
          />
        </div>
      ))}
      <div className="buttons">
        <CustomButton variant="light" onClick={addItem}>
          +
        </CustomButton>
        <CustomButton variant="dark" onClick={draw}>
          抽選
        </CustomButton>
      </div>
      {result && <div className="result">🎉 当選: {result} 🎉</div>}
    </div>
  );
}
