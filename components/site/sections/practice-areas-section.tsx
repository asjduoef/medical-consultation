const practiceAreas = [
  { title: 'Spine & Back' },
  { title: 'Knee' },
  { title: 'Shoulder' },
  { title: 'Neck' },
  { title: 'Sports Injuries' },
  { title: 'Joint Pains' },
];

export function PracticeAreasSection() {
  return (
    <section id="practice-areas" className="scroll-mt-20 bg-[#f0f5fa] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#21496e]">Areas of practice</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17345d] sm:text-4xl">Treatment available for</h2>
          <p className="mt-4 text-lg text-[#53637a]">Focused orthopaedic consultation for Knee, Spine, Joints, and mobility concerns.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <div
              key={area.title}
              className="group flex min-h-[96px] items-center justify-center rounded-xl border border-[#d8e1eb] bg-white p-6 text-center shadow-[0_4px_12px_rgba(23,45,80,.045)] transition-all hover:-translate-y-1 hover:border-[#e50050]/40 hover:shadow-lg"
            >
              <h3 className="text-lg font-black text-[#17345d]">
                {area.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
