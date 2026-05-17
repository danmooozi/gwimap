"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchSpots } from "../../lib/client/api";
import type { FearLevel, Spot } from "../../types/gwimap";
import { MapCanvas } from "./map-canvas";
import { SpotFilterPanel } from "./spot-filter-panel";

export function SpotList() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fearLevel, setFearLevel] = useState<FearLevel | 0>(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchSpots()
      .then(setSpots)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>스팟 목록을 불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;
  if (!spots.length) return <p>아직 등록된 스팟이 없습니다.</p>;

  const filteredSpots = useMemo(
    () =>
      spots.filter((spot) => {
        if (fearLevel !== 0 && spot.fearLevel !== fearLevel) return false;
        if (category && !spot.categories.includes(category)) return false;
        return true;
      }),
    [spots, fearLevel, category],
  );

  return (
    <>
      <SpotFilterPanel
        fearLevel={fearLevel}
        category={category}
        onFearLevelChange={setFearLevel}
        onCategoryChange={setCategory}
      />
      <MapCanvas spots={filteredSpots} />
    </>
  );
}
