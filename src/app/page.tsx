import { PolicyNotice } from "../components/common/policy-notice";
import { SpotList } from "../components/map/spot-list";

export default function HomePage() {
  return (
    <main className="container">
      <h1>gwimap MVP</h1>
      <p>심령 스팟 목록을 선택해 상세와 제보 기능을 확인하세요.</p>
      <PolicyNotice />
      <SpotList />
    </main>
  );
}
