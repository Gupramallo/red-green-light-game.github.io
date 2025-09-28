export type CalculateAudioPlaybackRate = {
  audioDuration?: number
  targetDuration: number
}

export type ToggleAudio = {
  audioPlaybackRate?: number
  autoPlay?: boolean
}
