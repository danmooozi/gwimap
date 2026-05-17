"use client";

import { FormEvent, useState } from "react";
import { submitReport, uploadReportImage } from "../../lib/client/api";
import type { FearLevel, ReportCategory } from "../../types/gwimap";

interface Props {
  spotId: string;
}

export function ReportForm({ spotId }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fearLevel, setFearLevel] = useState<FearLevel>(3);
  const [category, setCategory] = useState<ReportCategory>("sighting");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("제보 등록 중...");
    try {
      let imageUrl: string | undefined;
      if (file) {
        setStatus("이미지 업로드 중...");
        imageUrl = await uploadReportImage(file);
      }
      setStatus("제보 등록 중...");
      await submitReport({ spotId, title, content, fearLevel, category, imageUrl });
      setTitle("");
      setContent("");
      setFile(null);
      setStatus("제보가 등록되었습니다.");
    } catch (error) {
      setStatus(error instanceof Error ? `오류: ${error.message}` : "오류가 발생했습니다.");
    }
  }

  return (
    <form className="card form" onSubmit={onSubmit}>
      <h2>제보 등록</h2>
      <label>
        제목
        <input value={title} onChange={(e) => setTitle(e.target.value)} required minLength={2} maxLength={80} />
      </label>
      <label>
        내용
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={10}
          maxLength={2000}
        />
      </label>
      <label>
        공포 레벨
        <select value={fearLevel} onChange={(e) => setFearLevel(Number(e.target.value) as FearLevel)}>
          <option value={1}>Lv1</option>
          <option value={2}>Lv2</option>
          <option value={3}>Lv3</option>
          <option value={4}>Lv4</option>
          <option value={5}>Lv5</option>
        </select>
      </label>
      <label>
        카테고리
        <select value={category} onChange={(e) => setCategory(e.target.value as ReportCategory)}>
          <option value="sighting">목격</option>
          <option value="sound">소리</option>
          <option value="presence">기운</option>
          <option value="other">기타</option>
        </select>
      </label>
      <label>
        이미지(선택)
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <button type="submit">등록</button>
      {status ? <p>{status}</p> : null}
    </form>
  );
}
