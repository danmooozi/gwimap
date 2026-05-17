"use client";

import { useEffect, useState } from "react";
import { fetchSpotDetail, flagReport } from "../../lib/client/api";

interface Props {
  id: string;
}

export function SpotDetail({ id }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchSpotDetail>> | null>(null);
  const [flaggingId, setFlaggingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSpotDetail(id)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>상세 정보를 불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;
  if (!data) return <p>데이터가 없습니다.</p>;

  async function onFlag(reportId: string) {
    try {
      setFlaggingId(reportId);
      await flagReport(reportId, "false_info");
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          reports: prev.reports.filter((r) => r.id !== reportId),
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "신고 처리 중 오류가 발생했습니다.");
    } finally {
      setFlaggingId(null);
    }
  }

  return (
    <section className="card">
      <h2>{data.spot.name}</h2>
      <p>주소: {data.spot.address ?? "주소 정보 없음"}</p>
      <p>공포 레벨: Lv{data.spot.fearLevel}</p>
      <p>카테고리: {data.spot.categories.join(", ") || "없음"}</p>
      <h3>최근 제보</h3>
      <ul>
        {data.reports.length ? (
          data.reports.map((report) => (
            <li key={report.id}>
              <strong>{report.title}</strong> - {report.content}{" "}
              <button
                type="button"
                className="inline-btn"
                onClick={() => onFlag(report.id)}
                disabled={flaggingId === report.id}
              >
                {flaggingId === report.id ? "신고 중..." : "신고"}
              </button>
            </li>
          ))
        ) : (
          <li>아직 제보가 없습니다.</li>
        )}
      </ul>
    </section>
  );
}
