/**
 * Comprehensive Web Audio Engine for Wing Watchers.
 * 
 * Features:
 * 1. 9 Rich Immersive Nature Soundscapes (Pine Forest, River Reeds, Twilight, Campus, Spring Rain, Autumn Stream, Night Owl, Wetland, Winter Snowfield)
 * 2. 12 Authentic Bird Call Synthesizers (Dove, Warbler, Tit, Magpie, Heron, Woodpecker, Kingfisher, Sparrow, Bulbul, Tawny Owl, Swallow, Pheasant)
 * 3. Separate Audio Buses: soundscapeGain and birdCallGain routed into masterGain, preventing muting collisions
 * 4. Automatic Web Audio resume on user gesture
 */

export type SoundscapeId =
  | 'forest'
  | 'river'
  | 'twilight'
  | 'campus'
  | 'rain'
  | 'autumn'
  | 'night_owl'
  | 'wetland'
  | 'winter';

export type BirdCallId =
  | 'dove'
  | 'warbler'
  | 'tit'
  | 'magpie'
  | 'heron'
  | 'woodpecker'
  | 'kingfisher'
  | 'sparrow'
  | 'bulbul'
  | 'owl'
  | 'swallow'
  | 'pheasant';

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
  habitat: 'campus' | 'forest' | 'water' | 'mountain';
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
  {
    id: 'night_owl',
    titleEn: 'Night Owl Stargazing',
    titleKr: '밤하늘 별빛과 올빼미',
    icon: '🦉',
    descriptionEn: 'Deep calm night air with gentle mountain wind, crickets, and deep owl hoots.',
    descriptionKr: '고요한 한밤중 산자락의 시원한 밤바람과 별빛 아래 울려 퍼지는 올빼미 소리.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'wetland',
    titleEn: 'Sunny Wetland Chorus',
    titleKr: '햇살 가득한 습지 오케스트라',
    icon: '🦆',
    descriptionEn: 'Warm sunny wetlands with gentle ripples, reed chatter, and swallows overhead.',
    descriptionKr: '따스한 오후 습지 갈대밭 사이로 날아드는 제비들과 활기찬 물총새의 날갯짓.',
    durationHint: 'Continuous loop',
  },
  {
    id: 'winter',
    titleEn: 'Winter Snowfield Silence',
    titleKr: '눈 덮인 고요한 숲길',
    icon: '❄️',
    descriptionEn: 'Crisp, crystal-clear cold mountain breeze with distant woodland birds.',
    descriptionKr: '새하얗게 눈 덮인 겨울 산책로의 청명하고 차분한 솔바람과 작은 새들의 교감.',
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
    habitat: 'campus',
  },
  {
    id: 'warbler',
    nameEn: 'Korean Bush Warbler',
    nameKr: '휘파람새',
    phonetic: 'Hweet... kyo-kyo-kyo (휘-익 호호호)',
    descriptionEn: 'Incredible bell-like melodic spring song carrying through bamboo and thickets.',
    descriptionKr: '봄철 덤불 숲을 맑게 깨우는 유려한 고음의 휘파람 노랫소리.',
    habitat: 'forest',
  },
  {
    id: 'tit',
    nameEn: 'Varied Tit & Great Tit',
    nameKr: '곤줄박이 & 박새',
    phonetic: 'Tsipi-tsipi-tsipi (찌삐-찌삐)',
    descriptionEn: 'Cheerful energetic double-note whistle high in pine crowns.',
    descriptionKr: '소나무 가지 끝에서 짝을 부르는 발랄하고 청아한 2음절의 종소리.',
    habitat: 'forest',
  },
  {
    id: 'magpie',
    nameEn: 'Eurasian Magpie',
    nameKr: '까치',
    phonetic: 'Chack-chack-chack (깍- 깍- 깍)',
    descriptionEn: 'Bold metallic territorial call of Daejeon’s familiar intelligent bird.',
    descriptionKr: '교정 잔디밭을 성큼성큼 걸으며 영역을 알리는 카랑카랑하고 반가운 소리.',
    habitat: 'campus',
  },
  {
    id: 'heron',
    nameEn: 'Grey Heron',
    nameKr: '왜가리',
    phonetic: 'Fraaank... (콰-악)',
    descriptionEn: 'Low, guttural river call as it takes flight over Gapcheon stream.',
    descriptionKr: '갑천 얕은 여울에서 큰 날개를 펴고 비상할 때 울리는 낮고 묵직한 외침.',
    habitat: 'water',
  },
  {
    id: 'woodpecker',
    nameEn: 'Japanese Pygmy Woodpecker',
    nameKr: '쇠딱따구리',
    phonetic: 'Drrrr-tok-tok (또르르륵 목탁 소리)',
    descriptionEn: 'Rapid rhythmic tree drumming on hollow branches in Uam park.',
    descriptionKr: '고목 껍질을 쪼아 곤충을 찾을 때 숲에 울려 퍼지는 경쾌한 연속 드럼 소리.',
    habitat: 'forest',
  },
  {
    id: 'kingfisher',
    nameEn: 'Common Kingfisher',
    nameKr: '물총새',
    phonetic: 'Peet-peet! (찌잇- 찌잇!)',
    descriptionEn: 'High, sharp piercing arrow call skimming inches above the river surface.',
    descriptionKr: '수면 위를 푸른 보석처럼 쏜살같이 활공하며 내는 날카롭고 맑은 호각 소리.',
    habitat: 'water',
  },
  {
    id: 'sparrow',
    nameEn: 'Eurasian Tree Sparrow',
    nameKr: '참새',
    phonetic: 'Chirp-chirp-cheep (짹- 짹- 짹)',
    descriptionEn: 'Bright, lively rhythmic chirping of campus flocks in spring gardens.',
    descriptionKr: '우송대 도서관 앞 정원에서 옹기종기 모여 재잘거리는 친근한 참새 소리.',
    habitat: 'campus',
  },
  {
    id: 'bulbul',
    nameEn: 'Brown-eared Bulbul',
    nameKr: '직박구리',
    phonetic: 'Pee-yoo-kwee (삐이이-익)',
    descriptionEn: 'Loud, piercing whistle resonating through fruit trees and campus canopies.',
    descriptionKr: '동백나무와 감나무 가지 사이를 넘나들며 우렁차게 내지르는 날카로운 소리.',
    habitat: 'campus',
  },
  {
    id: 'owl',
    nameEn: 'Korean Tawny Owl',
    nameKr: '올빼미',
    phonetic: 'Hooo-hu-hu-hooo (우우- 후- 후- 우)',
    descriptionEn: 'Deep, resonant nocturnal coo in ancient Sikjangsan temple woodlands.',
    descriptionKr: '식장산 깊은 숲속 고목에 깃들어 고요한 밤을 지키는 묵직하고 신비로운 부엉이 울음.',
    habitat: 'mountain',
  },
  {
    id: 'swallow',
    nameEn: 'Barn Swallow',
    nameKr: '제비',
    phonetic: 'Jjirrr-wit-wit (지지배배- 짹짹)',
    descriptionEn: 'Rapid melodic chatter of swift migratory swoopers returning each spring.',
    descriptionKr: '강남 갔던 제비가 돌아와 처마 밑을 맴돌며 지저귀는 경쾌한 봄의 전령 소리.',
    habitat: 'campus',
  },
  {
    id: 'pheasant',
    nameEn: 'Ring-necked Pheasant',
    nameKr: '꿩 (장끼)',
    phonetic: 'Kkwo-kkwo-kkwong! (꿩- 꿩- 파드득)',
    descriptionEn: 'Resonant rustic crow followed by a sudden flurry of powerful wings.',
    descriptionKr: '보문산 자락 풀숲에서 장끼가 힘차게 울며 날갯짓하는 박력 있는 야생의 소리.',
    habitat: 'mountain',
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
  private soundscapeGain: GainNode | null = null;
  private birdCallGain: GainNode | null = null;

  private isPlaying: boolean = false;
  private currentTrack: SoundscapeId = 'forest';
  private volume: number = 0.7;
  private activeBird: BirdCallId | null = null;

  private ambientSourceNodes: AudioNode[] = [];
  private loopIntervals: number[] = [];
  private listeners: AudioListener[] = [];

  private ensureAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // 1. Master Output Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // 2. Soundscape Background Bus
        this.soundscapeGain = this.ctx.createGain();
        this.soundscapeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        this.soundscapeGain.connect(this.masterGain);

        // 3. Bird Calls Bus (Always full throughput into masterGain)
        this.birdCallGain = this.ctx.createGain();
        this.birdCallGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
        this.birdCallGain.connect(this.masterGain);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
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
    const ctx = this.ensureAudioContext();
    if (ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.05);
    }
    this.notify();
  }

  // --- Soundscape Loop Synthesizers ---

  private makeWind(freq: number, gainLevel: number, q: number = 1.0): AudioNode | null {
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.soundscapeGain) return null;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.14;
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
    gainNode.connect(this.soundscapeGain);

    noise.start();
    this.ambientSourceNodes.push(noise);
    return noise;
  }

  private makeRain(intensity: number = 0.25): AudioNode | null {
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.soundscapeGain) return null;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.18;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1450, ctx.currentTime);
    filter.Q.setValueAtTime(0.85, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(intensity, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.soundscapeGain);

    noise.start();
    this.ambientSourceNodes.push(noise);
    return noise;
  }

  private triggerWaterDrop() {
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.soundscapeGain) return;
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
    gain.connect(this.soundscapeGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  private triggerCricket() {
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.soundscapeGain) return;
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.05;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4600 + Math.random() * 300, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(gain);
      gain.connect(this.soundscapeGain);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  }

  // --- 12 Realistic Synthesized Bird Calls ---

  public async playBirdCall(birdId: BirdCallId) {
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.birdCallGain) return;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }

    this.activeBird = birdId;
    this.notify();

    setTimeout(() => {
      if (this.activeBird === birdId) {
        this.activeBird = null;
        this.notify();
      }
    }, 1800);

    const now = ctx.currentTime;
    const dest = this.birdCallGain;

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
          gain.connect(dest);
          osc.start(st);
          osc.stop(st + dur);
        });
        break;
      }

      case 'warbler': {
        // Korean Bush Warbler: Rising slide whistle + fast trills
        const slide = ctx.createOscillator();
        const sGain = ctx.createGain();
        slide.type = 'sine';
        slide.frequency.setValueAtTime(2600, now);
        slide.frequency.exponentialRampToValueAtTime(3800, now + 0.45);

        sGain.gain.setValueAtTime(0.0001, now);
        sGain.gain.linearRampToValueAtTime(0.22, now + 0.1);
        sGain.gain.linearRampToValueAtTime(0.18, now + 0.35);
        sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

        slide.connect(sGain);
        sGain.connect(dest);
        slide.start(now);
        slide.stop(now + 0.5);

        // Trill burst
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const t = now + 0.55 + i * 0.08;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(3200 + (i % 2) * 300, t);
          osc.frequency.exponentialRampToValueAtTime(2500, t + 0.06);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

          osc.connect(g);
          g.connect(dest);
          osc.start(t);
          osc.stop(t + 0.07);
        }
        break;
      }

      case 'tit': {
        // Varied Tit / Great Tit: "Tsipi-tsipi" cheerful high whistles
        for (let i = 0; i < 3; i++) {
          const t1 = now + i * 0.28;
          const osc1 = ctx.createOscillator();
          const g1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(3900, t1);
          osc1.frequency.linearRampToValueAtTime(4250, t1 + 0.07);

          g1.gain.setValueAtTime(0.0001, t1);
          g1.gain.linearRampToValueAtTime(0.22, t1 + 0.015);
          g1.gain.exponentialRampToValueAtTime(0.0001, t1 + 0.08);

          osc1.connect(g1);
          g1.connect(dest);
          osc1.start(t1);
          osc1.stop(t1 + 0.09);

          const t2 = t1 + 0.1;
          const osc2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(3400, t2);
          osc2.frequency.linearRampToValueAtTime(3100, t2 + 0.08);

          g2.gain.setValueAtTime(0.0001, t2);
          g2.gain.linearRampToValueAtTime(0.2, t2 + 0.015);
          g2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.09);

          osc2.connect(g2);
          g2.connect(dest);
          osc2.start(t2);
          osc2.stop(t2 + 0.1);
        }
        break;
      }

      case 'magpie': {
        // Eurasian Magpie: 3 sharp metallic chatter bursts
        for (let burst = 0; burst < 3; burst++) {
          const st = now + burst * 0.24;
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const g = ctx.createGain();

          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(1450, st);
          osc1.frequency.exponentialRampToValueAtTime(950, st + 0.12);

          osc2.type = 'square';
          osc2.frequency.setValueAtTime(2150, st);
          osc2.frequency.exponentialRampToValueAtTime(1400, st + 0.12);

          g.gain.setValueAtTime(0.0001, st);
          g.gain.linearRampToValueAtTime(0.18, st + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, st + 0.12);

          osc1.connect(g);
          osc2.connect(g);
          g.connect(dest);

          osc1.start(st);
          osc2.start(st);
          osc1.stop(st + 0.13);
          osc2.stop(st + 0.13);
        }
        break;
      }

      case 'heron': {
        // Grey Heron: Deep low guttural river croak
        const osc = ctx.createOscillator();
        const noise = ctx.createBufferSource();
        const b = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.4;
        noise.buffer = b;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(520, now);
        filter.Q.setValueAtTime(2.2, now);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(210, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

        osc.connect(gain);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.4);
        noise.stop(now + 0.4);
        break;
      }

      case 'woodpecker': {
        // Japanese Pygmy Woodpecker: Rapid hollow tree drumming
        for (let i = 0; i < 9; i++) {
          const t = now + i * 0.045;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(820, t);
          osc.frequency.exponentialRampToValueAtTime(340, t + 0.035);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.25 - i * 0.015, t + 0.005);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

          osc.connect(g);
          g.connect(dest);
          osc.start(t);
          osc.stop(t + 0.04);
        }
        break;
      }

      case 'kingfisher': {
        // Common Kingfisher: High shrill arrow whistle skimming water
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4400, now);
        osc.frequency.linearRampToValueAtTime(4900, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(3900, now + 0.18);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.25, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(g);
        g.connect(dest);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      case 'sparrow': {
        // Eurasian Tree Sparrow: Cheerful double chirps
        for (let i = 0; i < 2; i++) {
          const t = now + i * 0.14;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(3200, t);
          osc.frequency.linearRampToValueAtTime(4500, t + 0.04);
          osc.frequency.exponentialRampToValueAtTime(2800, t + 0.08);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.22, t + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

          osc.connect(g);
          g.connect(dest);
          osc.start(t);
          osc.stop(t + 0.09);
        }
        break;
      }

      case 'bulbul': {
        // Brown-eared Bulbul: Piercing energetic "Pee-yo"
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.linearRampToValueAtTime(3600, now + 0.09);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.28);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.24, now + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

        osc.connect(g);
        g.connect(dest);
        osc.start(now);
        osc.stop(now + 0.32);
        break;
      }

      case 'owl': {
        // Korean Tawny Owl: Deep resonant hollow "Whoo-hu-whoo"
        const delays = [0, 0.38, 0.58, 0.85];
        const freqs = [320, 290, 290, 310];
        const durs = [0.3, 0.15, 0.15, 0.45];

        delays.forEach((delay, idx) => {
          const t = now + delay;
          const dur = durs[idx];
          const osc = ctx.createOscillator();
          const g = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freqs[idx], t);
          osc.frequency.exponentialRampToValueAtTime(freqs[idx] - 30, t + dur);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.26, t + 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

          osc.connect(g);
          g.connect(dest);
          osc.start(t);
          osc.stop(t + dur + 0.02);
        });
        break;
      }

      case 'swallow': {
        // Barn Swallow: Rapid playful twitter and high trills
        for (let i = 0; i < 4; i++) {
          const t = now + i * 0.09;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(4200 - i * 150, t);
          osc.frequency.linearRampToValueAtTime(5400, t + 0.04);
          osc.frequency.exponentialRampToValueAtTime(3600, t + 0.07);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.2, t + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

          osc.connect(g);
          g.connect(dest);
          osc.start(t);
          osc.stop(t + 0.08);
        }
        break;
      }

      case 'pheasant': {
        // Ring-necked Pheasant: "Kkwo-kkwo-kkwong!" loud double-crow
        for (let i = 0; i < 2; i++) {
          const t = now + i * 0.18;
          const osc = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const g = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(740, t);
          osc.frequency.exponentialRampToValueAtTime(480, t + 0.12);

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1480, t);
          osc2.frequency.exponentialRampToValueAtTime(960, t + 0.12);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.22, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

          osc.connect(g);
          osc2.connect(g);
          g.connect(dest);

          osc.start(t);
          osc2.start(t);
          osc.stop(t + 0.15);
          osc2.stop(t + 0.15);
        }
        break;
      }
    }
  }

  // --- Soundscape Loop Orchestration ---

  private startTrackLoops(track: SoundscapeId) {
    this.stopTrackLoops();
    const ctx = this.ensureAudioContext();
    if (!ctx || !this.soundscapeGain) return;

    // Smoothly fade soundscape bus in
    this.soundscapeGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.soundscapeGain.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 0.3);

    switch (track) {
      case 'forest': {
        this.makeWind(420, 0.22, 1.2);
        this.playBirdCall('tit');
        const interval = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.5) this.playBirdCall('tit');
          else if (r > 0.25) this.playBirdCall('warbler');
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
          else this.playBirdCall('swallow');
        }, 4000);
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
          if (Math.random() > 0.4) this.playBirdCall('dove');
          else this.playBirdCall('owl');
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
          if (r > 0.6) this.playBirdCall('sparrow');
          else if (r > 0.3) this.playBirdCall('magpie');
          else this.playBirdCall('bulbul');
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

      case 'night_owl': {
        this.makeWind(300, 0.16, 1.3);
        const nightCricket = window.setInterval(() => {
          if (!this.isPlaying) return;
          this.triggerCricket();
        }, 1500);
        this.loopIntervals.push(nightCricket);

        this.playBirdCall('owl');
        const owlInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          this.playBirdCall('owl');
        }, 5000);
        this.loopIntervals.push(owlInt);
        break;
      }

      case 'wetland': {
        this.makeWind(500, 0.22, 1.0);
        const waterWetland = window.setInterval(() => {
          if (!this.isPlaying) return;
          this.triggerWaterDrop();
        }, 900);
        this.loopIntervals.push(waterWetland);

        const wetBirdInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.5) this.playBirdCall('swallow');
          else if (r > 0.25) this.playBirdCall('kingfisher');
          else this.playBirdCall('heron');
        }, 3600);
        this.loopIntervals.push(wetBirdInt);
        break;
      }

      case 'winter': {
        this.makeWind(340, 0.2, 1.8);
        const winterInt = window.setInterval(() => {
          if (!this.isPlaying) return;
          const r = Math.random();
          if (r > 0.5) this.playBirdCall('pheasant');
          else this.playBirdCall('tit');
        }, 4800);
        this.loopIntervals.push(winterInt);
        break;
      }
    }
  }

  private stopTrackLoops() {
    const ctx = this.ctx;
    if (ctx && this.soundscapeGain) {
      this.soundscapeGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    }

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
    const ctx = this.ensureAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }

    if (this.isPlaying) {
      this.stopTrackLoops();
      this.isPlaying = false;
      this.notify();
      return false;
    } else {
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
