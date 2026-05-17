"use client";

import type { FearLevel } from "../../types/gwimap";

interface Props {
  fearLevel: FearLevel | 0;
  category: string;
  onFearLevelChange: (fearLevel: FearLevel | 0) => void;
  onCategoryChange: (category: string) => void;
}

export function SpotFilterPanel({
  fearLevel,
  category,
  onFearLevelChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="card filter-panel">
      <h3>필터</h3>
      <label>
        공포 레벨
        <select value={fearLevel} onChange={(e) => onFearLevelChange(Number(e.target.value) as FearLevel | 0)}>
          <option value={0}>전체</option>
          <option value={1}>Lv1</option>
          <option value={2}>Lv2</option>
          <option value={3}>Lv3</option>
          <option value={4}>Lv4</option>
          <option value={5}>Lv5</option>
        </select>
      </label>
      <label>
        카테고리
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">전체</option>
          <option value="sighting">목격</option>
          <option value="sound">소리</option>
          <option value="presence">기운</option>
          <option value="other">기타</option>
        </select>
      </label>
    </div>
  );
}
