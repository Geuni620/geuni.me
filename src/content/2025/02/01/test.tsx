export const TestComponents = () => {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-800">💡 Key Point</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>onKeydown → onSubmit → onKeyup 순서로 이벤트가 발생</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>바코드 스캐너 기종별로 이벤트 발생 횟수가 다를 수 있음</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>onKeyup 대신 onKeydown이나 onSubmit 사용 권장</span>
          </li>
        </ul>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <p className="text-sm text-gray-500">
          ℹ️ 실제 환경에서 테스트하는 것이 중요합니다
        </p>
      </div>
    </div>
  );
};
