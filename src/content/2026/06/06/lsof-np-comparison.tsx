"use client";

import { useState } from "react";

const LSOF_COMMAND_STEPS = [
  {
    id: "plain",
    label: "lsof",
    command: "/usr/sbin/lsof",
    description: "프로세스가 열어둔 파일, 디렉토리, 소켓이 모두 섞여 나온다.",
    rows: [
      {
        kind: "디렉토리",
        output: "loginwind 432 geuni cwd DIR ... /",
      },
      {
        kind: "TCP 대기",
        output:
          "ControlCe 816 geuni 10u IPv4 ... TCP *:afs3-fileserver (LISTEN)",
      },
      {
        kind: "TCP 연결",
        output: "Telegram 986 geuni 30u IPv4 ... TCP ...:https (ESTABLISHED)",
      },
      {
        kind: "UDP",
        output: "rapportd 676 geuni 24u IPv6 ... UDP *:xserveraid",
      },
    ],
  },
  {
    id: "numeric",
    label: "+ -nP",
    command: "/usr/sbin/lsof -nP",
    description:
      "출력 범위는 거의 같지만 주소와 포트가 이름 대신 숫자로 보인다.",
    rows: [
      {
        kind: "디렉토리",
        output: "loginwind 432 geuni cwd DIR ... /",
      },
      {
        kind: "TCP 대기",
        output: "ControlCe 816 geuni 10u IPv4 ... TCP *:7000 (LISTEN)",
      },
      {
        kind: "TCP 연결",
        output: "Telegram 986 geuni 30u IPv4 ... TCP ...:443 (ESTABLISHED)",
      },
      {
        kind: "UDP",
        output: "rapportd 676 geuni 24u IPv6 ... UDP *:3722",
      },
    ],
  },
  {
    id: "tcp",
    label: "+ -iTCP",
    command: "/usr/sbin/lsof -nP -iTCP",
    description: "일반 파일과 디렉토리는 빠지고 TCP 네트워크 소켓만 남는다.",
    rows: [
      {
        kind: "TCP 대기",
        output: "ControlCe 816 geuni 10u IPv4 ... TCP *:7000 (LISTEN)",
      },
      {
        kind: "TCP 대기",
        output: "ControlCe 816 geuni 12u IPv4 ... TCP *:5000 (LISTEN)",
      },
      {
        kind: "TCP 연결",
        output: "Telegram 986 geuni 30u IPv4 ... TCP ...:443 (ESTABLISHED)",
      },
    ],
  },
  {
    id: "listen",
    label: "+ -sTCP:LISTEN",
    command: "/usr/sbin/lsof -nP -iTCP -sTCP:LISTEN",
    description: "TCP 중에서도 연결을 기다리는 서버 포트만 남는다.",
    rows: [
      {
        kind: "TCP 대기",
        output: "ControlCe 816 geuni 10u IPv4 ... TCP *:7000 (LISTEN)",
      },
      {
        kind: "TCP 대기",
        output: "ControlCe 816 geuni 12u IPv4 ... TCP *:5000 (LISTEN)",
      },
      {
        kind: "TCP 대기",
        output: "node 30916 geuni 17u IPv6 ... TCP *:3000 (LISTEN)",
      },
    ],
  },
] as const;

type CommandStepID = (typeof LSOF_COMMAND_STEPS)[number]["id"];

export const LsofNpComparison = () => {
  const [stepID, setStepID] = useState<CommandStepID>("plain");
  const selectedStep =
    LSOF_COMMAND_STEPS.find((step) => step.id === stepID) ??
    LSOF_COMMAND_STEPS[0];

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">옵션 적용 단계:</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
        {LSOF_COMMAND_STEPS.map((step) => (
          <label key={step.id} className="inline-flex items-center">
            <input
              type="radio"
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
              name="lsof-command-step"
              checked={stepID === step.id}
              onChange={() => setStepID(step.id)}
            />
            <span className="ml-2 text-sm text-gray-700">{step.label}</span>
          </label>
        ))}
      </div>

      <div className="border border-gray-200 rounded-md mb-6 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3">
          <code className="text-xs text-gray-700">{selectedStep.command}</code>
          <p className="text-xs text-gray-500 m-1">
            {selectedStep.description}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {selectedStep.rows.map((row) => (
            <div
              key={`${selectedStep.id}-${row.output}`}
              className="grid items-center gap-1 px-4 py-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-3"
            >
              <p className="text-xs text-gray-500">{row.kind}</p>
              <code className="block overflow-x-auto whitespace-nowrap text-xs text-gray-700">
                {row.output}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
