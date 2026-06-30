"use client";

import { useSyncExternalStore } from "react";
import { CircleStop, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const TIMER_DURATION = 60 * SECOND_IN_MS;

const formatTimer = (milliseconds: number) => {
  const safeMilliseconds = Math.max(0, milliseconds);
  const seconds = Math.floor((safeMilliseconds % MINUTE_IN_MS) / SECOND_IN_MS);
  const millis = safeMilliseconds % SECOND_IN_MS;
  const centis = Math.floor(millis / 10);

  return `${String(seconds).padStart(2, "0")}.${String(centis).padStart(
    2,
    "0",
  )}`;
};

interface TimerSnapshot {
  isRunning: boolean;
  remainingMilliseconds: number;
}

const createTimerStore = (duration: number) => {
  const initialSnapshot = {
    isRunning: false,
    remainingMilliseconds: duration,
  };

  let snapshot: TimerSnapshot = initialSnapshot;
  let startedAt = 0;
  let frame: number | null = null;
  const listeners = new Set<() => void>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const setSnapshot = (nextSnapshot: TimerSnapshot) => {
    snapshot = nextSnapshot;
    emit();
  };

  const clearFrame = () => {
    if (frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
  };

  const tick = () => {
    const elapsed = performance.now() - startedAt;
    const nextRemaining = Math.max(0, duration - Math.floor(elapsed));

    if (nextRemaining <= 0) {
      startedAt = performance.now();
      setSnapshot({
        isRunning: true,
        remainingMilliseconds: duration,
      });
    } else {
      setSnapshot({
        isRunning: true,
        remainingMilliseconds: nextRemaining,
      });
    }

    frame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    clearFrame();
    startedAt = performance.now();
    setSnapshot({
      isRunning: true,
      remainingMilliseconds: duration,
    });
    frame = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    clearFrame();
    setSnapshot(initialSnapshot);
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        clearFrame();
        snapshot = initialSnapshot;
      }
    };
  };

  return {
    subscribe,
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initialSnapshot,
    start,
    stop,
  };
};

const timerStore = createTimerStore(TIMER_DURATION);

const Timer = ({
  milliseconds,
  tabular = false,
}: {
  milliseconds: number;
  tabular?: boolean;
}) => {
  return (
    <span
      className={cn(
        "inline-block font-sans text-3xl font-semibold tracking-normal text-gray-800",
        tabular
          ? "tabular-nums [font-feature-settings:'tnum'_1]"
          : "proportional-nums [font-feature-settings:'pnum'_1]",
      )}
    >
      {formatTimer(milliseconds)}
    </span>
  );
};

interface TimerBoxProps {
  title: string;
  milliseconds: number;
  tabular?: boolean;
}

const TimerBox = ({ title, tabular, milliseconds }: TimerBoxProps) => {
  return (
    <article className="w-full max-w-[240px] p-3 border border-gray-200">
      <h3 className="text-xs font-normal text-gray-500 mb-2">{title}</h3>
      <div className="min-h-12 border border-gray-200 bg-white px-3 py-3 text-center">
        <Timer milliseconds={milliseconds} tabular={tabular} />
      </div>
    </article>
  );
};

export const Preview = () => {
  const { isRunning, remainingMilliseconds } = useSyncExternalStore(
    timerStore.subscribe,
    timerStore.getSnapshot,
    timerStore.getServerSnapshot,
  );

  const TimerControlIcon = isRunning ? CircleStop : Play;

  return (
    <section className="my-8" aria-label="tabular-nums timer comparison">
      <div className="border border-gray-200 rounded mb-6 overflow-hidden">
        <div className="p-4">
          <div className="grid place-items-center gap-3 sm:grid-cols-2">
            <TimerBox title="기본 숫자" milliseconds={remainingMilliseconds} />

            <TimerBox
              title="tabular-nums"
              milliseconds={remainingMilliseconds}
              tabular
            />
          </div>
        </div>

        <footer className="flex items-center justify-center gap-2 border-t border-gray-200 p-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-800 border border-gray-200 transition-colors duration-200 hover:bg-gray-200"
            aria-label={isRunning ? "Stop timer" : "Play timer"}
            onClick={() => {
              if (isRunning) {
                timerStore.stop();
                return;
              }

              timerStore.start();
            }}
          >
            <TimerControlIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
};
