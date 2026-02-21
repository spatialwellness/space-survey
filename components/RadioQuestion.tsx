"use client";

interface RadioQuestionProps {
  questionId: string;
  questionText: string;
  examples?: string;
  note?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioQuestion({
  questionId,
  questionText,
  examples,
  note,
  options,
  value,
  onChange,
}: RadioQuestionProps) {
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
          {note && (
            <span
              style={{
                fontSize: "0.9rem",
                color: "#6b6766",
                display: "block",
                marginTop: "4px",
                fontStyle: "italic",
              }}
            >
              {note}
            </span>
          )}
        </legend>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {options.map((option) => {
            const inputId = `${questionId}-${option.replace(/\s+/g, "-").toLowerCase()}`;
            const isSelected = value === option;
            return (
              <label
                key={option}
                htmlFor={inputId}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: isSelected
                    ? "2px solid #44242b"
                    : "2px solid #cbb8b2",
                  backgroundColor: isSelected ? "#f0e8e6" : "#ffffff",
                  cursor: "pointer",
                  lineHeight: 1.4,
                }}
              >
                <input
                  type="radio"
                  id={inputId}
                  name={questionId}
                  value={option}
                  checked={isSelected}
                  onChange={() => onChange(option)}
                  style={{
                    marginTop: "3px",
                    accentColor: "#44242b",
                    flexShrink: 0,
                    width: "18px",
                    height: "18px",
                  }}
                />
                <span style={{ color: "#4e4a48", fontSize: "1rem" }}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
