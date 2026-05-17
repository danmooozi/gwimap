import Link from "next/link";
import { PolicyNotice } from "../../../components/common/policy-notice";
import { ReportForm } from "../../../components/report/report-form";
import { SpotDetail } from "../../../components/spot/spot-detail";

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container">
      <Link href="/">← 목록으로</Link>
      <PolicyNotice />
      <SpotDetail id={id} />
      <ReportForm spotId={id} />
    </main>
  );
}
