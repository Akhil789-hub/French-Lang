"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Gauge } from "lucide-react";

interface AudioPlayerProps {
  speechText?: string;
  audioUrl?: string;
  title?: string;
  onEnded?: () => void;
}

export function AudioPlayer({ speechText, audioUrl, title, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when speechText or audioUrl changes
    setIsPlaying(false);
    setProgress(0);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [speechText, audioUrl]);

  const togglePlayback = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
        })
        .catch((e) => console.error("Audio playback error:", e));
      return;
    }

    // SpeechSynthesis Fallback
    if (typeof window !== "undefined" && window.speechSynthesis && speechText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = "fr-FR";
      utterance.rate = playbackRate;

      // Select French voice if available
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find((v) => v.lang.startsWith("fr") || v.lang.startsWith("FR"));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setHasPlayed(true);
        startFakeProgress(speechText.length);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
        onEnded?.();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.pause();
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const restartAudio = () => {
    pauseAudio();
    setProgress(0);
    setTimeout(() => {
      playAudio();
    }, 100);
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
    if (isPlaying) {
      restartAudio();
    }
  };

  const startFakeProgress = (textLen: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const approxDurationSec = Math.max(3, textLen / 15) / playbackRate;
    const intervalMs = 100;
    const step = 100 / ((approxDurationSec * 1000) / intervalMs);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          return 98;
        }
        return prev + step;
      });
    }, intervalMs);
  };

  return (
    <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg border border-zinc-800">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              const cur = audioRef.current.currentTime;
              const dur = audioRef.current.duration || 1;
              setProgress((cur / dur) * 100);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(100);
            onEnded?.();
          }}
        />
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayback}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button
            onClick={restartAudio}
            className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Recommencer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Info & Progress */}
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              {title || "Enregistrement Audio Officiel TCF"}
            </span>
            <span>{hasPlayed ? (isPlaying ? "En cours d'écoute..." : "En pause") : "Prêt à écouter"}</span>
          </div>

          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Speed Selector */}
        <button
          onClick={cycleSpeed}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-200 transition-colors"
          title="Vitesse de lecture"
        >
          <Gauge className="w-3.5 h-3.5 text-blue-400" />
          <span>{playbackRate}x</span>
        </button>
      </div>
    </div>
  );
}
