"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { runOrchestration } from "@/actions/orchestrator";
import { Loader2, ArrowRight, Terminal, Mic, MicOff, Volume2, Play, Pause, Sparkles, X, LayoutDashboard } from "lucide-react";

const OrchestratorScene = dynamic(
    () => import("@/components/orchestrator/OrchestratorScene").then((mod) => mod.OrchestratorScene),
    { ssr: false }
);

export default function AIOrchestratorPage() {
    const [status, setStatus] = useState("IDLE");
    const [logs, setLogs] = useState<string[]>([]);
    const [aiData, setAiData] = useState<{
        research?: any,
        creative?: any,
        vision?: any,
        voice?: any
    }>({});
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Speech to Text Logic
    function toggleSpeech() {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        if (isListening) {
            setIsListening(false);
            recognition.stop();
        } else {
            setIsListening(true);
            recognition.start();
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
        }
    }

    const locale = useLocale();

    async function handleSubmit(formData: FormData) {
        if (!input) return;
        setStatus("RESEARCH");
        setLogs(["Neural bridge established.", "Connecting to Gemini Intelligence..."]);
        setAiData({});
        setIsPlaying(false);

        const response = await runOrchestration(formData, locale);

        for (const step of response.steps) {
            if (step.type === 'log') {
                setLogs(prev => [...prev, `> ${step.message}`]);
            }
            if (step.type === 'phase') {
                if (step.status === 'active') setStatus(step.name);
            }
            if (step.type === 'data' && step.content && step.source) {
                try {
                    const content = JSON.parse(step.content);
                    if (step.source.includes("Gemini")) {
                        setAiData(prev => ({ ...prev, research: content }));
                    } else if (step.source.includes("OpenAI")) {
                        setAiData(prev => ({ ...prev, creative: content }));
                    } else if (step.source.includes("Vision")) {
                        setAiData(prev => ({ ...prev, vision: content }));
                    } else if (step.source.includes("Voice")) {
                        setAiData(prev => ({ ...prev, voice: content }));
                    }
                } catch (e) {
                    console.error("Data parse error", e);
                }
            }
            await new Promise(r => setTimeout(r, step.duration || 500));
        }

        setStatus("COMPLETE");
    }

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
            <OrchestratorScene status={status} />

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full z-20 p-8 flex justify-between items-start pointer-events-none">
                <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
                                The Orchestrator
                            </h1>
                            <p className="text-[10px] text-blue-500/60 font-mono tracking-[0.3em] uppercase">Multi-Modal Intelligence v2.1</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel px-4 py-2 rounded-lg text-[10px] font-mono text-blue-600 border border-blue-500/10 bg-white/80 flex items-center gap-3 shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${status !== "IDLE" ? "bg-blue-500 animate-pulse" : "bg-slate-300"}`} />
                    CORE_STATUS: {status}
                </div>
            </div>

            {/* MAIN INTERACTION (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col items-center pointer-events-none">
                {status === "IDLE" && (
                    <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <form action={handleSubmit} className="pointer-events-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative glass-panel p-2 rounded-xl border border-slate-200 flex items-center gap-2 shadow-xl bg-white/90">
                                <button
                                    type="button"
                                    onClick={toggleSpeech}
                                    className={`p-3 rounded-lg transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "hover:bg-slate-50 text-slate-400"}`}
                                >
                                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                                </button>
                                <input
                                    name="product"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isListening ? "Listening..." : "Name your product..."}
                                    className="flex-1 bg-transparent px-2 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none text-lg font-medium"
                                    autoComplete="off"
                                />
                                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-lg transition-transform active:scale-95 flex items-center justify-center shadow-lg shadow-slate-200">
                                    {status === "IDLE" ? <ArrowRight size={24} /> : <Loader2 className="animate-spin" size={24} />}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Log Terminal (Side) */}
                <div className="absolute bottom-8 right-8 w-80 pointer-events-auto hidden lg:block">
                    <div className="glass-panel rounded-xl border border-slate-200 bg-white/90 p-4 font-mono text-[10px] h-64 overflow-hidden flex flex-col shadow-xl">
                        <div className="flex items-center justify-between text-slate-400 mb-3 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2 italic">
                                <Terminal size={12} />
                                <span>NEURAL_LOGGER</span>
                            </div>
                            <span className="text-[8px]">TX-ORD-01</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-1.5 text-blue-600/90 custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-slate-400">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FULLSCREEN CAMPAIGN VAULT REVEAL */}
            {status === "COMPLETE" && (
                <div className="absolute inset-0 z-50 bg-slate-50/98 backdrop-blur-3xl animate-in fade-in duration-1000 flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
                    <button
                        onClick={() => { setStatus("IDLE"); setInput(""); setLogs([]); }}
                        className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600 hover:text-slate-900 z-50 pointer-events-auto shadow-sm"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
                        {/* LEFT: Cinematic Vision */}
                        <div className="lg:col-span-7 space-y-6 relative group">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={aiData.vision?.image_url}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt="Campaign Visual"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                                <div className="absolute bottom-8 left-8">
                                    <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2 italic">Synthesized Asset</div>
                                    <h3 className="text-4xl font-black text-white leading-tight uppercase italic">{aiData.creative?.slogan}</h3>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Campaign Intel */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="space-y-2">
                                <div className="text-blue-600 font-mono text-sm tracking-widest uppercase">Campaign Brief</div>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">{aiData.creative?.headline}</h2>
                            </div>

                            {/* Audio Stage */}
                            <div className="glass-panel p-6 rounded-3xl border border-blue-100 bg-blue-50/50 relative overflow-hidden group shadow-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative flex items-center gap-6">
                                    <button
                                        onClick={() => {
                                            if (audioRef.current) {
                                                if (isPlaying) audioRef.current.pause();
                                                else audioRef.current.play();
                                                setIsPlaying(!isPlaying);
                                            }
                                        }}
                                        className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 active:scale-95 transition-transform"
                                    >
                                        {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" className="ml-1" size={24} />}
                                    </button>
                                    <div className="flex-1 text-slate-900">
                                        <div className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1 italic">Vocal Narration</div>
                                        <p className="font-medium text-sm leading-snug">{aiData.creative?.pitch}</p>
                                    </div>
                                    <audio
                                        ref={audioRef}
                                        src={aiData.voice?.audio}
                                        onEnded={() => setIsPlaying(false)}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Data Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">Target Audience</div>
                                    <p className="text-slate-900 font-medium">{aiData.research?.targetAudience}</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">Value Proposition</div>
                                    <p className="text-slate-900 font-medium">{aiData.research?.keyBenefit}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => { setStatus("IDLE"); setInput(""); setLogs([]); }}
                                className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-400 transition-colors shadow-xl shadow-blue-500/20"
                            >
                                <LayoutDashboard size={20} />
                                New Simulation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
