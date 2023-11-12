export default function Home() {
  return (
    <div>
      <div className="my-7">
        <p>기록하는 공간이 필요했습니다.</p>
        <p>머리가 좋지 못해, 머리에 다 담기엔 생각이 너무 많습니다.</p>
        <p>공간을 만들어 짧게라도 기록하려 합니다.</p>
      </div>

      <div className="my-14 flex gap-7">
        <p>공간</p>

        <ul>
          <li className="flex items-center justify-center">
            <p className="font-bold">수첩</p>
            <span className="ml-3 text-sm">행동합니다.</span>
          </li>
          <li className="flex items-center justify-center">
            <p className="font-bold">서재</p>
            <span className="ml-3 text-sm">움직입니다.</span>
          </li>
          <li className="flex items-center justify-center">
            <p className="font-bold">생각</p>
            <span className="ml-3 text-sm">표현합니다.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
