import { Bone, Footprints, Hand, Brain, Activity, HeartPulse } from 'lucide-react';

const practiceAreas = [
  { icon: <Bone className="h-5 w-5" />, title: 'Spine & Back', description: 'Consultation for lower back pain, herniated discs, degenerative disc disease, and spinal stenosis.', conditions: ['Lower back pain', 'Herniated discs', 'Spinal stenosis', 'Sciatica'] },
  { icon: <Footprints className="h-5 w-5" />, title: 'Knee', description: 'Assessment of Knee pain, Arthritis, cartilage issues, meniscus injuries, and degenerative joint conditions.', conditions: ['Knee Pain', 'Arthritis', 'cartilage damage', 'meniscus injuries'] },
  { icon: <Hand className="h-5 w-5" />, title: 'Shoulder', description: 'Evaluation of shoulder pain, rotator cuff injuries, frozen shoulder, and joint instability.', conditions: ['Rotator cuff injuries', 'Frozen shoulder', 'Joint instability', 'Tendinitis'] },
  { icon: <Brain className="h-5 w-5" />, title: 'Neck', description: 'Consultation for neck pain, cervical spondylitis, cervical disk and posture-related discomfort.', conditions: ['Neck pain', 'Cervical Spondylitis', 'Cervical disc', 'Posture problems'] },
  { icon: <Activity className="h-5 w-5" />, title: 'Sports Injuries', description: 'Assessment of sports-related musculoskeletal injuries and recovery planning.', conditions: ['Ligament injuries', 'Overuse injuries', 'Recovery planning', 'Rehabilitation'] },
  { icon: <HeartPulse className="h-5 w-5" />, title: 'Joint Health', description: 'General joint health assessment, arthritis management, and mobility improvement strategies.', conditions: ['Arthritis', 'Joint stiffness', 'Mobility issues', 'Pain management'] },
];

export function PracticeAreasSection() {
  return (
    <section id="practice-areas" className="scroll-mt-20 bg-[#f0f5fa] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-black uppercase tracking-[0.18em] text-[#21496e]">Areas of practice</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#17345d] sm:text-4xl">Care for the way you move</h2><p className="mt-4 text-lg text-[#53637a]">Focused orthopaedic consultation for Knee, Spine, Joints, and mobility concerns.</p></div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => <div key={area.title} className="group rounded-xl border border-[#d8e1eb] bg-white p-5 shadow-[0_4px_12px_rgba(23,45,80,.045)] transition-all hover:-translate-y-1 hover:border-[#e50050]/40 hover:shadow-lg"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#21496e] text-white">{area.icon}</div><h3 className="text-lg font-black text-[#17345d]">{area.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#53637a]">{area.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{area.conditions.map((condition) => <span key={condition} className="rounded-full bg-[#e6eef6] px-2.5 py-1 text-[11px] font-semibold text-[#24496c]">{condition}</span>)}</div></div>)}
        </div>
      </div>
    </section>
  );
}
