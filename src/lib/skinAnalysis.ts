export interface SkinMetrics {
  acneCount: number;
  oilPercentage: number;
  rednessLevel: number;
  hydration: number;
  skinletScore: number;
  skinType: string;
  concerns: string[];
}

export interface ScanRecord {
  id: string;
  date: Date;
  metrics: SkinMetrics;
}

function randomInRange(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export function analyzeSkin(): SkinMetrics {
  const acneCount = Math.round(randomInRange(0, 12));
  const oilPercentage = randomInRange(10, 80);
  const rednessLevel = randomInRange(5, 50);
  const hydration = randomInRange(30, 90);

  const skinletScore = Math.round(
    Math.max(0, Math.min(100, 100 - (acneCount * 2 + oilPercentage * 0.5)))
  );

  const skinType =
    oilPercentage > 60 ? "Oily" :
    oilPercentage < 30 ? "Dry" :
    hydration > 60 ? "Normal" : "Combination";

  const concerns: string[] = [];
  if (acneCount > 5) concerns.push("Acne");
  if (oilPercentage > 50) concerns.push("Excess Oil");
  if (rednessLevel > 30) concerns.push("Redness");
  if (hydration < 40) concerns.push("Dehydration");
  if (concerns.length === 0) concerns.push("Healthy");

  return { acneCount, oilPercentage, rednessLevel, hydration, skinletScore, skinType, concerns };
}

export interface Product {
  name: string;
  brand: string;
  type: string;
  reason: string;
  icon: string;
}

export function getRecommendations(metrics: SkinMetrics): Product[] {
  const products: Product[] = [];

  products.push({
    name: "Gentle Morning Cleanser",
    brand: "COSRX",
    type: "Cleanser",
    reason: "Start with a pH-balanced cleanser for healthy skin barrier",
    icon: "droplets",
  });

  if (metrics.oilPercentage > 50) {
    products.push({
      name: "BHA Blackhead Power Liquid",
      brand: "COSRX",
      type: "Exfoliant",
      reason: "Controls excess sebum and unclogs pores",
      icon: "sparkles",
    });
  }

  if (metrics.acneCount > 3) {
    products.push({
      name: "AC Collection Calming Serum",
      brand: "COSRX",
      type: "Serum",
      reason: "Targets active breakouts with tea tree extract",
      icon: "leaf",
    });
  }

  if (metrics.hydration < 50) {
    products.push({
      name: "Hyaluronic Acid Moisture Barrier",
      brand: "Laneige",
      type: "Essence",
      reason: "Deep hydration with multi-weight hyaluronic acid",
      icon: "droplet",
    });
  }

  if (metrics.rednessLevel > 25) {
    products.push({
      name: "Centella Green Level Serum",
      brand: "PURITO",
      type: "Serum",
      reason: "Calms irritation and reduces redness with centella",
      icon: "heart",
    });
  }

  products.push({
    name: "Water Sleeping Mask",
    brand: "Laneige",
    type: "Moisturizer",
    reason: "Overnight repair and deep moisture replenishment",
    icon: "moon",
  });

  products.push({
    name: "Watery Sun Cream SPF50+",
    brand: "Innisfree",
    type: "Sunscreen",
    reason: "Essential UV protection without white cast",
    icon: "sun",
  });

  return products;
}

// Mock scan history
export function generateMockHistory(): ScanRecord[] {
  const records: ScanRecord[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i * 7);
    records.push({
      id: `scan-${i}`,
      date,
      metrics: analyzeSkin(),
    });
  }
  return records;
}
