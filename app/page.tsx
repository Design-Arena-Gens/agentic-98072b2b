"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  generateHindiVideoPlan,
  GeneratorInput,
  HindiVideoPlan
} from "@/lib/generator";

const defaultValues: GeneratorInput = {
  topic: "AI टूल से क्रिएटिव वीडियो कैसे बनाएं",
  targetPersona: "भारतीय छोटे व्यवसाय के मालिक",
  tone: "informative",
  duration: "60",
  callToAction: "अभी हमारी मुफ्त AI वीडियो वर्कशॉप के लिए रजिस्टर करें",
  keywords: ["AI Video", "Hindi Content", "Facebook Growth"]
};

const toneLabels: Record<GeneratorInput["tone"], string> = {
  informative: "सूचनात्मक",
  inspirational: "प्रेरणादायक",
  entertaining: "मनोरंजक",
  sales: "प्रमोशनल"
};

export default function Page() {
  const [formState, setFormState] = useState<GeneratorInput>(defaultValues);
  const [keywordsDraft, setKeywordsDraft] = useState(
    defaultValues.keywords.join(", ")
  );
  const [plan, setPlan] = useState<HindiVideoPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const durationLabel = useMemo(() => {
    switch (formState.duration) {
      case "30":
        return "30 सेकंड (रील या शॉर्ट)";
      case "60":
        return "60 सेकंड (रील/फ़ीड)";
      default:
        return "120 सेकंड (लॉन्ग फ़ॉर्म)";
    }
  }, [formState.duration]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    const nextInput = {
      ...formState,
      keywords: keywordsDraft
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean)
    };
    const result = generateHindiVideoPlan(nextInput);
    setPlan(result);
    setIsGenerating(false);
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}
    >
      <section style={{ textAlign: "center" }}>
        <div
          className="card"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            padding: "3rem",
            gap: "1.5rem",
            alignItems: "center"
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              fontWeight: 700,
              color: "#3b82f6",
              textTransform: "uppercase"
            }}
          >
            AI Hindi Video Agent
          </span>
          <h1
            className="gradient-text"
            style={{
              fontSize: "2.8rem",
              margin: 0,
              lineHeight: 1.1,
              maxWidth: "28rem"
            }}
          >
            Facebook के लिए AI संचालित हिन्दी वीडियो स्क्रिप्ट तैयार करें
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "32rem",
              color: "#4b5563",
              fontSize: "1.05rem"
            }}
          >
            अपने टॉपिक, ऑडियंस और टोन चुनें। एजेंट आपके लिए पूरा हिन्दी
            वीडियो प्लान, ऑन-स्क्रीन टेक्स्ट, और Facebook अपलोड चेकलिस्ट तैयार
            करेगा।
          </p>
        </div>
      </section>

      <section className="card" style={{ padding: "2.5rem" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem"
          }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontWeight: 600 }}>वीडियो टॉपिक</span>
            <input
              required
              value={formState.topic}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, topic: event.target.value }))
              }
              placeholder="जैसे, AI से फेसबुक वीडियो एडिटिंग"
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb"
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontWeight: 600 }}>लक्षित दर्शक</span>
            <input
              value={formState.targetPersona}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  targetPersona: event.target.value
                }))
              }
              placeholder="जैसे, नए कंटेंट क्रिएटर्स"
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb"
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontWeight: 600 }}>टोन चुनें</span>
            <select
              value={formState.tone}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  tone: event.target.value as GeneratorInput["tone"]
                }))
              }
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb"
              }}
            >
              {Object.entries(toneLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontWeight: 600 }}>वीडियो लंबाई</span>
            <select
              value={formState.duration}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  duration: event.target.value as GeneratorInput["duration"]
                }))
              }
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb"
              }}
            >
              <option value="30">30 सेकंड</option>
              <option value="60">60 सेकंड</option>
              <option value="120">120 सेकंड</option>
            </select>
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              सुझाव: {durationLabel}
            </span>
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              gridColumn: "1 / -1"
            }}
          >
            <span style={{ fontWeight: 600 }}>कॉल-टू-एक्शन</span>
            <input
              value={formState.callToAction}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  callToAction: event.target.value
                }))
              }
              placeholder="जैसे, विवरण लिंक से डाउनलोड करें"
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb"
              }}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              gridColumn: "1 / -1"
            }}
          >
            <span style={{ fontWeight: 600 }}>महत्त्वपूर्ण कीवर्ड (कॉमा से अलग)</span>
            <textarea
              value={keywordsDraft}
              onChange={(event) => setKeywordsDraft(event.target.value)}
              rows={3}
              placeholder="जैसे, Facebook Ads, AI Automation, हिन्दी दर्शक"
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "16px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb",
                resize: "vertical"
              }}
            />
          </label>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <button
              type="submit"
              disabled={isGenerating}
              style={{
                background:
                  "linear-gradient(120deg, rgba(59,130,246,1), rgba(236,72,153,1))",
                color: "#fff",
                boxShadow: isGenerating
                  ? "none"
                  : "0 15px 30px rgba(59,130,246,0.35)"
              }}
            >
              {isGenerating ? "तैयार किया जा रहा है..." : "AI प्लान तैयार करें"}
            </button>
          </div>
        </form>
      </section>

      {plan && (
        <section
          className="card"
          style={{
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem"
          }}
        >
          <header style={{ textAlign: "center" }}>
            <h2
              style={{
                margin: "0 0 0.4rem",
                fontSize: "2.1rem"
              }}
            >
              {plan.title}
            </h2>
            <p style={{ margin: 0, color: "#4b5563" }}>{plan.hook}</p>
          </header>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              हिन्दी वीडियो स्क्रिप्ट
            </h3>
            <div
              style={{
                display: "grid",
                gap: "1rem"
              }}
            >
              {plan.hindiScript.map((sectionItem) => (
                <article
                  key={sectionItem.heading}
                  style={{
                    padding: "1.2rem 1.4rem",
                    borderRadius: "16px",
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 0.5rem",
                      color: "#1f2937"
                    }}
                  >
                    {sectionItem.heading}
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{sectionItem.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              शॉट एवं वॉइस-ओवर प्लान
            </h3>
            <div
              style={{
                display: "grid",
                gap: "1rem"
              }}
            >
              {plan.shotPlan.map((shot) => (
                <article
                  key={shot.shot}
                  style={{
                    padding: "1.2rem 1.4rem",
                    borderRadius: "16px",
                    backgroundColor: "#fff9f0",
                    border: "1px solid #fcd34d"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.35rem"
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{shot.shot}</h4>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#f59e0b"
                      }}
                    >
                      लगभग {shot.length} सेकंड
                    </span>
                  </div>
                  <p style={{ margin: "0 0 0.5rem" }}>{shot.detail}</p>
                  <p
                    style={{
                      margin: 0,
                      fontStyle: "italic",
                      color: "#92400e"
                    }}
                  >
                    VO: {shot.voiceOver}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              ऑन-स्क्रीन टेक्स्ट एवं कैप्शन
            </h3>
            <div
              style={{
                display: "grid",
                gap: "1rem"
              }}
            >
              <article
                style={{
                  padding: "1.2rem 1.4rem",
                  borderRadius: "16px",
                  backgroundColor: "#eef2ff",
                  border: "1px solid #c7d2fe"
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem" }}>ऑन-स्क्रीन टेक्स्ट</h4>
                <ul style={{ margin: 0, paddingLeft: "1.3rem", color: "#312e81" }}>
                  {plan.onScreenText.map((line, index) => (
                    <li key={index} style={{ marginBottom: "0.3rem" }}>
                      {line}
                    </li>
                  ))}
                </ul>
              </article>

              <article
                style={{
                  padding: "1.2rem 1.4rem",
                  borderRadius: "16px",
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #6ee7b7"
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem" }}>कैप्शन</h4>
                <p style={{ margin: "0 0 0.6rem", lineHeight: 1.6 }}>
                  {plan.captions}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem"
                  }}
                >
                  {plan.hashtags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#10b981",
                        color: "#fff",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "999px",
                        fontSize: "0.85rem",
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article
                style={{
                  padding: "1.2rem 1.4rem",
                  borderRadius: "16px",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa"
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem" }}>Call-to-action</h4>
                <p style={{ margin: "0 0 0.4rem" }}>{plan.callToActionHindi}</p>
                <p style={{ margin: 0, color: "#9a3412" }}>
                  {plan.callToActionEnglish}
                </p>
              </article>
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              प्रोडक्शन चेकलिस्ट
            </h3>
            <div
              style={{
                display: "grid",
                gap: "0.8rem"
              }}
            >
              {plan.productionSchedule.map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "1rem 1.2rem",
                    borderRadius: "14px",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <strong>{item.label}</strong>
                  <p style={{ margin: "0.3rem 0 0", color: "#374151" }}>
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              Facebook अपलोड स्टेप्स
            </h3>
            <ol
              style={{
                margin: 0,
                paddingLeft: "1.3rem",
                display: "grid",
                gap: "0.6rem",
                color: "#1f2937"
              }}
            >
              {plan.facebookUploadSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              अंग्रेज़ी सपोर्ट नोट्स
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.3rem",
                color: "#4b5563"
              }}
            >
              {plan.englishSupport.map((note, index) => (
                <li key={index} style={{ marginBottom: "0.4rem" }}>
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
}
