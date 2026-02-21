"use client";

interface TextareaQuestionProps {
  questionId: string;
  questionText: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextareaQuestion({
  questionId,
  questionText,
  placeholder,
  value,
  onChange,
}: TextareaQuestionProps) {
  return (
    <div className="mb-10">
      <label htmlFor={questionId}>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#44242b",
            lineHeight: 1.4,
            display: "block",
            marginBottom: "4px",
          }}
        >
          {questionText}
        </span>
        <span
          style={{
            fontSize: "0.85rem",
            color: "#6b6766",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Optional
        </span>
      </label>
      <textarea
        id={questionId}
        name={questionId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "2px solid #cbb8b2",
          backgroundColor: "#ffffff",
          color: "#4e4a48",
          fontSize: "1rem",
          fontFamily: "inherit",
          lineHeight: 1.5,
          resize: "vertical",
          outline: "none",
        }}
        onFocus={(e) => {
          e.target.style.border = "2px solid #44242b";
        }}
        onBlur={(e) => {
          e.target.style.border = "2px solid #cbb8b2";
        }}
      />
    </div>
  );
}
