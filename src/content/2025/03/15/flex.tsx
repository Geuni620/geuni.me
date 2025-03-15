"use client";

import React, { useState } from "react";

export const InlineFlex = () => {
  const [inlineFlex, setInlineFlex] = useState<boolean>(false);

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">Display Type:</p>
      <div className="flex space-x-4 mb-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
            name="inline-display"
            checked={!inlineFlex}
            onChange={() => setInlineFlex(false)}
          />
          <span className="ml-2 text-sm text-gray-800">flex</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
            name="inline-display"
            checked={inlineFlex}
            onChange={() => setInlineFlex(true)}
          />
          <span className="ml-2 text-sm text-gray-800">inline-flex</span>
        </label>
      </div>

      <div className="border border-gray-200 rounded mb-6 p-4">
        <div
          className={`flex ${
            inlineFlex ? "inline-flex" : "flex"
          } border-2 border-solid border-blue-200`}
        >
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">Item 1</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">Item 2</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">Item 3</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InlineFlexExample = () => {
  const [displayType, setDisplayType] = useState<"flex" | "inline-flex">(
    "flex"
  );

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">Display Type:</p>
      <div className="flex space-x-4 mb-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
            name="example-display"
            checked={displayType === "flex"}
            onChange={() => setDisplayType("flex")}
          />
          <span className="ml-2 text-sm text-gray-800">flex</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
            name="example-display"
            checked={displayType === "inline-flex"}
            onChange={() => setDisplayType("inline-flex")}
          />
          <span className="ml-2 text-sm text-gray-800">inline-flex</span>
        </label>
      </div>

      <div className="border border-gray-200 rounded mb-6 p-4">
        <div
          className={`flex ${displayType} border-2 border-solid border-blue-200`}
        >
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">1</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">2</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">3</code>
          </div>
        </div>
        <div
          className={`flex ${displayType} border-2 border-solid border-blue-200`}
        >
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">4</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">5</code>
          </div>
          <div className="bg-blue-50 p-3 border border-gray-200">
            <code className="text-xs text-gray-700">6</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlexBasis = () => {
  const [basis, setBasis] = useState<"auto" | "0" | "50%" | "300px">("auto");
  const [isWidthChecked, setIsWidthChecked] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="p-4">
          <div className="flex border border-gray-200">
            <div
              className="bg-blue-50 p-3 border-r border-gray-200"
              style={{
                width: isWidthChecked ? "300px" : "auto",
                flexBasis: basis,
              }}
            >
              <code className="text-xs text-gray-700">flex-basis: {basis}</code>
              <br />
              <code className="text-xs text-gray-700">
                width: {isWidthChecked ? "300px" : "auto"}
              </code>
            </div>
            <div className="bg-gray-50 p-3">
              <code className="text-xs text-gray-700">기본 아이템</code>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <label className="inline-flex items-center text-[18px] leading-8 py-1 px-2">
          <input
            type="radio"
            name="basis"
            checked={basis === "auto"}
            onChange={() => setBasis("auto")}
          />
          <span className="ml-2 text-sm text-gray-800 align-middle">
            auto (default)
          </span>
        </label>

        <label className="inline-flex items-center text-[18px] leading-8 py-1 px-2">
          <input
            type="radio"
            name="basis"
            checked={basis === "50%"}
            onChange={() => setBasis("50%")}
          />
          <span className="ml-2 text-sm text-gray-800 align-middle">50%</span>
        </label>

        <label className="inline-flex items-center text-[18px] leading-8 py-1 px-2">
          <input
            type="radio"
            name="basis"
            checked={basis === "300px"}
            onChange={() => setBasis("300px")}
          />
          <span className="ml-2 text-sm text-gray-800 align-middle">300px</span>
        </label>

        <div>
          <label className="inline-flex items-center text-[18px] leading-8 py-1 px-2">
            <input
              type="checkbox"
              checked={isWidthChecked}
              onChange={() => setIsWidthChecked(!isWidthChecked)}
            />
            <span className="ml-2 text-sm text-gray-800">Width 300px 적용</span>
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export const FlexGrow = () => {
  const [growValues, setGrowValues] = useState<number[]>([0, 0, 0]);
  const [isWidthChecked, setIsWidthChecked] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isBasisChecked, setIsBasisChecked] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const handleGrowChange = (index: number, value: number) => {
    const newGrowValues = [...growValues];
    newGrowValues[index] = value;
    setGrowValues(newGrowValues);
  };

  const handleWidthChange = (index: number) => {
    const newWidthChecked = [...isWidthChecked];
    newWidthChecked[index] = !newWidthChecked[index];
    setIsWidthChecked(newWidthChecked);
  };

  const handleBasisChange = (index: number) => {
    const newBasisChecked = [...isBasisChecked];
    newBasisChecked[index] = !newBasisChecked[index];
    setIsBasisChecked(newBasisChecked);
  };

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">flex-grow:</p>
      <div className="flex flex-col space-y-4 mb-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="mr-2">아이템 {index + 1}:</span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`grow-${index}`}
                checked={growValues[index] === 0}
                onChange={() => handleGrowChange(index, 0)}
              />
              <span className="ml-2 text-sm text-gray-800">0</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`grow-${index}`}
                checked={growValues[index] === 1}
                onChange={() => handleGrowChange(index, 1)}
              />
              <span className="ml-2 text-sm text-gray-800">1</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`grow-${index}`}
                checked={growValues[index] === 2}
                onChange={() => handleGrowChange(index, 2)}
              />
              <span className="ml-2 text-sm text-gray-800">2</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                checked={isWidthChecked[index]}
                onChange={() => handleWidthChange(index)}
              />
              <span className="ml-2 text-sm text-gray-800">
                Width 20px 적용
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                checked={isBasisChecked[index]}
                onChange={() => handleBasisChange(index)}
              />
              <span className="ml-2 text-sm text-gray-800">
                flex-basis 40px 적용
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded mb-6 overflow-hidden">
        <div className="p-4">
          <div className="flex border border-gray-200">
            {growValues.map((grow, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 border-r border-gray-200"
                style={{
                  flexGrow: grow,
                  width: isWidthChecked[index] ? "20px" : "auto",
                  flexBasis: isBasisChecked[index] ? "40px" : "auto",
                }}
              >
                <code className="text-xs text-gray-700">flex-grow: {grow}</code>
                <br />
                <code className="text-xs text-gray-700">
                  width: {isWidthChecked[index] ? "20px" : "auto"}
                </code>
                <br />
                <code className="text-xs text-gray-700">
                  flex-basis: {isBasisChecked[index] ? "40px" : "auto"}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlexShrink = () => {
  const [shrinkValues, setShrinkValues] = useState<number[]>([1, 1, 1]);
  const [itemWidth, setItemWidth] = useState<number>(200); // 아이템 너비 상태 추가

  const handleShrinkChange = (index: number, value: number) => {
    const newShrinkValues = [...shrinkValues];
    newShrinkValues[index] = value;
    setShrinkValues(newShrinkValues);
  };

  // 아이템 너비 조절 함수
  const handleWidthChange = (width: number) => {
    setItemWidth(width);
  };

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">아이템 너비 조절:</p>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="range"
          min="100"
          max="300"
          value={itemWidth}
          onChange={(e) => handleWidthChange(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-sm text-gray-800">{itemWidth}px</span>
      </div>

      <p className="text-sm mb-3 text-gray-800">flex-shrink 값 설정:</p>
      <div className="flex flex-col space-y-4 mb-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="mr-2">아이템 {index + 1}:</span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`shrink-${index}`}
                checked={shrinkValues[index] === 0}
                onChange={() => handleShrinkChange(index, 0)}
              />
              <span className="ml-2 text-sm text-gray-800">0</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`shrink-${index}`}
                checked={shrinkValues[index] === 1}
                onChange={() => handleShrinkChange(index, 1)}
              />
              <span className="ml-2 text-sm text-gray-800">1</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name={`shrink-${index}`}
                checked={shrinkValues[index] === 2}
                onChange={() => handleShrinkChange(index, 2)}
              />
              <span className="ml-2 text-sm text-gray-800">2</span>
            </label>
          </div>
        ))}
      </div>

      {/* 예제 컨테이너 */}
      <div className="border border-gray-200 rounded mb-6">
        <div className="p-4">
          <small className="text-xs text-gray-800 px-1">
            container 전체 너비는 500px이다.
          </small>
          <div
            style={{ width: "500px" }}
            className="flex border border-gray-200"
          >
            {shrinkValues.map((shrink, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 border-r border-gray-200"
                style={{
                  flexShrink: shrink,
                  width: `${itemWidth}px`,
                  minWidth: "50px",
                }}
              >
                <code className="text-xs text-gray-700 whitespace-nowrap">
                  flex-shrink: {shrink}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlexCombined = () => {
  const [selectedFlex, setSelectedFlex] = useState<string>("1");
  const [containerWidth, setContainerWidth] = useState<number>(500);

  const flexOptions = [
    {
      value: "0",
      label: "flex: 0",
      description: "flex-grow: 0; flex-shrink: 1; flex-basis: 0%",
      explanation: `flex-basis가 0%이고 flex-grow가 0이므로, 추가 공간을 분배받지 않는다.`,
    },
    {
      value: "1",
      label: "flex: 1",
      description: "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
      explanation:
        "flex-basis가 0%이므로 크기를 무시하고, flex-grow 비율에 따라 남은 공간을 분배받는다.",
    },
    {
      value: "2",
      label: "flex: 2",
      description: "flex-grow: 2; flex-shrink: 1; flex-basis: 0%",
      explanation:
        "flex-basis가 0%이므로 크기를 무시하고, flex-grow 비율에 따라 남은 공간을 분배받는다.",
    },
    {
      value: "1 1 300px",
      label: "flex: 1 1 300px",
      description: "flex-grow: 1; flex-shrink: 1; flex-basis: 300px",
      explanation:
        "flex-basis가 300px로 시작하고, 공간이 남으면 flex-grow에 따라 늘어나고 부족하면 flex-shrink에 따라 줄어든다.",
    },
    {
      value: "1 300px",
      label: "flex: 1 300px",
      description: "flex-grow: 1; flex-shrink: 1; flex-basis: 300px",
      explanation:
        "flex-basis가 300px로 시작하고, 공간이 남으면 flex-grow에 따라 늘어나고 부족하면 flex-shrink에 따라 줄어든다.",
    },
    {
      value: "1 1",
      label: "flex: 1 1",
      description: "flex-grow: 1; flex-shrink: 1; flex-basis: auto",
      explanation:
        "flex-basis가 auto이므로 콘텐츠 크기로 시작하고, 남은 공간을 flex-grow 비율에 따라 분배받는다.",
    },
  ];

  const selectedOption = flexOptions.find((opt) => opt.value === selectedFlex);

  return (
    <div className="my-8">
      <p className="text-sm mb-3 text-gray-800">컨테이너 너비 조절:</p>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="range"
          min="300"
          max="800"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-sm text-gray-800">{containerWidth}px</span>
      </div>

      <p className="text-sm mb-3 text-gray-800">flex 값 선택:</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {flexOptions.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
              name="flex-option"
              checked={selectedFlex === option.value}
              onChange={() => setSelectedFlex(option.value)}
            />
            <span className="ml-2 text-sm text-gray-800">{option.label}</span>
          </label>
        ))}
      </div>

      <div className="border border-gray-200 rounded mb-6">
        <div className="p-4">
          <small>정확한 측정 값을 위해 라벨을 제거함</small>
          <p className="text-sm text-gray-700">
            <strong>{selectedOption?.label}</strong>
            <br />
            {selectedOption?.description}
          </p>

          <div
            style={{ width: `${containerWidth}px` }}
            className="flex border-2 border-solid border-blue-200 h-[50px]"
          >
            <div
              className="bg-blue-50 border-r border-gray-200 overflow-hidden"
              style={{
                flex: selectedFlex,
              }}
            />
            <div
              className="bg-gray-100 border-r border-gray-200"
              style={{ flex: "1" }}
            />
            <div className="bg-gray-100" style={{ flex: "1" }} />
          </div>

          <p className="text-sm text-gray-700">
            <strong>{selectedOption?.explanation}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
