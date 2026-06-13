"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import MermaidDiagram from "./components/MermaidDiagram";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [diagram, setDiagram] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDiagram = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/generate-diagram/", {
        prompt,
      });
      console.log(response.data);

      setDiagram(response.data.mermaid);
    } catch (error) {
      console.error("Error generating diagram:", error);
      alert("Failed to generate diagram");
    } finally {
      setLoading(false);
    }
  };

  const downloadSVG = () => {
    const svg = document.querySelector("svg");

    if (!svg) {
      alert("No diagram found");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);

    const blob = new Blob(
      [svgData],
      {
        type: "image/svg+xml;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "diagram.svg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-3">
          AI Diagram Generator
        </h1>

        <p className="text-slate-400 mb-8">
          Generate professional diagrams using Gemini AI
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your architecture..."
            className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none resize-none"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={generateDiagram}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-6 py-3 rounded-xl transition"
            >
              {loading ? "Generating..." : "Generate Diagram"}
            </button>

            {diagram && (
              <button
                onClick={downloadSVG}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl transition"
              >
                Download SVG
              </button>
            )}
          </div>
        </div>

        {diagram && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Generated Diagram
            </h2>

            <div className="bg-white rounded-xl p-6 overflow-auto">
              <MermaidDiagram chart={diagram} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}