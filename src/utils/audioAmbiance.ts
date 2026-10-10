/**
 * Comprehensive Web Audio Engine for Wing Watchers.
 * 
 * Provides:
 * 1. 6 Rich Immersive Nature Soundscapes (Forest, River, Twilight, Campus, Gentle Rain, Autumn)
 * 2. 7 Authentic Bird Call Synthesizers (Oriental Turtle Dove, Bush Warbler, Magpie, Heron, Tit, Woodpecker, Kingfisher)
 * 3. Robust lifecycle: handles browser AudioContext suspension, master volume slider (0-1), mute, active track switching, and visualizer hook.
 */

export type SoundscapeId = 'forest' | 'river' | 'twilight' | 'campus' | 'rain' | 'autumn';

export type BirdCallId = 'dove' | 'warbler' | 'magpie' | 'heron' | 'tit' | 'woodpecker' | 'kingfisher';

export interface SoundscapeTrack {
  id: SoundscapeId;
  titleEn: string;
  titleKr: string;
  icon: string;
  descriptionEn: string;
  descriptionKr: string;
  durationHint: string;
}

export interface BirdCallInfo {
  id: BirdCallId;
  nameEn: string;
  nameKr: string;
  phonetic: string;
  descriptionEn: string;
  descriptionKr: string;
}

export const soundscapeTracks: SoundscapeTrack[] = [
  {
    id: 'forest',
    titleEn: 'Morning Pine Forest',
    titleKr: '아침 소나무 숲길',
    icon: '🌲',
    descriptionEn: 'Gentle breeze swaying Korean red pines with varied tit and warbler songs.',
    descriptionKr: '상쾌한 붉은 소나무 숲을 가르는 아침 바람과 곤줄박이, 박새의 맑은 지저귐.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'river',
    titleEn: 'Gapcheon River Reeds',
    titleKr: '갑천 갈대 수변',
    icon: '🌊',
    descriptionEn: 'Bubbling shallow stream ripples, wind in tall reeds, and distant waterbirds.',
    descriptionKr: '갑천 여울의 맑은 물결 소리와 은빛 갈대밭을 스치는 바람, 물새들의 속삭임.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'twilight',
    titleEn: 'Sikjangsan Twilight',
    titleKr: '식장산 해질녘 트레일',
    icon: '🌙',
    descriptionEn: 'Dusk mountain air, gentle tree crickets, and tranquil turtle dove coos.',
    descriptionKr: '노을 지는 식장산 능선의 고요한 바람, 풀벌레 소리와 평화로운 멧비둘기.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'campus',
    titleEn: 'Woosong Campus Morning',
    titleKr: '우송대 캠퍼스 아침 산책',
    icon: '🏫',
    descriptionEn: 'Crisp campus morning path, cheerful sparrows, and iconic Korean magpie chatter.',
    descriptionKr: '활기찬 우송대 교정 벤치, 참새들의 분주한 날갯짓과 반가운 까치 소리.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'rain',
    titleEn: 'Spring Forest Rain',
    titleKr: '숲에 내리는 봄비',
    icon: '🌧️',
    descriptionEn: 'Gentle, soothing rain droplets tapping on leaves and soft canopy rustle.',
    descriptionKr: '나뭇잎에 투두둑 떨어지는 싱그러운 봄 빗소리와 차분해지는 숲의 적막.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'autumn',
    titleEn: 'Autumn Reed Stream',
    titleKr: '가을 억새와 시냇물',
    icon: '🌾',
    descriptionEn: 'Crisp autumn gust through dry reeds and crystal stream flow.',
    descriptionKr: '가을 억새가 사각거리는 대동천 산책로와 맑게 흐르는 실개천의 노래.',
    durationHint: 'Continuous loop',
  },
];

export const birdCallsList: BirdCallInfo[] = [
  {
    id: 'dove',
    nameEn: 'Oriental Turtle Dove',
    nameKr: '멧비둘기',
    phonetic: 'Croo-coo-coo-croo (구구-구-구)',
    descriptionEn: 'Deep, rhythmic, warm 4-note coo heard across campus and forest trails.',
    descriptionKr: '한국 숲과 교정 어디서나 들리는 다정하고 따뜻한 4박자의 규칙적인 울음소리.',
  },
  {
    id: 'warbler',
    nameEn: 'Korean Bush Warbler',
    nameKr: '휘파람새',
    phonetic: 'Hweet... kyo-kyo-kyo (휘-익 호호호)',
    descriptionEn: 'Incredible bell-like melodic spring song carrying through bamboo and thickets.',
    descriptionKr: '봄철 덤불 숲을 맑게 깨우는 맑고 유려한 고음의 휘파람 노랫소리.',
  },
  {
    id: 'tit',
    nameEn: 'Varied Tit & Great Tit',
    nameKr: '곤줄박이 & 박새',
    phonetic: 'Tsipi-tsipi-tsipi (찌삐-찌삐)',
    descriptionEn: 'Cheerful energetic double-note whistle high in pine crowns.',
    descriptionKr: '소나무 가지 끝에서 짝을 부르는 발랄하고 청아한 2음절의 종소리.',
  },
  {
    id: 'magpie',
    nameEn: 'Eurasian Magpie',
    nameKr: '까치',
    phonetic: 'Chack-chack-chack (깍- 깍- 깍)',
    descriptionEn: 'Bold metallic territorial call of Daejeon’s familiar intelligent bird.',
    descriptionKr: '교정 잔디밭을 성큼성큼 걸으며 영역을 알리는 카랑카랑하고 반가운 소리.',
  },
  {
    id: 'heron',
    nameEn: 'Grey Heron',
    nameKr: '왜가리',
    phonetic: 'Fraaank... (콰-악)',
    descriptionEn: 'Low, guttural river call as it takes flight over Gapcheon stream.',
    descriptionKr: '갑천 얕은 여울에서 큰 날개를 펴고 비상할 때 울리는 낮고 묵직한 외침.',
  },
  {
    id: 'woodpecker',
    nameEn: 'Japanese Pygmy Woodpecker',
    nameKr: '쇠딱따구리',
    phonetic: 'Drrrr-tok-tok (또르르륵 목탁 소리)',
    descriptionEn: 'Rapid rhythmic tree drumming on hollow branches in Uam park.',
    descriptionKr: '고목 껍질을 쪼아 곤충을 찾을 때 숲에 울려 퍼지는 경쾌한 연속 드럼 소리.',
  },
  {
    id: 'kingfisher',
    nameEn: 'Common Kingfisher',
    nameKr: '물총새',
    phonetic: 'Peet-peet! (찌잇- 찌잇!)',
    descriptionEn: 'High, sharp piercing arrow call skimming inches above the river surface.',
    descriptionKr: '수면 위를 푸른 보석처럼 쏜살같이 활공하며 내는 날카롭고 맑은 금속성 호각 소리.',
  },
];

type AudioListener = (state: {
  isPlaying: boolean;
  currentTrack: SoundscapeId;
  volume: number;
  activeBird: BirdCallId | null;
}) => void;

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentTrack: SoundscapeId = 'forest';
  private volume: number = 0.65;
  private activeBird: BirdCallId | null = null;

  // Background audio generator state
  private ambientSourceNodes: AudioNode[] = [];
  private loopIntervals: number[] = [];
  private listeners: AudioListener[] = [];

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    return this.ctx;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.push(listener);
    listener({
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume,
      activeBird: this.activeBird,
    });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const state = {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume,
      activeBird: this.activeBird,
    };
    this.listeners.forEach((l) => l(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume,
      activeBird: this.activeBird,
    };
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    const ctx = this.getAudioContext();
    if (ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.05);
    }
    this.notify();
  }

  // --- Clean Sound Generators ---

  /** Pink noise wind generator with frequency resonant filtering */
  private makeWind(freq: number, gainLevel: number, q: number = 1.0): AudioNode | null {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return null;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq, ctx.currentTime);
    filter.Q.setValueAtTime(q, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(gainLevel, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noise.start();
    this.ambientSourceNodes.push(noise);
    return noise;
  }

  /** Soft rain generator with dual biquad filters */
  private makeRain(intensity: number = 0.22): AudioNode | null {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return null;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(intensity, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    this.ambientSourceNodes.push(noise);
    return noise;
  }

  /** Water ripple pop / drip */
  private triggerWaterDrop() {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startF = 450 + Math.random() * 400;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.exponentialRampToValueAtTime(startF + 350, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  /** Night cricket chirp pulse */
  private triggerCricket() {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.05;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4600 + Math.random() * 300, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  }

  // --- Specific Bird Call Synthesizers ---

  public playBirdCall(birdId: BirdCallId) {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.activeBird = birdId;
    this.notify();

    const now = ctx.currentTime;

    switch (birdId) {
      case 'dove': {
        // Oriental Turtle Dove: 4 low warm coos
        const freqs = [460, 415, 415, 440];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const st = now + idx * 0.32;
          const dur = 0.25;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, st);
          osc.frequency.exponentialRampToValueAtTime(freq - 25, st + dur);

          gain.gain.setValueAtTime(0.0001, st);
          gain.gain.linearRampToValueAtTime(0.24, st + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, st + dur);

          osc.connect(gain);
          gain.connect(this.masterGain!);
          osc.start(st);
          osc.stop(st + dur + 0.05);
        });
        setTimeout(() => {
          if (this.activeBird === 'dove') {
            this.activeBird = null;
            this.notify();
          }
        }, 1600);
        break;
      }

      case 'warbler': {
        // Korean Bush Warbler: Long rising whistle followed by melodic flourish
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(2600, now);
        osc1.frequency.linearRampToValueAtTime(3200, now + 0.5);

        gain1.gain.setValueAtTime(0.001, now);
        gain1.gain.linearRampToValueAtTime(0.22, now + 0.15);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.start(now);
        osc1.stop(now + 0.55);

        // Flourish
        const notes = [3800, 3400, 3600, 3100, 2900];
        notes.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const st = now + 0.65 + idx * 0.09;
          const dur = 0.08;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, st);
          osc.frequency.exponentialRampToValueAtTime(f - 150, st + dur);

          gain.gain.setValueAtTime(0.001, st);
          gain.gain.linearRampToValueAtTime(0.2, st + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, st + dur);

          osc.connect(gain);
          gain.connect(this.masterGain!);
          osc.start(st);
          osc.stop(st + dur + 0.02);
        });
        setTimeout(() => {
          if (this.activeBird === 'warbler') {
            this.activeBird = null;
            this.notify();
          }
        }, 1300);
        break;
      }

      case 'tit': {
        // Varied Tit / Great Tit cheerful double bell
        const pairs = [
          { f1: 3200, f2: 2700 },
          { f1: 3400, f2: 2850 },
          { f1: 3300, f2: 2750 },
        ];
        pairs.forEach((pair, pIdx) => {
          const pStart = now + pIdx * 0.28;

          // Note 1
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(pair.f1, pStart);
          gain1.gain.setValueAtTime(0.001, pStart);
          gain1.gain.linearRampToValueAtTime(0.22, pStart + 0.02);
          gain1.gain.exponentialRampToValueAtTime(0.001, pStart + 0.1);
          osc1.connect(gain1);
          gain1.connect(this.masterGain!);
          osc1.start(pStart);
          osc1.stop(pStart + 0.12);

          // Note 2
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          const s2 = pStart + 0.11;
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(pair.f2, s2);
          gain2.gain.setValueAtTime(0.001, s2);
          gain2.gain.linearRampToValueAtTime(0.2, s2 + 0.02);
          gain2.gain.exponentialRampToValueAtTime(0.001, s2 + 0.12);
          osc2.connect(gain2);
          gain2.connect(this.masterGain!);
          osc2.start(s2);
          osc2.stop(s2 + 0.14);
        });
        setTimeout(() => {
          if (this.activeBird === 'tit') {
            this.activeBird = null;
            this.notify();
          }
        }, 1100);
        break;
      }

      case 'magpie': {
        // Eurasian Magpie: 3 sharp metallic chatter bursts
        for (let i = 0; i < 4; i++) {
          const st = now + i * 0.12;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(1400, st);
          osc.frequency.linearRampToValueAtTime(950, st + 0.08);

          gain.gain.setValueAtTime(0.001, st);
          gain.gain.linearRampToValueAtTime(0.25, st + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, st + 0.09);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(st);
          osc.stop(st + 0.1);
        }
        setTimeout(() => {
          if (this.activeBird === 'magpie') {
            this.activeBird = null;
            this.notify();
          }
        }, 700);
        break;
      }

      case 'heron': {
        // Grey Heron: Deep guttural river rasp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(210, now + 0.35);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.26, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.45);
        setTimeout(() => {
          if (this.activeBird === 'heron') {
            this.activeBird = null;
            this.notify();
          }
        }, 600);
        break;
      }

      case 'woodpecker': {
        // Tree drumming: rapid wood taps
        for (let i = 0; i < 9; i++) {
          const t = now + i * 0.045;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(650 - i * 15, t);
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.24, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.04);
        }
        setTimeout(() => {
          if (this.activeBird === 'woodpecker') {
            this.activeBird = null;
            this.notify();
          }
        }, 600);
        break;
      }

      case 'kingfisher': {
        // Kingfisher: high sharp piercing whistle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4800, now);
        osc.frequency.exponentialRampToValueAtTime(5400, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(4200, now + 0.16);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.26, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.2);
        setTimeout(() => {
          if (this.activeBird === 'kingfisher') {
            this.activeBird = null;
            this.notify();
          }
        }, 350);
        break;
      }
    }
  }

  // --- Soundscape Loop Scheduling ---

  private startTrackLoops(track: SoundscapeId) {
    this.stopTrackLoops();

    switch (track) {
      case 'forest': {
        this.makeWind(420, 0.22, 1.2);
        this.playBirdCall('tit');
        const interval = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.45) this.playBirdCall('tit');
          else if (r > 0.15) this.playBirdCall('warbler');
          else this.playBirdCall('dove');
        }, 3400);
        this.loopIntervals.push(interval);
        break;
      }

      case 'river': {
        this.makeWind(550, 0.24, 0.9);
        const waterInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          this.triggerWaterDrop();
          if (Math.random() > 0.5) {
            setTimeout(() => this.triggerWaterDrop(), 120);
          }
        }, 700);
        this.loopIntervals.push(waterInt);

        const birdInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.6) this.playBirdCall('heron');
          else if (r > 0.3) this.playBirdCall('kingfisher');
          else this.playBirdCall('tit');
        }, 4200);
        this.loopIntervals.push(birdInt);
        break;
      }

      case 'twilight': {
        this.makeWind(320, 0.18, 1.4);
        const cricketInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          if (Math.random() > 0.2) this.triggerCricket();
        }, 1200);
        this.loopIntervals.push(cricketInt);

        const doveInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          if (Math.random() > 0.3) this.playBirdCall('dove');
        }, 4600);
        this.loopIntervals.push(doveInt);
        break;
      }

      case 'campus': {
        this.makeWind(360, 0.2, 1.0);
        this.playBirdCall('magpie');
        const campInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.5) this.playBirdCall('magpie');
          else if (r > 0.2) this.playBirdCall('tit');
          else this.playBirdCall('dove');
        }, 3000);
        this.loopIntervals.push(campInt);
        break;
      }

      case 'rain': {
        this.makeRain(0.28);
        this.makeWind(260, 0.14, 0.8);
        const rainBirdInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          if (Math.random() > 0.6) this.playBirdCall('tit');
        }, 5500);
        this.loopIntervals.push(rainBirdInt);
        break;
      }

      case 'autumn': {
        this.makeWind(480, 0.26, 1.6);
        const waterDropInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          this.triggerWaterDrop();
        }, 1100);
        this.loopIntervals.push(waterDropInt);

        const autBirdInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.5) this.playBirdCall('warbler');
          else this.playBirdCall('woodpecker');
        }, 4000);
        this.loopIntervals.push(autBirdInt);
        break;
      }
    }
  }

  private stopTrackLoops() {
    this.ambientSourceNodes.forEach((node) => {
      try {
        (node as AudioScheduledSourceNode).stop?.();
      } catch {
        // ignore
      }
    });
    this.ambientSourceNodes = [];

    this.loopIntervals.forEach((id) => clearInterval(id));
    this.loopIntervals = [];
  }

  // --- Public Controls ---

  public async setTrack(trackId: SoundscapeId) {
    this.currentTrack = trackId;
    if (this.isPlaying) {
      this.startTrackLoops(trackId);
    }
    this.notify();
  }

  public async toggle(): Promise<boolean> {
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (this.isPlaying) {
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2);
      }
      this.stopTrackLoops();
      this.isPlaying = false;
      this.notify();
      return false;
    } else {
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      }
      this.isPlaying = true;
      this.startTrackLoops(this.currentTrack);
      this.notify();
      return true;
    }
  }

  public async play(): Promise<boolean> {
    if (!this.isPlaying) {
      return this.toggle();
    }
    return true;
  }

  public pause() {
    if (this.isPlaying) {
      this.toggle();
    }
  }
}

export const ambianceAudio = new SoundscapeEngine();
