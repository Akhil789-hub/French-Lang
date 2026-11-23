"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  AlertTriangle,
  FileText,
  Globe,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { LISTENING_TESTS, TCFQuestion } from "@/data/listening-tests";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AiExplainerModal } from "@/components/AiExplainerModal";
import { saveTestResult } from "@/lib/storage";
import { getScoreDetails } from "@/lib/tcf-scoring";

export function ListeningSimulator({ testId }: { testId: string }) {
  const test = LISTENING_TESTS.find((t) => t.id === testId) || LISTENING_TESTS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35 * 60); // 35 minutes
  const [showTranscript, setShowTranscript] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const currentQ: TCFQuestion = test.questions[currentIndex];

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleSelectOption = (key: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.questionNumber]: key,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    test.questions.forEach((q) => {
      if (selectedAnswers[q.questionNumber] === q.correctAnswer) {
        correct += 1;
      }
    });

    const score = Math.min(699, Math.round((correct / test.questions.length) * 699));
    const details = getScoreDetails(score);

    return {
      correct,
      wrong: Object.keys(selectedAnswers).length - correct,
      skipped: test.questions.length - Object.keys(selectedAnswers).length,
      score,
      nclc: details.nclc,
      cefr: details.cefr,
    };
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    setShowTranscript(true);
    const scoreData = calculateScore();
    saveTestResult("listening", {
      testId: test.id,
      testNumber: test.testNumber,
      score: scoreData.score,
      totalQuestions: test.questions.length,
      correctCount: scoreData.correct,
      wrongCount: scoreData.wrong,
      skippedCount: scoreData.skipped,
      nclcLevel: scoreData.nclc,
      cefrLevel: scoreData.cefr,
      answers: selectedAnswers,
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const finalScore = isSubmitted ? calculateScore() : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <Link
          href="/dashboard/listening"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux 40 Tests
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-mono font-bold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              Terminer le test
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setTimeLeft(35 * 60);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Results Banner if Submitted */}
      {isSubmitted && finalScore && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/30 border border-blue-500/40 mb-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Résultats Officiels Simulés
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Score : {finalScore.score} / 699 — NCLC {finalScore.nclc} ({finalScore.cefr})
                </h2>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {finalScore.correct} correctes · {finalScore.wrong} erreurs · {finalScore.skipped} ignorées
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              >
                {showTranscript ? "Masquer Transcriptions" : "Afficher Toutes les Transcriptions"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Question Left, Navigator Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Player & Question */}
        <div className="lg:col-span-2 space-y-6">
          <AudioPlayer
            speechText={currentQ.frenchTranscript}
            title={`Question ${currentQ.questionNumber} (Niveau ${currentQ.level})`}
          />

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                QUESTION {currentQ.questionNumber} / 39
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                Niveau {currentQ.level}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              {currentQ.prompt}
            </h3>

            <div className="space-y-3">
              {Object.entries(currentQ.options).map(([key, value]) => {
                const isSelected = selectedAnswers[currentQ.questionNumber] === key;
                const isCorrect = currentQ.correctAnswer === key;

                let optionStyle =
                  "border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50";

                if (isSelected && !isSubmitted) {
                  optionStyle = "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20";
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 ring-2 ring-red-500/20 line-through";
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-sm">
                        {key}
                      </span>
                      <span className="text-sm">{value}</span>
                    </div>

                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" /> Précédente
              </button>

              <button
                onClick={() => setAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Explication & Piège IA
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(test.questions.length - 1, prev + 1))}
                disabled={currentIndex === test.questions.length - 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                Suivante <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {(isSubmitted || showTranscript) && (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <FileText className="w-4 h-4 text-blue-500" /> Transcription Audio & Phrase Clé
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Bonne réponse : <strong className="text-emerald-600">{currentQ.correctAnswer}</strong>
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-serif">
                {currentQ.frenchTranscript}
              </div>

              <div className="bg-white/60 dark:bg-zinc-950/60 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  <Globe className="w-3.5 h-3.5" /> Traduction Anglaise
                </div>
                {currentQ.englishTranslation}
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl border border-red-200 dark:border-red-900/40 text-xs text-red-950 dark:text-red-200">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Piège du TCF Détecté
                </div>
                {currentQ.trapAlert}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Question Matrix Navigation */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Grille des 39 Questions
            </h4>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {test.questions.map((q, idx) => {
                const isSelected = selectedAnswers[q.questionNumber];
                const isCurrent = idx === currentIndex;
                const isCorrect = selectedAnswers[q.questionNumber] === q.correctAnswer;

                let btnStyle = "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200";

                if (isSelected && !isSubmitted) {
                  btnStyle = "bg-blue-600 text-white font-bold";
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-600 text-white font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-red-600 text-white font-bold";
                  } else {
                    btnStyle = "bg-zinc-200 dark:bg-zinc-800 text-zinc-400";
                  }
                }

                if (isCurrent) {
                  btnStyle += " ring-2 ring-offset-2 ring-blue-500";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-mono font-medium transition-all ${btnStyle}`}
                  >
                    {q.questionNumber}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center justify-between">
                <span>Questions répondues :</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                  {Object.keys(selectedAnswers).length} / 39
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Palier recommandé NCLC 7 :</span>
                <span className="font-mono font-bold text-emerald-600">24+ correctes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AiExplainerModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        questionNumber={currentQ.questionNumber}
        questionPrompt={currentQ.prompt}
        options={currentQ.options}
        correctKey={currentQ.correctAnswer}
        transcriptOrContext={currentQ.frenchTranscript}
        preloadedExplanation={currentQ.explanation}
        preloadedTrapAlert={currentQ.trapAlert}
        testType="listening"
      />
    </div>
  );
}
