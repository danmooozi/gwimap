"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Spot } from "../../types/gwimap";

interface Props {
  spots: Spot[];
}

export function MapCanvas({ spots }: Props) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

  const markerPayload = useMemo(
    () => spots.map((spot) => ({ id: spot.id, name: spot.name, lat: spot.lat, lng: spot.lng })),
    [spots],
  );

  useEffect(() => {
    if (!appKey) {
      setMapError("NEXT_PUBLIC_KAKAO_MAP_APP_KEY가 설정되지 않았습니다.");
      return;
    }

    const scriptId = "kakao-map-sdk";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing && window.kakao?.maps) {
      window.kakao.maps.load(() => setMapReady(true));
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=clusterer`;
    script.onload = () => {
      if (!window.kakao?.maps) {
        setMapError("Kakao Map SDK 로드에 실패했습니다.");
        return;
      }
      window.kakao.maps.load(() => setMapReady(true));
    };
    script.onerror = () => setMapError("Kakao Map SDK 스크립트 로드 중 오류가 발생했습니다.");
    document.head.appendChild(script);
  }, [appKey]);

  useEffect(() => {
    if (!mapReady || !mapElementRef.current || !window.kakao?.maps) return;
    const kakao = window.kakao;
    const center = markerPayload[0]
      ? new kakao.maps.LatLng(markerPayload[0].lat, markerPayload[0].lng)
      : new kakao.maps.LatLng(37.5665, 126.978);

    const map = new kakao.maps.Map(mapElementRef.current, {
      center,
      level: 8,
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
    });

    const bounds = new kakao.maps.LatLngBounds();
    const markers = markerPayload.map((spot) => {
      const position = new kakao.maps.LatLng(spot.lat, spot.lng);
      bounds.extend(position);
      return new kakao.maps.Marker({
        position,
        title: spot.name,
      });
    });

    clusterer.addMarkers(markers);
    if (markers.length > 0) {
      map.setBounds(bounds);
    }
  }, [mapReady, markerPayload]);

  return (
    <section className="map-canvas">
      <div className="map-placeholder">
        {mapError ? mapError : <div ref={mapElementRef} className="map-surface" />}
      </div>
      <div className="spot-list">
        {spots.map((spot) => (
          <Link className="card" key={spot.id} href={`/spots/${spot.id}`}>
            <strong>{spot.name}</strong>
            <span>공포 레벨: Lv{spot.fearLevel}</span>
            <span>제보 수: {spot.reportCount}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
