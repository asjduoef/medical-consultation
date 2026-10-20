'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Rotate3D } from 'lucide-react';

const joints = [
  { name: 'Knee', detail: 'Femur, patella, tibia and cartilage', pos: '0% 0%' },
  { name: 'Spine', detail: 'Vertebrae and intervertebral discs', pos: '50% 0%' },
  { name: 'Ankle', detail: 'Ankle joint and foot bones', pos: '100% 0%' },
  { name: 'Shoulder', detail: 'Shoulder joint and surrounding ligaments', pos: '0% 100%' },
  { name: 'Neck', detail: 'Cervical vertebrae', pos: '50% 100%' },
  { name: 'Hip', detail: 'Pelvis and hip joint', pos: '100% 100%' },
];

type Point = { x: number; y: number };

export function JointViewerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: -5, y: 0 });
  const lastPoint = useRef<Point>({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);
  const joint = joints[activeIndex];

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    activePointer.current = event.pointerId;
    lastPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;
    setRotation((r) => ({ x: Math.max(-28, Math.min(28, r.x - dy * 0.45)), y: r.y + dx * 0.65 }));
    lastPoint.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const selectJoint = (i: number) => { setActiveIndex(i); setRotation({ x: -5, y: 0 }); };
  const next = () => selectJoint((activeIndex + 1) % joints.length);
  const previous = () => selectJoint((activeIndex - 1 + joints.length) % joints.length);

  return (
    <section id="joints" className="scroll-mt-16 bg-gradient-to-br from-[#edf4fb] via-[#f9fbfe] to-[#f8eaf0] py-16 text-[#173451] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d94d78]">Inside your movement</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Explore the joints we care for</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#50657b]">Choose an anatomical diagram, then drag the image with your mouse or finger to tilt it in 3D space.</p>
        </div>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div
            className="relative flex min-h-[22rem] touch-none cursor-grab items-center justify-center overflow-hidden rounded-[2rem] border border-[#cbd9e8] bg-white p-6 shadow-[0_24px_70px_rgba(23,52,81,.13)] active:cursor-grabbing sm:min-h-[29rem]"
            onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
            aria-label={`Interactive ${joint.name} anatomical diagram. Drag to tilt.`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,231,245,.65),transparent_65%)]" />
            <div className="relative h-64 w-64 sm:h-80 sm:w-80" style={{ perspective: '1000px' }}>
              <div
                className="h-full w-full rounded-3xl shadow-[0_24px_45px_rgba(23,52,81,.18)] transition-transform duration-75"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  backgroundImage: "url('/joint-anatomy-atlas.png')",
                  backgroundSize: '300% 200%',
                  backgroundPosition: joint.pos,
                  backgroundRepeat: 'no-repeat',
                  border: '6px solid white',
                  outline: '1px solid #cbd9e8',
                }}
                role="img" aria-label={`${joint.name}: ${joint.detail}`}
              />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#173451] px-3 py-2 text-xs font-bold text-white shadow">
              <Rotate3D className="h-4 w-4" /> Drag to rotate
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-[#f8eaf0] px-3 py-1 text-xs font-bold text-[#a82d58]">3D-style anatomy</div>
          </div>
          <div>
            <div className="rounded-3xl border border-[#d8e3ee] bg-white p-6 shadow-[0_18px_50px_rgba(23,52,81,.08)] sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d94d78]">Selected anatomy</p>
              <h3 className="mt-2 text-3xl font-black text-[#173451]">{joint.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-[#50657b]">{joint.detail}. The diagram is for general education and does not diagnose an individual condition.</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button type="button" onClick={previous} className="inline-flex items-center gap-2 rounded-full border border-[#cbd9e8] px-4 py-2.5 text-sm font-bold text-[#21496e] transition hover:bg-[#edf4fb]"><ChevronLeft className="h-4 w-4" /> Previous</button>
                <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-[#21496e] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#173451]">Next <ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {joints.map((item, index) => (
                <button key={item.name} type="button" onClick={() => selectJoint(index)} aria-pressed={index === activeIndex}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${index === activeIndex ? 'border-[#21496e] bg-[#21496e] text-white shadow-md' : 'border-[#d8e3ee] bg-white text-[#21496e] hover:border-[#d94d78] hover:bg-[#fff7fa]'}`}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
