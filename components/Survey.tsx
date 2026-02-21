"use client";

import { useState } from "react";
import { sections, totalSections } from "@/lib/survey-data";
import ProgressBar from "./ProgressBar";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import TextareaQuestion from "./TextareaQuestion";
import ScaleQuestion from "./ScaleQuestion";
import CodeQuestion from "./CodeQuestion";

type Answers = Record<string, string | string[]>;

type Screen = "intro" | "survey" | "thankyou";

export default function Survey() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    window.scrollTo({ top: 0 });
    if (isLastSection) {
      handleSubmit();
    } else {
      setCurrentSectionIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0 });
    if (currentSectionIndex === 0) {
      setScreen("intro");
    } else {
      setCurrentSectionIndex((i) => i - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Normalise checkbox arrays to comma-joined strings for the webhook
      const normalised: Record<string, string> = {};
      for (const [key, val] of Object.entries(answers)) {
        normalised[key] = Array.isArray(val) ? val.join(", ") : val;
      }

      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: normalised }),
      });
    } catch {
      // Submit failure shouldn't block showing the thank-you screen
    } finally {
      setIsSubmitting(false);
      setScreen("thankyou");
    }
  };

  /* ─────────────────── INTRO SCREEN ─────────────────── */
  if (screen === "intro") {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f6f2f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.25rem",
        }}
      >
        <div style={{ maxWidth: "600px", width: "100%" }}>
          {/* Logo / brand strip */}
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#44242b",
              marginBottom: "2.5rem",
              fontWeight: 600,
            }}
          >
            House of Return
          </p>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 700,
              color: "#44242b",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Hoe voelt jouw werkplek?
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#4e4a48",
              marginBottom: "1.75rem",
              lineHeight: 1.6,
            }}
          >
            Deze enquête gaat over hoe de fysieke ruimte van je werkplek jou beïnvloedt.
          </p>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbb8b2",
              borderRadius: "10px",
              padding: "1.25rem 1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <p style={{ fontSize: "1rem", color: "#4e4a48", lineHeight: 1.7, margin: 0 }}>
              Er zijn geen goede of foute antwoorden. Alle reacties zijn volledig anoniem - we verzamelen
              geen naam of e-mailadres. Je krijgt een willekeurige code zodat we je antwoorden later
              kunnen vergelijken met een eventuele vervolgmeting, zonder te weten wie je bent.
              Als een vraag niet op jou van toepassing is, kun je die overslaan. Neem alle tijd die je nodig hebt.
            </p>
          </div>

          <button
            onClick={() => setScreen("survey")}
            style={{
              backgroundColor: "#44242b",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "14px 28px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
            }}
          >
            Start enquête →
          </button>
        </div>
      </main>
    );
  }

  /* ─────────────────── THANK YOU SCREEN ─────────────────── */
  if (screen === "thankyou") {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f6f2f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.25rem",
        }}
      >
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#44242b",
              marginBottom: "2.5rem",
              fontWeight: 600,
            }}
          >
            House of Return
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#44242b",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            Dank je wel.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#4e4a48",
              lineHeight: 1.7,
            }}
          >
            Je antwoorden zijn anoniem verstuurd. Dit onderzoek wordt gebruikt om beter te begrijpen
            hoe werkomgevingen iedereen kunnen ondersteunen, ook mensen wiens brein anders werkt.
          </p>
        </div>
      </main>
    );
  }

  /* ─────────────────── SURVEY SCREEN ─────────────────── */
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f2f0",
        padding: "2rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "640px", width: "100%" }}>
        {/* Brand */}
        <p
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#44242b",
            marginBottom: "1.5rem",
            fontWeight: 600,
          }}
        >
          House of Return
        </p>

        {/* Progress bar */}
        <ProgressBar
          current={currentSectionIndex + 1}
          total={totalSections}
        />

        {/* Section header */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#44242b",
              marginBottom: "0.5rem",
            }}
          >
            {currentSection.title}
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#6b6766", lineHeight: 1.5 }}>
            {currentSection.preface}
          </p>
        </div>

        {/* Questions */}
        {currentSection.questions.map((q) => {
          if (q.type === "code" || q.type === "generated-code") {
            return (
              <CodeQuestion
                key={q.id}
                questionId={q.id}
                questionText={q.text}
                note={q.note}
                placeholder={q.placeholder}
                value={(answers[q.id] as string) || ""}
                onChange={(val) => setAnswer(q.id, val)}
                autoGenerate={q.type === "generated-code"}
              />
            );
          }
          if (q.type === "scale") {
            return (
              <ScaleQuestion
                key={q.id}
                questionId={q.id}
                questionText={q.text}
                examples={q.examples}
                note={q.note}
                scaleLabels={q.scaleLabels!}
                value={(answers[q.id] as string) || ""}
                onChange={(val) => setAnswer(q.id, val)}
                comment={(answers[`${q.id}_comment`] as string) || ""}
                onCommentChange={(val) => setAnswer(`${q.id}_comment`, val)}
              />
            );
          }
          if (q.type === "radio") {
            return (
              <RadioQuestion
                key={q.id}
                questionId={q.id}
                questionText={q.text}
                examples={q.examples}
                note={q.note}
                options={q.options!}
                value={(answers[q.id] as string) || ""}
                onChange={(val) => setAnswer(q.id, val)}
              />
            );
          }
          if (q.type === "checkbox") {
            return (
              <CheckboxQuestion
                key={q.id}
                questionId={q.id}
                questionText={q.text}
                examples={q.examples}
                options={q.options!}
                values={(answers[q.id] as string[]) || []}
                onChange={(vals) => setAnswer(q.id, vals)}
              />
            );
          }
          if (q.type === "textarea") {
            return (
              <TextareaQuestion
                key={q.id}
                questionId={q.id}
                questionText={q.text}
                placeholder={q.placeholder}
                value={(answers[q.id] as string) || ""}
                onChange={(val) => setAnswer(q.id, val)}
              />
            );
          }
          return null;
        })}

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            paddingBottom: "3rem",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              backgroundColor: "transparent",
              color: "#44242b",
              border: "2px solid #cbb8b2",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Terug
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              backgroundColor: "#44242b",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 28px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isLastSection
              ? isSubmitting
                ? "Versturen..."
                : "Verstuur →"
              : "Volgende →"}
          </button>
        </div>
      </div>
    </main>
  );
}
