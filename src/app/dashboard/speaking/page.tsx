"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  Award,
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Volume2,
} from "lucide-react";
import { TCFSpeakingTopic } from "@/data/speaking-topics";
import { TCFEvaluationResult } from "@/lib/ai/types";
import { saveTestResult } from "@/lib/storage";

export default function SpeakingStudioPage() {
  const [topics, setTopics] = useState<TCFSpeakingTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<TCFEvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Fetch speaking topics from PostgreSQL
  useEffect(() => {
    async function fetchSpeakingTopics() {
      setLoadingTopics(true);
      try {
        const res = await fetch("/api/topics/speaking");
        const json = await res.json();
        if (json.success && json.data) {
          setTopics(json.data);
        }
      } catch (err) {
        console.error("Failed to load speaking topics from PostgreSQL:", err);
      } finally {
        setLoadingTopics(false);
      }
    }
    fetchSpeakingTopics();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentTopic: TCFSpeakingTopic | undefined = topics[selectedTaskIndex];

  const startRecording = async () => {
    try {
      setError(null);
      setAudioBlob(null);
      setAudioUrl(null);
      setTranscript("");
      setEvaluation(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch {
      setError("Accès au microphone refusé ou indisponible. Veuillez autoriser le microphone dans votre navigateur.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioElementRef.current || !audioUrl) return;
    if (isPlayingRecording) {
      audioElementRef.current.pause();
      setIsPlayingRecording(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingRecording(true);
    }
  };

  const handleTranscribeAndEvaluate = async () => {
    if (!audioBlob || !currentTopic) {
      setError("Veuillez d'abord enregistrer votre voix.");
      return;
    }

    setIsTranscribing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      const transRes = await fetch("/api/speaking/transcribe", {
        method: "POST",
        body: formData,
      });

      const transJson = await transRes.json();
      if (!transRes.ok || !transJson.success) {
        throw new Error(transJson.error || "Erreur de transcription audio.");
      }

      const spokenText = transJson.data.text || "";
      setTranscript(spokenText);
      setIsTranscribing(false);

      setIsEvaluating(true);
      const evalRes = await fetch("/api/speaking/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskNumber: currentTopic.taskNumber,
          taskPrompt: currentTopic.prompt,
          transcript: spokenText,
        }),
      });

      const evalJson = await evalRes.json();
      if (!evalRes.ok || !evalJson.success) {
        throw new Error(evalJson.error || "Erreur lors de l'évaluation du discours.");
      }

      setEvaluation(evalJson.data);
      saveTestResult("speaking", {
        testId: currentTopic.id,
        testNumber: currentTopic.taskNumber,
        score: evalJson.data.overallScore,
        nclcLevel: evalJson.data.nclcLevel,
        cefrLevel: evalJson.data.cefrLevel,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inattendue");
    } finally {
      setIsTranscribing(false);
      setIsEvaluating(false);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-sm font-semibold uppercase tracking-wider mb-2">
          <Mic className="w-4 h-4" /> Studio d'Expression Orale (EO) TCF Canada
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              Pratique Orale avec Transcription & Évaluation Gratuite
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base max-w-2xl">
              Données de sujets issues de PostgreSQL. Enregistrez votre réponse au microphone et recevez une transcription instantanée et une notation NCLC détaillée sans restriction.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
              <Sparkles className="w-3.5 h-3.5" /> 100% Gratuit · Retries Illimités
            </span>
          </div>
        </div>
      </div>

      {loadingTopics ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-600" />
          <p className="text-sm font-mono text-zinc-500">Chargement des sujets oraux depuis PostgreSQL...</p>
        </div>
      ) : topics.length > 0 && currentTopic ? (
        <>
          {/* Task Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto">
            {topics.map((topic, idx) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTaskIndex(idx);
                  setAudioBlob(null);
                  setAudioUrl(null);
                  setTranscript("");
                  setEvaluation(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedTaskIndex === idx
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                Tâche {topic.taskNumber} : {topic.title.split(":")[0]}
              </button>
            ))}
          </div>

          {/* Main Studio Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900">
                    TÂCHE {currentTopic.taskNumber}
                  </span>
                  <span className="text-zinc-500">
                    Temps conseillé : {formatSeconds(currentTopic.speakingTimeSeconds)}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {currentTopic.title}
                </h3>

                <p className="text-sm font-serif text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                  {currentTopic.prompt}
                </p>

                {currentTopic.suggestedQuestionsOrPoints && currentTopic.suggestedQuestionsOrPoints.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Pistes d'argumentation / Questions suggérées :
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-serif">
                      {currentTopic.suggestedQuestionsOrPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Interactive Microphone Recorder Card */}
              <div className="p-8 rounded-2xl bg-zinc-900 text-white border border-zinc-800 shadow-xl flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-rose-600 animate-ping opacity-30" />
                  )}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl active:scale-95 ${
                      isRecording
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                    aria-label={isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}
                  >
                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <div>
                  <div className="font-mono text-3xl font-bold tracking-wider">
                    {formatSeconds(recordingSeconds)}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {isRecording
                      ? "Enregistrement de votre voix en cours... Cliquez pour terminer"
                      : audioBlob
                      ? "Enregistrement terminé. Écoutez ci-dessous ou relancez l'évaluation"
                      : "Cliquez sur le micro pour démarrer votre production orale"}
                  </p>
                </div>

                {audioUrl && (
                  <div className="w-full max-w-md bg-zinc-800/80 p-4 rounded-xl border border-zinc-700 flex items-center justify-between gap-4">
                    <audio
                      ref={audioElementRef}
                      src={audioUrl}
                      onEnded={() => setIsPlayingRecording(false)}
                    />
                    <button
                      onClick={togglePlayback}
                      className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white"
                    >
                      {isPlayingRecording ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    <div className="text-left flex-1 text-xs text-zinc-300">
                      <div className="font-bold">Votre Enregistrement</div>
                      <div className="text-zinc-500 font-mono">Prêt pour transcription</div>
                    </div>

                    <button
                      onClick={startRecording}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white"
                      title="Réenregistrer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {audioBlob && !evaluation && (
                  <button
                    onClick={handleTranscribeAndEvaluate}
                    disabled={isTranscribing || isEvaluating}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isTranscribing || isEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isTranscribing ? "Transcription Whisper..." : "Évaluation IA TCF..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Transcrire & Évaluer Gratuitement
                      </>
                    )}
                  </button>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-950/80 text-red-200 border border-red-800 text-xs w-full max-w-md">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Transcription & AI Evaluation Results */}
            <div className="lg:col-span-5 space-y-6">
              {transcript && (
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2 animate-in fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Transcription Intégrale de vos propos
                  </h4>
                  <p className="text-sm font-serif text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 leading-relaxed whitespace-pre-line">
                    {transcript}
                  </p>
                </div>
              )}

              {evaluation && (
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-500/40 shadow-xl space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest">
                          Niveau Oral Estimé
                        </div>
                        <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                          Score : {evaluation.overallScore} / 699 · NCLC {evaluation.nclcLevel} ({evaluation.cefrLevel})
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                    {evaluation.summary}
                  </p>

                  <div className="space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Détail par compétence orale
                    </h5>
                    {Object.entries(evaluation.criteria).map(([k, val]) => (
                      <div
                        key={k}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold mb-0.5">
                          <span className="capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-mono text-rose-600">{val.score} / 20</span>
                        </div>
                        <div className="text-zinc-500 text-[11px]">{val.comment}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowModelAnswer(!showModelAnswer)}
                      className="w-full py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      {showModelAnswer ? "Masquer Modèle Oral C1" : "Afficher Formulation Modèle C1"}
                    </button>

                    {showModelAnswer && (
                      <div className="mt-3 p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif whitespace-pre-line animate-in fade-in">
                        {currentTopic.modelAudioTranscript}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
