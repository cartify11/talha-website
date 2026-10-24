import React, { useEffect, useRef, useState } from 'react';

interface Live3DDevLogoProps {
  className?: string;
  interactive?: boolean;
}

// Believable AI Software Development Code Stream
const CODE_LINES = [
  "// TALHA AI CORE — Autonomous Pipeline v4.9",
  "import { AgentSwarm, VectorDB } from '@talha/ai';",
  "import { LLMClient, StreamEngine } from '@talha/core';",
  "",
  "export class AIAgentArchitect {",
  "  private swarm = new AgentSwarm({ autonomous: true });",
  "  private memory = new VectorDB({ dim: 1536 });",
  "",
  "  async dispatchTask(query: string): Promise<TaskResult> {",
  "    const context = await this.memory.query(query, 5);",
  "    const plan = await this.swarm.synthesizePlan(context);",
  "    const stream = await StreamEngine.deploy(plan);",
  "    return stream.compileProductionSolution();",
  "  }",
  "}",
  "",
  "// Executing Autonomous Inference...",
  "const agent = new AIAgentArchitect();",
  "await agent.dispatchTask('Deploy Intelligent System');",
  "// >> Pipeline Status: OPTIMAL [200 OK]"
];

export const Live3DDevLogo: React.FC<Live3DDevLogoProps> = ({
  className = "w-full h-60 sm:h-72",
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Live Typewriter State
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter Engine
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      const currentLine = CODE_LINES[lineIdx];
      if (charIdx < currentLine.length) {
        timeout = setTimeout(() => {
          setCharIdx((prev) => prev + 1);
        }, 32); // ~30ms per character for natural typing cadence
      } else {
        // Line completed, short breath pause
        setIsTyping(false);
        timeout = setTimeout(() => {
          if (lineIdx < CODE_LINES.length - 1) {
            setLineIdx((prev) => prev + 1);
            setCharIdx(0);
          } else {
            // Loop code stream
            setLineIdx(0);
            setCharIdx(0);
          }
          setIsTyping(true);
        }, 400); // 400ms pause between lines
      }
    }

    return () => clearTimeout(timeout);
  }, [lineIdx, charIdx, isTyping]);

  // Cursor Blinking Engine
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(blinkInterval);
  }, []);

  // 3D Mouse Parallax & Light Sheen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 7;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glowX, glowY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  // Syntax Tokenizer for Code Lines
  const renderCodeTokens = (lineText: string, isCurrentLine: boolean) => {
    const textToShow = isCurrentLine ? lineText.slice(0, charIdx) : lineText;

    if (textToShow.startsWith('//')) {
      return <span className="text-zinc-500 italic">{textToShow}</span>;
    }

    const tokens = textToShow.split(/([ \t(){}[\];,:."'])/);
    return (
      <>
        {tokens.map((token, i) => {
          if (/^(import|from|export|class|private|async|const|await|return|new)$/.test(token)) {
            return (
              <span key={i} className="text-gold-400 font-semibold">
                {token}
              </span>
            );
          }
          if (/^(AgentSwarm|VectorDB|LLMClient|StreamEngine|AIAgentArchitect|TaskResult|Promise|string)$/.test(token)) {
            return (
              <span key={i} className="text-sky-400 font-medium">
                {token}
              </span>
            );
          }
          if (/^(dispatchTask|query|synthesizePlan|deploy|compileProductionSolution)$/.test(token)) {
            return (
              <span key={i} className="text-purple-400">
                {token}
              </span>
            );
          }
          if (/'[^']*'/.test(token) || token.startsWith("'")) {
            return (
              <span key={i} className="text-emerald-400">
                {token}
              </span>
            );
          }
          if (/^[0-9]+$/.test(token)) {
            return (
              <span key={i} className="text-amber-400">
                {token}
              </span>
            );
          }
          return (
            <span key={i} className="text-zinc-200">
              {token}
            </span>
          );
        })}
      </>
    );
  };

  // Calculate visible lines window (scrolling viewport)
  const maxVisibleLines = 11;
  const startLine = Math.max(0, lineIdx - maxVisibleLines + 1);
  const visibleLines = CODE_LINES.slice(startLine, lineIdx + 1);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className={`relative rounded-2xl overflow-hidden bg-black border border-gold-500/40 shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* 3D Parallax Canvas Container */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full select-none"
      >
        {/* Photorealistic 3D Developer & Workstation Render */}
        <img
          src="/assets/photoreal-ai-dev.jpg"
          alt="Photorealistic 3D AI Software Workstation"
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
        />

        {/* Dynamic Light Sheen Following Cursor */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(198, 164, 119, 0.28) 0%, transparent 55%)`,
            }}
          />
        )}

        {/* Ambient Screen Light Glow Flickering on Hands & Keyboard */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{
            background: 'radial-gradient(ellipse at 30% 45%, rgba(56, 189, 248, 0.18) 0%, rgba(198, 164, 119, 0.08) 35%, transparent 65%)',
            opacity: isTyping ? 0.95 : 0.65,
          }}
        />

        {/* Keycap Typing Shimmer Effect on Keyboard Area */}
        <div
          className={`absolute left-[38%] bottom-[20%] w-[18%] h-[12%] rounded-xl pointer-events-none transition-opacity duration-200 ${
            isTyping ? 'opacity-40 animate-pulse' : 'opacity-10'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(198, 164, 119, 0.35) 0%, transparent 70%)',
          }}
        />

        {/* ========================================================= */}
        {/* LIVE 3D CODE EDITOR ON THE MONITOR SCREEN                */}
        {/* Mapped with matching 3D perspective to the curved screen */}
        {/* ========================================================= */}
        <div
          className="absolute left-[16%] top-[9%] w-[33.5%] h-[53.5%] pointer-events-none overflow-hidden rounded-md"
          style={{
            transform: 'perspective(750px) rotateY(-18deg) rotateX(4deg) skewY(-2.5deg)',
            transformOrigin: 'left center',
          }}
        >
          {/* Editor Dark Glass Texture Layer */}
          <div className="absolute inset-0 bg-[#070a10]/85 backdrop-blur-[0.5px] border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(56,189,248,0.12)]" />

          {/* IDE Window Bar */}
          <div className="relative z-10 flex items-center justify-between px-2.5 py-1 bg-[#0b0f19]/90 border-b border-cyan-500/20">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span className="text-[9px] font-mono font-bold tracking-tight text-gold-300 ml-1 truncate">
                ⚡ AIAgentArchitect.ts
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[7.5px] font-mono text-cyan-400/90 tracking-wider uppercase">
                {isTyping ? 'Typing...' : 'Compiling'}
              </span>
            </div>
          </div>

          {/* Code Body Container */}
          <div className="relative z-10 p-2 font-mono text-[9px] leading-[1.38] overflow-hidden flex flex-col justify-start">
            {visibleLines.map((line, relativeIdx) => {
              const actualLineNum = startLine + relativeIdx;
              const isCurrent = actualLineNum === lineIdx;

              return (
                <div
                  key={actualLineNum}
                  className={`flex items-baseline gap-2 ${
                    isCurrent ? 'bg-gold-500/[0.08] rounded px-0.5' : ''
                  }`}
                >
                  {/* Line Number */}
                  <span
                    className={`select-none text-[8px] w-3.5 text-right shrink-0 ${
                      isCurrent ? 'text-gold-400 font-bold' : 'text-zinc-600'
                    }`}
                  >
                    {(actualLineNum + 1).toString().padStart(2, '0')}
                  </span>

                  {/* Line Content */}
                  <div className="truncate">
                    {renderCodeTokens(line, isCurrent)}
                    {isCurrent && cursorVisible && (
                      <span className="inline-block w-1.5 h-3 bg-gold-400 ml-0.5 align-middle shadow-[0_0_6px_#C6A477]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editor Bottom Status Line */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-2 py-0.5 bg-[#080c14]/95 border-t border-cyan-500/15 flex items-center justify-between text-[7.5px] font-mono text-zinc-400">
            <span className="text-gold-400/80">
              Ln {lineIdx + 1}, Col {charIdx + 1}
            </span>
            <span className="text-cyan-400/80">AI Core: ACTIVE</span>
          </div>
        </div>

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-black/30 pointer-events-none" />

      </div>
    </div>
  );
};
