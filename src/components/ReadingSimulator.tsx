"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Loader2,
  Flag,
} from "lucide-react";
import { TCFReadingTest, TCFReadingQuestion } from "@/data/reading-tests";
import { AiExplainerModal } from "@/components/AiExplainerModal";
import { saveTestResult } from "@/lib/storage";
import { getScoreDetails } from "@/lib/tcf-scoring";
import { saveMistake } from "@/lib/mistakes";

export function ReadingSimulator({ testId }: { testId: string }) {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") || "exam") as "exam" | "review";
  const isReviewMode = mode === "review";

  const [test, setTest] = useState<TCFReadingTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    async function loadTest() {
      setLoading(true);
      try {
        const res = await fetch(`/api/tests/reading?id=${testId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setTest(json.data);
        }
      } catch (err) {
        console.error("Failed to load reading test from PostgreSQL:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTest();
  }, [testId]);

  useEffect(() => {
    if (isReviewMode || isSubmitted || loading) return;
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
  }, [isSubmitted, loading]);

  if (loading || !test) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
        <p className="text-sm font-mono text-zinc-500">Chargement du test de lecture depuis PostgreSQL...</p>
      </div>
    );
  }

  const currentQ: TCFReadingQuestion = test.questions[currentIndex] || test.questions[0];

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
    const scoreData = calculateScore();

    // Auto-save any incorrect questions to personal Mistake Vault
    test.questions.forEach((q) => {
      const userAns = selectedAnswers[q.questionNumber];
      if (userAns && userAns !== q.correctAnswer) {
        saveMistake({
          skill: "reading",
          testId: test.id,
          questionNumber: q.questionNumber,
          level: q.level,
          prompt: q.prompt,
          options: q.options,
          selectedAnswer: userAns,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          trapAlert: q.trapAlert,
          contextText: q.documentContent,
        });
      }
    });

    saveTestResult("reading", {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <Link
          href="/dashboard/reading"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux Tests de Lecture
        </Link>

        <div className="flex items-center gap-4">
          {isReviewMode ? (
            <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mode Révision · Temps Libre</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-mono font-bold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
            >
              Terminer le test
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setTimeLeft(60 * 60);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Results Banner */}
      {isSubmitted && finalScore && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-blue-900/30 border border-indigo-500/40 mb-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                  Résultat Compréhension Écrite (PostgreSQL Synchronisé)
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Score : {finalScore.score} / 699 — NCLC {finalScore.nclc} ({finalScore.cefr})
                </h2>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {finalScore.correct} correctes · {finalScore.wrong} erreurs · {finalScore.skipped} ignorées
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Split Pane: Document Left, Question Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[460px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-4 h-4" /> Document Source #{currentQ.questionNumber}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                  Niveau {currentQ.level}
                </span>
              </div>

              <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {currentQ.documentTitle}
              </h4>

              <div className="prose dark:prose-invert text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-serif whitespace-pre-line p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                {currentQ.documentContent}
              </div>
            </div>

            {(isSubmitted || (isReviewMode && Boolean(selectedAnswers[currentQ.questionNumber]))) && (
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2 animate-in fade-in">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Explication officielle :</strong> {currentQ.explanation}
                </div>
                {currentQ.trapAlert && (
                  <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                    <strong>Piège TCF :</strong> {currentQ.trapAlert}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Question & Options Column (Right) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
                QUESTION {currentQ.questionNumber} / {test.questions.length}
              </span>

              {!isReviewMode && !isSubmitted && (
                <button
                  onClick={() => {
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [currentQ.questionNumber]: !prev[currentQ.questionNumber],
                    }));
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    flaggedQuestions[currentQ.questionNumber]
                      ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800"
                      : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQ.questionNumber] ? "Marquée" : "Marquer"}</span>
                </button>
              )}
            </div>

            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              {currentQ.prompt}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {Object.entries(currentQ.options).map(([key, value]) => {
                const isSelected = selectedAnswers[currentQ.questionNumber] === key;
                const isCorrect = currentQ.correctAnswer === key;
                const isAnsweredInReview = isReviewMode && Boolean(selectedAnswers[currentQ.questionNumber]);
                const isRevealed = isSubmitted || isAnsweredInReview;

                let optionStyle =
                  "border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50";

                if (isSelected && !isRevealed) {
                  optionStyle = "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 font-semibold ring-2 ring-indigo-500/20";
                }

                if (isRevealed) {
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
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs">
                        {key}
                      </span>
                      <span className="text-sm">{value}</span>
                    </div>

                    {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" /> Précédente
              </button>

              <button
                onClick={() => setAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Explication & Vocabulaire IA
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(test.questions.length - 1, prev + 1))}
                disabled={currentIndex === test.questions.length - 1}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                Suivante <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono font-bold text-zinc-500">
                Grille des Questions
              </span>
              <span className="text-xs font-mono font-bold text-zinc-400">
                {Object.keys(selectedAnswers).length} / {test.questions.length}
              </span>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
              {test.questions.map((q, idx) => {
                const isSelected = selectedAnswers[q.questionNumber];
                const isCurrent = idx === currentIndex;
                const isCorrect = selectedAnswers[q.questionNumber] === q.correctAnswer;
                const isFlagged = flaggedQuestions[q.questionNumber];

                let btnStyle = "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200";

                if (isSelected && !isSubmitted && !isReviewMode) {
                  btnStyle = "bg-indigo-600 text-white font-bold";
                }

                if (isReviewMode && isSelected) {
                  btnStyle = isCorrect ? "bg-emerald-600 text-white font-bold" : "bg-red-600 text-white font-bold";
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
                  btnStyle += " ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-900";
                }

                return (
                  <button
                    key={q.questionNumber}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-7 rounded text-[11px] font-mono transition-all flex items-center justify-center ${btnStyle}`}
                  >
                    <span>{q.questionNumber}</span>
                    {isFlagged && !isSubmitted && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-white dark:border-zinc-900" />
                    )}
                  </button>
                );
              })}
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
        transcriptOrContext={currentQ.documentContent}
        preloadedExplanation={currentQ.explanation}
        preloadedTrapAlert={currentQ.trapAlert}
        testType="reading"
      />
    </div>
  );
}
