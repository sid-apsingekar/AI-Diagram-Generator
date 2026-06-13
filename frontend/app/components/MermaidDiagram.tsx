"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface Props {
  chart: string;
}

export default function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });

    const renderDiagram = async () => {
      if (!ref.current) return;

      try {
        const id = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(
          id,
          chart
        );

        ref.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid Error:", error);

        if (ref.current) {
          ref.current.innerHTML = `
            <div style="color:red;padding:20px">
              Failed to render Mermaid diagram.
              Check browser console.
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return <div ref={ref} />;
}