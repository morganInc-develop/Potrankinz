'use client'

import { usePathname } from 'next/navigation'

import AmbientMusicPlayer, {
  type MusicTrack,
} from '@/components/audio/AmbientMusicPlayer'

const siteTracks: MusicTrack[] = [
  {
    src: '/audio/riddim-at-pot-rankin-kitchen.mp3',
    title: 'Riddim at Pot Rankin Kitchen',
  },
  {
    src: '/audio/hungry-for-rankinz-beat.mp3',
    title: 'Hungry for Rankinz Beat',
  },
]

export default function SiteMusicPlayer() {
  const pathname = usePathname()

  return (
    <AmbientMusicPlayer
      tracks={siteTracks}
      placement={pathname === '/' ? 'splash' : 'site'}
    />
  )
}
