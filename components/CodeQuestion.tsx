"use client";

import { useEffect, useRef } from "react";

interface CodeQuestionProps {
  questionId: string;
  questionText: string;
  note?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  autoGenerate?: boolean;
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default function CodeQuestion({
  questionId,
  questionText,
  note,
  placeholder,
  value,
  onChange,
  autoGenerate = false,
}: CodeQuestionProps) {
  const generated = useRef(false);

  useEffect(() => {
    if (autoGenerate && !value && !generated.current) {
      generated.current = true;
      onChange(generateCode());
    }
  }, [autoGenerate, value, onChange]);

  if (autoGenerate) {
    return (
      <div style={{ marginBottom: "2.5rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#44242b",
            lineHeight: 1.5,
            marginBottom: "0.25rem",
          }}
        >
          {questionText}
        </label>
        {note && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "#6b6766",
              margin: "0.25rem 0 1rem 0",
              lineHeight: 1.6,
            }}
          >
            {note}
          </p>
        )}
        <div
          style={{
            display: "inline-block",
            padding: "14px 24px",
            fontSize: "1.4rem",
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            color: "#44242b",
            backgroundColor: "#f6f2f0",
            border: "2px solid #cbb8b2",
            borderRadius: "8px",
            textAlign: "center",
            userSelect: "all",
          }}
        >
          {value || "..."}
        </div>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#6b6766",
            marginTop: "0.75rem",
            fontStyle: "italic",
          }}
        >
          Tip: maak een screenshot of schrijf deze code op.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <label
        htmlFor={questionId}
        style={{
          display: "block",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#44242b",
          lineHeight: 1.5,
          marginBottom: "0.25rem",
        }}
      >
        {questionText}
      </label>
      {note && (
        <p
          style={{
            fontSize: "0.9rem",
            color: "#6b6766",
            margin: "0.25rem 0 1rem 0",
            lineHeight: 1.6,
          }}
        >
          {note}
        </p>
      )}
      <input
        id={questionId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase().slice(0, 6))}
        placeholder={placeholder}
        maxLength={6}
        autoComplete="off"
        style={{
          width: "140px",
          padding: "12px 16px",
          fontSize: "1.2rem",
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "0.15em",
          color: "#44242b",
          backgroundColor: "#ffffff",
          border: "1px solid #cbb8b2",
          borderRadius: "8px",
          textAlign: "center",
        }}
      />
    </div>
  );
}
