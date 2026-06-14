"use client";

import { useState } from "react";

const PORT_OWNER_STEPS = [
  {
    id: "ports",
    label: "1. Port",
    title: "LISTEN 중인 TCP Port 목록을 얻는다.",
    description:
      "먼저 OS 전체에서 연결을 기다리고 있는 TCP 포트 목록을 가져온다.",
    command: "/usr/sbin/lsof -nP -iTCP -sTCP:LISTEN",
    rows: [
      {
        label: "TCP 대기",
        value: "node 30916 geuni 17u IPv6 ... TCP *:3000 (LISTEN)",
      },
      {
        label: "meaning",
        value: "3000번 포트를 열고 기다리는 node 프로세스가 있다.",
      },
    ],
  },
  {
    id: "pid",
    label: "2. PID",
    title: "각 줄에서 PID와 Port를 뽑는다.",
    description:
      "포트 목록에서 중요한 값은 포트 번호와 그 포트를 소유한 프로세스 ID다.",
    command: "node 30916 ... TCP *:3000 (LISTEN)",
    rows: [
      {
        label: "pid",
        value: "30916",
      },
      {
        label: "port",
        value: "3000",
      },
      {
        label: "command",
        value: "node",
      },
    ],
  },
  {
    id: "cwd",
    label: "3. cwd",
    title: "PID가 어디서 실행 중인지 확인한다.",
    description:
      "포트 번호만으로는 어떤 worktree의 서버인지 알 수 없어서, 해당 PID의 실행 디렉토리를 확인한다.",
    command: "/usr/sbin/lsof -a -p 30916 -d cwd -Fn",
    rows: [
      {
        label: "output",
        value: "p30916",
      },
      {
        label: "output",
        value: "fcwd",
      },
      {
        label: "output",
        value: "n/Users/geuni/.codex/worktrees/320d/<project>",
      },
    ],
  },
  {
    id: "match",
    label: "4. Match",
    title: "cwd가 Codex/Conductor worktree 하위인지 확인한다.",
    description:
      "프로세스의 실행 위치가 미리 수집해둔 worktree 경로와 같거나 그 하위라면 매칭 후보가 된다.",
    command: "process.cwd starts with worktree.path",
    rows: [
      {
        label: "worktree",
        value: "/Users/geuni/.codex/worktrees/320d/<project>",
      },
      {
        label: "process cwd",
        value: "/Users/geuni/.codex/worktrees/320d/<project>",
      },
      {
        label: "result",
        value: "Codex worktree에서 실행된 프로세스로 볼 수 있다.",
      },
    ],
  },
  {
    id: "row",
    label: "5. Row",
    title: "매칭되면 Port Bar의 runtime row에 연결한다.",
    description:
      "Port Bar는 포트를 새 목록에만 추가하지 않고, worktree와 target으로 만들어둔 row에 PID와 Port를 붙인다.",
    command: "RuntimeTargetRow.makeRows(...)",
    rows: [
      {
        label: "worktree",
        value: "320d/<project>",
      },
      {
        label: "target",
        value: "User / Admin / Storybook",
      },
      {
        label: "state",
        value: "stopped -> running 또는 external",
      },
    ],
  },
] as const;

type PortOwnerStepID = (typeof PORT_OWNER_STEPS)[number]["id"];

export const PortOwnerMatchingFlow = () => {
  const [stepID, setStepID] = useState<PortOwnerStepID>("ports");
  const selectedStep =
    PORT_OWNER_STEPS.find((step) => step.id === stepID) ??
    PORT_OWNER_STEPS[0];

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">매칭 순서:</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
        {PORT_OWNER_STEPS.map((step) => (
          <label key={step.id} className="inline-flex items-center">
            <input
              type="radio"
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
              name="port-owner-step"
              checked={stepID === step.id}
              onChange={() => setStepID(step.id)}
            />
            <span className="ml-2 text-sm text-gray-700">{step.label}</span>
          </label>
        ))}
      </div>

      <div className="border border-gray-200 rounded-md mb-6 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-800 m-0">{selectedStep.title}</p>
          <p className="text-xs text-gray-500 m-1">
            {selectedStep.description}
          </p>
          <code className="block overflow-x-auto whitespace-nowrap text-xs text-gray-700 mt-3">
            {selectedStep.command}
          </code>
        </div>

        <div className="divide-y divide-gray-200">
          {selectedStep.rows.map((row, index) => (
            <div
              key={`${selectedStep.id}-${row.label}-${index}`}
              className="grid items-center gap-1 px-4 py-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-3"
            >
              <p className="text-xs text-gray-500">{row.label}</p>
              <code className="block overflow-x-auto whitespace-nowrap text-xs text-gray-700">
                {row.value}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
