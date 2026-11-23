"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
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
  Search,
  Filter,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  FileText,
  HelpCircle,
  Timer,
  Check,
  Flame,
  Layers,
} from "lucide-react";
import { TCFSpeakingTopic } from "@/data/speaking-topics";
import { TCFEvaluationResult } from "@/lib/ai/types";
import { saveTestResult } from "@/lib/storage";
import { TcfRulesModal } from "@/components/TcfRulesModal";

export default function SpeakingStudioPage() {
  const [topics, setTopics] = useState<TCFSpeakingTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // Catalogue Filters
  const [activeTaskTab, setActiveTaskTab] = useState<"all" | 1 | 2 | 3>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Selected Situation & Practice Mode
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState<"exam" | "review">("exam");
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  // Prep Timer state (for 2-min Task 2 prep)
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState(120);
  const [isPrepRunning, setIsPrepRunning] = useState(false);
  const [candidateNotes, setCandidateNotes] = useState("");
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);

  // AI Evaluation state
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<TCFEvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, []);

  // Handle Prep countdown
  useEffect(() => {
    if (isPrepRunning && prepSecondsRemaining > 0) {
      prepTimerRef.current = setInterval(() => {
        setPrepSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(prepTimerRef.current!);
            setIsPrepRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    }
    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, [isPrepRunning, prepSecondsRemaining]);

  const currentTopic: TCFSpeakingTopic | undefined = topics.find(
    (t) => t.id === selectedTopicId
  );

  // Available categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    topics.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [topics]);

  // Filtered situations
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (activeTaskTab !== "all" && t.taskNumber !== activeTaskTab) {
        return false;
      }
      if (
        selectedCategory !== "all" &&
        t.category?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesPrompt = t.prompt.toLowerCase().includes(q);
        const matchesCategory = t.category?.toLowerCase().includes(q);
        const matchesQuestions = t.suggestedQuestionsOrPoints?.some((pt) =>
          pt.toLowerCase().includes(q)
        );
        return matchesTitle || matchesPrompt || matchesCategory || matchesQuestions;
      }
      return true;
    });
  }, [topics, activeTaskTab, selectedCategory, searchQuery]);

  const selectSituation = (topic: TCFSpeakingTopic) => {
    setSelectedTopicId(topic.id);
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscript("");
    setEvaluation(null);
    setError(null);
    setShowModelAnswer(false);
    setCandidateNotes("");
    setPrepSecondsRemaining(topic.prepTimeSeconds || 120);
    setIsPrepRunning(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      recordTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          // If in exam mode and reached speaking time limit, auto-stop
          if (
            practiceMode === "exam" &&
            currentTopic?.speakingTimeSeconds &&
            prev + 1 >= currentTopic.speakingTimeSeconds
          ) {
            stopRecording();
            return currentTopic.speakingTimeSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setError(
        "Accès au microphone refusé ou indisponible. Veuillez autoriser le microphone dans votre navigateur."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Mic className="w-4 h-4" /> Studio d'Expression Orale (EO) · TCF Canada
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-zinc-50">
              Banque de Situations & Simulateur Vocal Officiel
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1.5 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Sélectionnez une situation réelle parmi nos 30 scénarios officiels TCF Canada (14 situations d'interaction Tâche 2 et 15 monologues d'opinion Tâche 3). Entraînez-vous en conditions d'examen ou révision libre avec transcription Whisper et notation NCLC gratuite.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" /> 30 Situations Réelles · 100% Gratuit
            </span>
          </div>
        </div>
      </div>

      {loadingTopics ? (
        <div className="py-24 text-center space-y-4">
          <Loader2 className="w-9 h-9 animate-spin mx-auto text-rose-600" />
          <p className="text-sm font-mono text-zinc-500">
            Chargement des situations orales officielles depuis PostgreSQL...
          </p>
        </div>
      ) : currentTopic ? (
        /* ==================================================================== */
        /* PRACTICE SIMULATOR VIEW (For Selected Situation)                     */
        /* ==================================================================== */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Bar: Back Button, Title & Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedTopicId(null)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 transition active:scale-95 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Toutes les situations</span>
              </button>

              <div className="hidden sm:block h-6 w-px bg-zinc-300 dark:bg-zinc-700" />

              <div className="text-xs">
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 uppercase mr-2">
                  Tâche {currentTopic.taskNumber}
                </span>
                <span className="font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  {currentTopic.title}
                </span>
              </div>
            </div>

            {/* Mode Switcher & Rules Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setRulesModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition"
              >
                📋 Règles (12-15m)
              </button>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 text-xs font-bold">
                <button
                  onClick={() => setPracticeMode("exam")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    practiceMode === "exam"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  ⏱️ Mode Examen
                </button>
                <button
                  onClick={() => setPracticeMode("review")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    practiceMode === "review"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  📖 Mode Révision / Pratique
                </button>
              </div>
            </div>
          </div>

          {/* Main Simulator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Situation Context & Recording Console */}
            <div className="lg:col-span-7 space-y-6">
              {/* Situation Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900">
                      TÂCHE {currentTopic.taskNumber} ·{" "}
                      {currentTopic.taskNumber === 1
                        ? "ENTRETIEN DIRIGÉ"
                        : currentTopic.taskNumber === 2
                        ? "INTERACTION (QUESTIONNEMENT)"
                        : "MONOLOGUE D'OPINION"}
                    </span>
                    {currentTopic.category && (
                      <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {currentTopic.category}
                      </span>
                    )}
                  </div>

                  <span className="text-zinc-500 font-semibold">
                    Durée d'expression : {formatSeconds(currentTopic.speakingTimeSeconds)}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                  {currentTopic.title}
                </h2>

                {/* Candidate & Examiner Roles (for Task 2) */}
                {(currentTopic.candidateRole || currentTopic.examinerRole) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {currentTopic.candidateRole && (
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
                        <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-blue-600 dark:text-blue-400">
                          Votre Rôle (Candidat) :
                        </span>
                        {currentTopic.candidateRole}
                      </div>
                    )}
                    {currentTopic.examinerRole && (
                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
                        <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-amber-600 dark:text-amber-400">
                          Rôle de l'Examinateur :
                        </span>
                        {currentTopic.examinerRole}
                      </div>
                    )}
                  </div>
                )}

                {/* Prompt Text */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Consigne Officielle
                  </span>
                  <p className="text-sm font-serif text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
                    {currentTopic.prompt}
                  </p>
                </div>

                {/* Preparation Timer & Scratchpad (especially for Task 2 / Task 3) */}
                {currentTopic.prepTimeSeconds > 0 && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-white dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-zinc-900 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                          Temps de Préparation Officiel : {formatSeconds(prepSecondsRemaining)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setIsPrepRunning(!isPrepRunning)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            isPrepRunning
                              ? "bg-amber-600 text-white"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                        >
                          {isPrepRunning ? "Pause" : "Démarrer Prep (2 min)"}
                        </button>
                        <button
                          onClick={() => {
                            setIsPrepRunning(false);
                            setPrepSecondsRemaining(currentTopic.prepTimeSeconds || 120);
                          }}
                          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                          title="Réinitialiser le chrono de prépa"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={candidateNotes}
                      onChange={(e) => setCandidateNotes(e.target.value)}
                      placeholder="Brouillon de préparation : notez ici vos 10 à 15 questions clés ou vos connecteurs logiques avant d'enregistrer..."
                      rows={3}
                      className="w-full text-xs p-3 rounded-lg bg-white dark:bg-zinc-950 border border-indigo-100 dark:border-indigo-900/60 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                    />
                  </div>
                )}

                {/* Suggested Points & Questions (Always visible in review mode, or collapsible in exam mode) */}
                {currentTopic.suggestedQuestionsOrPoints &&
                  currentTopic.suggestedQuestionsOrPoints.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                          {currentTopic.taskNumber === 2
                            ? "Questions Recommandées & Pistes d'Interaction"
                            : "Axes d'Argumentation & Idées Clés"}
                        </h4>
                        {practiceMode === "exam" && (
                          <span className="text-[10px] font-mono text-zinc-400">
                            (Visible pour vous aider)
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 text-xs">
                        {currentTopic.suggestedQuestionsOrPoints.map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-serif"
                          >
                            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">
                              {i + 1}.
                            </span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Recording Console Card */}
              <div className="p-8 rounded-2xl bg-[#080E1A] text-white border border-zinc-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-rose-600 animate-ping opacity-35" />
                  )}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl active:scale-95 ${
                      isRecording
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                    aria-label={
                      isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"
                    }
                  >
                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <div>
                  <div className="font-mono text-3xl font-bold tracking-wider">
                    {formatSeconds(recordingSeconds)}{" "}
                    <span className="text-sm font-normal text-zinc-400">
                      / {formatSeconds(currentTopic.speakingTimeSeconds)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 max-w-sm">
                    {isRecording
                      ? "Enregistrement en direct au micro... Cliquez sur le bouton rouge pour terminer"
                      : audioBlob
                      ? "Enregistrement vocal prêt. Réécoutez ou déclenchez l'évaluation IA gratuite"
                      : "Cliquez sur le micro pour enregistrer votre réponse orale"}
                  </p>
                </div>

                {/* Audio Player */}
                {audioUrl && (
                  <div className="w-full max-w-md bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 flex items-center justify-between gap-4">
                    <audio
                      ref={audioElementRef}
                      src={audioUrl}
                      onEnded={() => setIsPlayingRecording(false)}
                    />
                    <button
                      onClick={togglePlayback}
                      className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white shrink-0"
                    >
                      {isPlayingRecording ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="text-left flex-1 text-xs text-zinc-300">
                      <div className="font-bold">Votre Réponse Vocale</div>
                      <div className="text-zinc-500 font-mono text-[11px]">
                        Durée : {formatSeconds(recordingSeconds)}
                      </div>
                    </div>

                    <button
                      onClick={startRecording}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white transition"
                      title="Réenregistrer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Evaluation Trigger Button */}
                {audioBlob && !evaluation && (
                  <button
                    onClick={handleTranscribeAndEvaluate}
                    disabled={isTranscribing || isEvaluating}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-xl transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isTranscribing || isEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isTranscribing ? "Transcription Whisper..." : "Évaluation IA NCLC..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Transcrire & Évaluer Gratuitement (IA)
                      </>
                    )}
                  </button>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-950/80 text-red-200 border border-red-800 text-xs w-full max-w-md text-left">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Transcription, AI Evaluation & Model Answer */}
            <div className="lg:col-span-5 space-y-6">
              {/* Transcript Output */}
              {transcript && (
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-zinc-400">
                      Transcription Whisper
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                      Reconnaissance vocale
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 leading-relaxed whitespace-pre-line">
                    "{transcript}"
                  </p>
                </div>
              )}

              {/* Evaluation Results */}
              {evaluation && (
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-rose-500/50 shadow-xl space-y-5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-widest">
                          Bilan Oral Canadien
                        </div>
                        <h3 className="text-xl font-serif font-bold text-zinc-950 dark:text-zinc-50">
                          {evaluation.overallScore} / 699 pts
                        </h3>
                        <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          Niveau NCLC {evaluation.nclcLevel} ({evaluation.cefrLevel})
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                    {evaluation.summary}
                  </p>

                  <div className="space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Compétences évaluées
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
                        <div className="text-zinc-500 text-[11px] font-serif">{val.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Answer C1 Accordion (always accessible in review mode, unlocked after eval in exam mode) */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                    Réponse Modèle C1 (NCLC 10+)
                  </h4>
                  <button
                    onClick={() => setShowModelAnswer(!showModelAnswer)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showModelAnswer ? "Masquer" : "Afficher la transcription modèle"}
                  </button>
                </div>

                {showModelAnswer ? (
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif whitespace-pre-line animate-in fade-in">
                    {currentTopic.modelAudioTranscript}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-serif">
                    {practiceMode === "exam" && !evaluation
                      ? "En mode examen, entraînez-vous d'abord à enregistrer. Vous pouvez toutefois révéler la transcription modèle à tout moment."
                      : "Consultez la formulation idéale niveau C1 pour enrichir votre vocabulaire et vos tournures idiomatiques."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================================================================== */
        /* SITUATION CATALOGUE VIEW (Browse all 30 situations)                  */
        /* ==================================================================== */
        <div className="space-y-6">
          {/* Filter Bar: Tabs & Search */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            {/* Task Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <button
                onClick={() => setActiveTaskTab("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTaskTab === "all"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                Toutes les situations ({topics.length})
              </button>
              <button
                onClick={() => setActiveTaskTab(2)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTaskTab === 2
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <span>Tâche 2 : Interaction</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                  {topics.filter((t) => t.taskNumber === 2).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTaskTab(3)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTaskTab === 3
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <span>Tâche 3 : Monologue</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                  {topics.filter((t) => t.taskNumber === 3).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTaskTab(1)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTaskTab === 1
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <span>Tâche 1 : Entretien</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                  {topics.filter((t) => t.taskNumber === 1).length}
                </span>
              </button>
            </div>

            {/* Search Input & Category Pills */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une situation (ex: logement, voiture, télétravail, cuisine)..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                />
              </div>

              {/* Category Dropdown/Selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">Toutes les thématiques ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Situation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => {
              const isTask2 = topic.taskNumber === 2;
              const isTask3 = topic.taskNumber === 3;

              return (
                <div
                  key={topic.id}
                  onClick={() => selectSituation(topic)}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 shadow-sm hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isTask2
                            ? "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                            : isTask3
                            ? "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
                            : "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900"
                        }`}
                      >
                        Tâche {topic.taskNumber} ·{" "}
                        {isTask2 ? "Interaction" : isTask3 ? "Monologue" : "Entretien"}
                      </span>

                      {topic.category && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">
                          {topic.category}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug line-clamp-2">
                      {topic.title}
                    </h3>

                    {/* Prompt Preview */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-serif leading-relaxed line-clamp-3">
                      {topic.prompt}
                    </p>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{formatSeconds(topic.speakingTimeSeconds)}</span>
                      {topic.prepTimeSeconds > 0 && (
                        <span className="text-[10px] text-zinc-400">
                          (Prep : {formatSeconds(topic.prepTimeSeconds)})
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform">
                      S'entraîner <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTopics.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-mono text-zinc-500">
                Aucune situation ne correspond à votre recherche "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setActiveTaskTab("all");
                }}
                className="px-4 py-2 text-xs font-bold text-rose-600 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      )}

      <TcfRulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
        defaultModule="speaking"
      />
    </div>
  );
}
