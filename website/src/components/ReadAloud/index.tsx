import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

// Prefer natural / neural voices when the device offers them.
const VOICE_PRIORITY = [
  'natural',
  'neural',
  'google us english',
  'google uk english female',
  'samantha',
  'aria',
  'jenny',
  'libby',
  'zira',
];

function pickBest(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  for (const key of VOICE_PRIORITY) {
    const hit = voices.find((v) => v.name.toLowerCase().includes(key));
    if (hit) return hit;
  }
  return voices[0];
}

// Pull readable prose from the current doc/blog article, skipping code,
// images, tables, the on-page TOC, and navigation.
function getChunks(): string[] {
  const root =
    document.querySelector('.theme-doc-markdown') ||
    document.querySelector('article') ||
    document.querySelector('main');
  if (!root) return [];
  const clone = root.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      'pre, .theme-code-block, img, table, .theme-doc-toc-mobile, .theme-doc-toc-desktop, .pagination-nav, .breadcrumbs, button, .theme-doc-version-badge, .theme-doc-breadcrumbs',
    )
    .forEach((n) => n.remove());
  const text = (clone.innerText || clone.textContent || '').replace(/\s+\n/g, '\n');
  // Split into short, sentence-sized chunks — keeps playback smooth and
  // sidesteps the browser's long-utterance cutoff.
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .flatMap((line) => line.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [line])
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

type Status = 'idle' | 'playing' | 'paused';

function Player(): React.ReactElement | null {
  const {pathname} = useLocation();
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [hasContent, setHasContent] = useState(false);
  const [open, setOpen] = useState(false);

  const chunks = useRef<string[]>([]);
  const idx = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const rateRef = useRef(1);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);
  useEffect(() => {
    voiceRef.current = voices.find((v) => v.name === voiceName);
  }, [voiceName, voices]);

  // Load available English voices.
  useEffect(() => {
    if (!synth) return;
    const load = () => {
      const en = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
      if (!en.length) return;
      setVoices(en);
      setVoiceName((cur) => cur || pickBest(en)?.name || '');
    };
    load();
    synth.addEventListener?.('voiceschanged', load);
    return () => synth.removeEventListener?.('voiceschanged', load);
  }, [synth]);

  const stop = useCallback(() => {
    synth?.cancel();
    idx.current = 0;
    setStatus('idle');
  }, [synth]);

  // Reset + re-detect content whenever the route changes.
  useEffect(() => {
    stop();
    setOpen(false);
    const t = setTimeout(() => setHasContent(getChunks().length > 3), 80);
    return () => clearTimeout(t);
  }, [pathname, stop]);

  // Safety: stop speaking if the user leaves the tab/site.
  useEffect(() => {
    return () => synth?.cancel();
  }, [synth]);

  const speakNext = useCallback(() => {
    if (!synth) return;
    if (idx.current >= chunks.current.length) {
      setStatus('idle');
      idx.current = 0;
      return;
    }
    const u = new SpeechSynthesisUtterance(chunks.current[idx.current]);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = rateRef.current;
    u.pitch = 1;
    u.onend = () => {
      idx.current += 1;
      speakNext();
    };
    u.onerror = () => setStatus('idle');
    synth.speak(u);
  }, [synth]);

  const play = useCallback(() => {
    if (!synth) return;
    if (status === 'paused') {
      synth.resume();
      setStatus('playing');
      return;
    }
    chunks.current = getChunks();
    if (!chunks.current.length) return;
    idx.current = 0;
    setStatus('playing');
    setOpen(true);
    synth.cancel();
    speakNext();
  }, [synth, status, speakNext]);

  const pause = useCallback(() => {
    synth?.pause();
    setStatus('paused');
  }, [synth]);

  if (!synth || !hasContent) return null;

  return (
    <div className={styles.wrap} data-status={status}>
      {status === 'idle' ? (
        <button
          type="button"
          className={styles.pill}
          onClick={play}
          aria-label="Listen to this page">
          <span className={styles.icon} aria-hidden="true">▶</span>
          Listen to this page
        </button>
      ) : (
        <div className={styles.panel} role="group" aria-label="Read-aloud controls">
          {status === 'playing' ? (
            <button type="button" className={styles.ctrl} onClick={pause} aria-label="Pause">
              ⏸
            </button>
          ) : (
            <button type="button" className={styles.ctrl} onClick={play} aria-label="Resume">
              ▶
            </button>
          )}
          <button type="button" className={styles.ctrl} onClick={stop} aria-label="Stop">
            ⏹
          </button>
          <span className={styles.reading}>
            {status === 'playing' ? 'Reading…' : 'Paused'}
          </span>
          <button
            type="button"
            className={styles.gear}
            onClick={() => setOpen((o) => !o)}
            aria-label="Voice and speed settings"
            aria-expanded={open}>
            ⚙
          </button>
        </div>
      )}

      {open && (
        <div className={styles.settings}>
          <label className={styles.field}>
            <span>Voice</span>
            <select
              value={voiceName}
              onChange={(e) => {
                setVoiceName(e.target.value);
                if (status !== 'idle') {
                  // restart current sentence with the new voice
                  synth.cancel();
                  setStatus('playing');
                  setTimeout(speakNext, 60);
                }
              }}>
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name.replace(/\s*\(.*\)$/, '')}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Speed</span>
            <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
              <option value={0.8}>0.8×</option>
              <option value={0.9}>0.9×</option>
              <option value={1}>1×</option>
              <option value={1.15}>1.15×</option>
              <option value={1.3}>1.3×</option>
              <option value={1.5}>1.5×</option>
            </select>
          </label>
          <p className={styles.hint}>
            Voices come from your device/browser — pick the most natural one.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ReadAloud(): React.ReactElement {
  return <BrowserOnly>{() => <Player />}</BrowserOnly>;
}
