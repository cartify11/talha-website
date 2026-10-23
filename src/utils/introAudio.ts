class IntroSoundManager {
  private isMuted: boolean = false;
  private audioContext: AudioContext | null = null;
  private activeAudios: HTMLAudioElement[] = [];

  constructor() {
    // Lazy initialize on user gesture
  }

  public init() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    } catch (e) {
      console.warn('AudioContext init warning:', e);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.activeAudios.forEach(a => {
      a.muted = muted;
    });
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stopAll() {
    this.activeAudios.forEach(a => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch (e) {
        // Ignore
      }
    });
    this.activeAudios = [];
  }

  private playLocalAudio(path: string, volume: number = 1.0): HTMLAudioElement | null {
    if (this.isMuted) return null;
    try {
      const audio = new Audio(path);
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.muted = this.isMuted;
      this.activeAudios.push(audio);
      audio.play().catch(err => {
        console.warn(`Local audio playback notice (${path}):`, err);
      });
      return audio;
    } catch (e) {
      console.warn('Audio creation error:', e);
      return null;
    }
  }

  // 1. Rumble (0.0s - 1.0s)
  public playRumble() {
    if (this.isMuted) return;
    this.playLocalAudio('/assets/sounds/cinematic-rumble.wav', 0.85);

    // Web Audio API redundant layer for deep physical sub-bass
    if (this.audioContext && this.audioContext.state === 'running') {
      try {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 1.8);
        gain.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 2.0);
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start();
        osc.stop(this.audioContext.currentTime + 2.0);
      } catch (e) {
        // Fallback ok
      }
    }
  }

  // 2. Concrete Impact (2.5s)
  public playImpact() {
    if (this.isMuted) return;
    this.playLocalAudio('/assets/sounds/concrete-impact.wav', 1.0);

    // Web Audio API physical punch reinforcement
    if (this.audioContext && this.audioContext.state === 'running') {
      try {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      } catch (e) {
        // Fallback ok
      }
    }
  }

  // 3. Stone Cracking & Fracturing (3.0s - 4.5s)
  public playCrack() {
    if (this.isMuted) return;
    this.playLocalAudio('/assets/sounds/stone-crack.wav', 0.9);
  }
}

export const introAudio = new IntroSoundManager();
