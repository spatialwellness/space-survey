"use client";

import { useState } from "react";

interface CheckboxQuestionProps {
  questionId: string;
  questionText: string;
  examples?: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxQuestion({
  questionId,
  questionText,
  examples,
  options,
  values,
  onChange,
}: CheckboxQuestionProps) {
  const [otherText, setOtherText] = useState("");

  const toggle = (option: string) => {
    if (option === "Anders") {
      if (values.some((v) => v.startsWith("Anders:"))) {
        onChange(values.filter((v) => !v.startsWith("Anders:")));
        setOtherText("");
      } else {
        onChange([...values, "Anders: "]);
      }
    } else if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  const handleOtherText = (text: string) => {
    setOtherText(text);
    const filtered = values.filter((v) => !v.startsWith("Anders:"));
    if (text.trim()) {
      onChange([...filtered, `Anders: ${text}`]);
    } else {
      onChange([...filtered, "Anders: "]);
    }
  };

  const isOtherSelected = values.some((v) => v.startsWith("Anders:"));

  return (
    <div className="mb-10">
      <fieldset>
        <legend className="mb-1">
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#44242b",
              lineHeight: 1.4,
              display: "block",
            }}
          >
            {questionText}
          </span>
          {examples && (
            <span
              style={{
                fontSize: "0.9rem",
                color: "#6b6766",
                display: "block",
                marginTop: "4px",
              }}
            >
              {examples}
            </span>
          )}
          <span
            style={{
              fontSize: "0.85rem",
              color: "#6b6766",
              display: "block",
              marginTop: "4px",
            }}
          >
            Je kunt meerdere opties selecteren.
          </span>
        </legend>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {options.map((option) => {
            const inputId = `${questionId}-${option.replace(/\s+/g, "-").toLowerCase()}`;
            const isSelected = option === "Anders" ? isOtherSelected : values.includes(option);
            return (
              <div key={option}>
                <label
                  htmlFor={inputId}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: isSelected && option === "Anders" ? "8px 8px 0 0" : "8px",
                    border: isSelected
                      ? "2px solid #44242b"
                      : "2px solid #cbb8b2",
                    borderBottom: isSelected && option === "Anders" ? "none" : undefined,
                    backgroundColor: isSelected ? "#f0e8e6" : "#ffffff",
                    cursor: "pointer",
                    lineHeight: 1.4,
                  }}
                >
                  <input
                    type="checkbox"
                    id={inputId}
                    name={questionId}
                    value={option}
                    checked={isSelected}
                    onChange={() => toggle(option)}
                    style={{
                      marginTop: "3px",
                      accentColor: "#44242b",
                      flexShrink: 0,
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <span style={{ color: "#4e4a48", fontSize: "1rem" }}>
                    {option === "Anders" ? "Anders, namelijk" : option}
                  </span>
                </label>
                {option === "Anders" && isOtherSelected && (
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => handleOtherText(e.target.value)}
                    placeholder="Typ hier..."
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      fontSize: "1rem",
                      color: "#4e4a48",
                      backgroundColor: "#f0e8e6",
                      border: "2px solid #44242b",
                      borderTop: "1px solid #cbb8b2",
                      borderRadius: "0 0 8px 8px",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
