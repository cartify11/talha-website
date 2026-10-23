import fs from 'fs';
import path from 'path';

function createWavFile(filename, durationSec, generator) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * durationSec);
  const blockAlign = 2; // 16-bit mono
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = generator(t);
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// 1. Concrete Crash & Sub-bass Impact (Duration: 2.5s)
createWavFile('public/assets/sounds/concrete-impact.wav', 2.5, (t) => {
  const subFreq = Math.max(35, 120 * Math.exp(-t * 6));
  const sub = Math.sin(2 * Math.PI * subFreq * t) * Math.exp(-t * 3.5) * 0.75;
  const transient = t < 0.08 ? (Math.random() * 2 - 1) * Math.exp(-t * 40) * 0.95 : 0;
  const crunchDecay = Math.exp(-t * 4.5);
  const crunchNoise = (Math.random() * 2 - 1) * crunchDecay * 0.5;
  const crunchRes = Math.sin(2 * Math.PI * 180 * t) * crunchDecay * 0.35;
  return sub + transient + crunchNoise + crunchRes;
});

// 2. Stone Cracking & Fracturing (Duration: 2.0s)
createWavFile('public/assets/sounds/stone-crack.wav', 2.0, (t) => {
  let val = 0;
  const snapTimes = [0.04, 0.15, 0.28, 0.48, 0.72, 0.98, 1.25, 1.55];
  for (const st of snapTimes) {
    if (t >= st && t < st + 0.08) {
      const dt = t - st;
      const snap = (Math.random() * 2 - 1) * Math.exp(-dt * 65);
      const tone = Math.sin(2 * Math.PI * 920 * dt) * Math.exp(-dt * 50);
      val += (snap * 0.75 + tone * 0.45);
    }
  }
  val += (Math.random() * 2 - 1) * 0.08 * Math.exp(-t * 1.5);
  return val;
});

// 3. Cinematic Opening Rumble (Duration: 2.0s)
createWavFile('public/assets/sounds/cinematic-rumble.wav', 2.0, (t) => {
  const amp = Math.min(1, t / 0.8) * Math.max(0, 1 - (t - 1.5) / 0.5);
  const f1 = Math.sin(2 * Math.PI * 45 * t);
  const f2 = Math.sin(2 * Math.PI * 30 * t) * 0.6;
  const f3 = Math.sin(2 * Math.PI * 90 * t) * 0.25;
  const texture = (Math.random() * 2 - 1) * 0.04;
  return (f1 + f2 + f3 + texture) * amp * 0.5;
});
