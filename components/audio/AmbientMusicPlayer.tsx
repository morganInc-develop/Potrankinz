'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Music2,
  Minimize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'

const MUSIC_ENABLED_KEY = 'potrankinz-music-enabled'
const MUSIC_MUTED_KEY = 'potrankinz-music-muted'
const MUSIC_TRACK_KEY = 'potrankinz-music-track'

export interface MusicTrack {
  src: string
  title: string
}

interface AmbientMusicPlayerProps {
  tracks: MusicTrack[]
  placement?: 'splash' | 'site'
}

export default function AmbientMusicPlayer({
  tracks,
  placement = 'site',
}: AmbientMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [needsSoundGesture, setNeedsSoundGesture] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const currentTrack = tracks[currentTrackIndex] ?? tracks[0]

  useEffect(() => {
    const savedTrack = Number(
      window.sessionStorage.getItem(MUSIC_TRACK_KEY) ?? '0',
    )

    if (
      Number.isInteger(savedTrack) &&
      savedTrack >= 0 &&
      savedTrack < tracks.length
    ) {
      setCurrentTrackIndex(savedTrack)
    }
  }, [tracks.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const musicEnabled =
      window.sessionStorage.getItem(MUSIC_ENABLED_KEY) !== 'false'
    const savedMuted = window.sessionStorage.getItem(MUSIC_MUTED_KEY) === 'true'

    audio.volume = 0.32
    audio.muted = savedMuted
    setIsMuted(savedMuted)

    if (!musicEnabled) return

    let cancelled = false

    const startMusic = async () => {
      try {
        await audio.play()
        if (!cancelled) setIsPlaying(true)
      } catch {
        if (cancelled) return

        audio.muted = true
        setIsMuted(true)
        setNeedsSoundGesture(true)
        window.sessionStorage.setItem(MUSIC_MUTED_KEY, 'true')

        try {
          await audio.play()
          if (!cancelled) setIsPlaying(true)
        } catch {
          if (!cancelled) setIsPlaying(false)
        }
      }
    }

    void startMusic()

    return () => {
      cancelled = true
      audio.pause()
    }
  }, [currentTrack?.src])

  const changeTrack = (direction: -1 | 1) => {
    if (tracks.length < 2) return

    const nextTrackIndex =
      (currentTrackIndex + direction + tracks.length) % tracks.length
    setCurrentTrackIndex(nextTrackIndex)
    window.sessionStorage.setItem(MUSIC_TRACK_KEY, String(nextTrackIndex))
    window.sessionStorage.setItem(MUSIC_ENABLED_KEY, 'true')
  }

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setIsPlaying(false)
      window.sessionStorage.setItem(MUSIC_ENABLED_KEY, 'false')
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
      window.sessionStorage.setItem(MUSIC_ENABLED_KEY, 'true')
    } catch {
      setIsPlaying(false)
    }
  }

  const toggleMute = async () => {
    const audio = audioRef.current
    if (!audio) return

    const nextMuted = !audio.muted
    audio.muted = nextMuted
    setIsMuted(nextMuted)
    setNeedsSoundGesture(false)
    window.sessionStorage.setItem(MUSIC_MUTED_KEY, String(nextMuted))

    if (!nextMuted && audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
        window.sessionStorage.setItem(MUSIC_ENABLED_KEY, 'true')
      } catch {
        setIsPlaying(false)
      }
    }
  }

  const positionClass =
    placement === 'splash'
      ? 'right-0 top-4 md:top-6'
      : 'right-0 top-24 md:top-32 lg:top-28'

  if (!currentTrack) return null

  return (
    <div
      className={`fixed z-[70] ${positionClass}`}
      aria-label={`Music player: ${currentTrack.title}`}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        autoPlay
        muted={isMuted}
        loop={tracks.length === 1}
        preload="auto"
        playsInline
        onEnded={() => changeTrack(1)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label={`Expand music player. ${currentTrack.title}`}
          title="Open music player"
          className="relative grid h-12 w-12 place-items-center overflow-hidden border border-r-0 border-[#F5C518]/65 bg-[#0D0A06]/94 text-[#F5C518] shadow-[-4px_5px_0_rgba(196,30,58,0.36)] backdrop-blur-md transition-colors hover:bg-[#17120b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background:
                'linear-gradient(90deg, #C41E3A 0 33%, #F5C518 33% 66%, #4CAF50 66%)',
            }}
            aria-hidden
          />
          {isPlaying ? (
            <Music2 size={19} className="animate-pulse" />
          ) : (
            <Music2 size={19} />
          )}
        </button>
      )}

      {isExpanded && (
        <div className="relative flex items-center gap-1 border border-r-0 border-[#F5C518]/55 bg-[#0D0A06]/92 p-1.5 text-white shadow-[-5px_6px_0_rgba(196,30,58,0.36)] backdrop-blur-md sm:gap-2 sm:p-2">
          <span
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background:
                'linear-gradient(90deg, #C41E3A 0 33%, #F5C518 33% 66%, #4CAF50 66%)',
            }}
            aria-hidden
          />

          <div className="flex min-w-0 max-w-20 items-center gap-2 pl-1 pr-1 sm:max-w-52 sm:pr-2">
            <Music2 size={16} className="shrink-0 text-[#4CAF50]" />
            <span className="min-w-0" aria-live="polite">
              <span className="block font-ui text-[8px] font-bold uppercase tracking-[0.18em] text-[#F5C518]">
                {needsSoundGesture
                  ? 'Tap for sound'
                  : isPlaying
                    ? 'Now playing'
                    : 'Music paused'}
              </span>
              <span className="block truncate font-special text-[9px] uppercase tracking-[0.04em] text-white/72 sm:text-[10px] sm:tracking-[0.06em]">
                {currentTrack.title}
              </span>
              {tracks.length > 1 && (
                <span className="block font-ui text-[7px] font-bold uppercase tracking-[0.14em] text-white/38">
                  Track {currentTrackIndex + 1} of {tracks.length}
                </span>
              )}
            </span>
            <span
              className="hidden h-5 items-end gap-[2px] sm:flex"
              aria-hidden
            >
              {[10, 17, 13].map((height, index) => (
                <span
                  key={height}
                  className={`w-[3px] bg-[#4CAF50] ${
                    isPlaying ? 'animate-pulse' : 'opacity-35'
                  }`}
                  style={{
                    height,
                    animationDelay: `${index * 140}ms`,
                  }}
                />
              ))}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void togglePlayback()}
            aria-label={
              isPlaying
                ? `Pause ${currentTrack.title}`
                : `Play ${currentTrack.title}`
            }
            title={isPlaying ? 'Pause music' : 'Play music'}
            className="grid h-9 w-9 place-items-center bg-[#F5C518] text-black transition-colors hover:bg-[#4CAF50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </button>

          {tracks.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => changeTrack(-1)}
                aria-label={`Play previous song. Currently playing ${currentTrack.title}`}
                title="Previous song"
                className="grid h-9 w-9 place-items-center border border-[#F5C518]/65 bg-black text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
              >
                <SkipBack size={18} />
              </button>
              <button
                type="button"
                onClick={() => changeTrack(1)}
                aria-label={`Play next song. Currently playing ${currentTrack.title}`}
                title="Next song"
                className="grid h-9 w-9 place-items-center border border-[#F5C518]/65 bg-black text-[#F5C518] transition-colors hover:bg-[#F5C518] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
              >
                <SkipForward size={18} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => void toggleMute()}
            aria-label={
              isMuted
                ? `Turn on sound for ${currentTrack.title}`
                : `Mute ${currentTrack.title}`
            }
            title={isMuted ? 'Turn sound on' : 'Mute music'}
            className={`grid h-9 w-9 place-items-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10 ${
              isMuted
                ? 'border-[#C41E3A] bg-[#C41E3A] text-white hover:bg-[#a7182e]'
                : 'border-[#4CAF50]/65 bg-[#1E6B1E] text-white hover:bg-[#4CAF50] hover:text-black'
            }`}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Minimize music player"
            title="Minimize music player"
            className="grid h-9 w-9 place-items-center border border-white/25 bg-white/[0.06] text-white/80 transition-colors hover:border-white/55 hover:bg-white/[0.14] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
          >
            <Minimize2 size={17} />
          </button>
        </div>
      )}
    </div>
  )
}
