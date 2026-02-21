"use client";

interface ScaleQuestionProps {
  questionId: string;
  questionText: string;
  examples?: string;
  note?: string;
  scaleLabels: { low: string; high: string };
  value: string;
  onChange: (val: string) => void;
  comment?: string;
  onCommentChange?: (val: string) => void;
}

export default function ScaleQuestion({
  questionId,
  questionText,
  examples,
  note,
  scaleLabels,
  value,
  onChange,
  comment,
  onCommentChange,
}: ScaleQuestionProps) {
  const points = ["1", "2", "3", "4", "5"];

  return (
    <fieldset
      style={{
        border: "none",
        padding: 0,
        margin: "0 0 2.5rem 0",
      }}
    >
      <legend
        style={{
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#44242b",
          lineHeight: 1.5,
          marginBottom: "0.25rem",
          padding: 0,
        }}
      >
        {questionText}
      </legend>
      {examples && (
        <p style={{ fontSize: "0.9rem", color: "#6b6766", margin: "0.25rem 0 0 0" }}>
          {examples}
        </p>
      )}
      {note && (
        <p style={{ fontSize: "0.85rem", color: "#8a8584", fontStyle: "italic", margin: "0.25rem 0 0 0" }}>
          {note}
        </p>
      )}

      {/* Scale labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.25rem",
          marginBottom: "0.5rem",
          fontSize: "0.8rem",
          color: "#6b6766",
        }}
      >
        <span>{scaleLabels.low}</span>
        <span>{scaleLabels.high}</span>
      </div>

      {/* Scale buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        {points.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`${p} van 5`}
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "8px",
              border: value === p ? "2px solid #44242b" : "1px solid #cbb8b2",
              backgroundColor: value === p ? "#44242b" : "#ffffff",
              color: value === p ? "#ffffff" : "#44242b",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* N.v.t. option */}
      <div style={{ marginTop: "0.75rem" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            fontSize: "0.9rem",
            color: "#6b6766",
          }}
        >
          <input
            type="radio"
            name={questionId}
            checked={value === "nvt"}
            onChange={() => onChange("nvt")}
            style={{ accentColor: "#44242b" }}
          />
          Niet van toepassing
        </label>
      </div>

      {/* Toelichting */}
      {onCommentChange && (
        <div style={{ marginTop: "0.75rem" }}>
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Toelichting (optioneel)"
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "0.9rem",
              color: "#4e4a48",
              backgroundColor: "#ffffff",
              border: "1px solid #cbb8b2",
              borderRadius: "8px",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>
      )}
    </fieldset>
  );
}
