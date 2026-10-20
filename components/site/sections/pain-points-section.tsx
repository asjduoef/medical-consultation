const painPoints = [
  {
    label: 'Back',
    detail: 'Lumbar spine',
    position: 'left',
    alt: 'South Asian man holding his lower back with a highlighted lumbar spine',
  },
  {
    label: 'Cervical / Neck',
    detail: 'Cervical spine',
    position: 'center',
    alt: 'South Asian woman holding her neck with the cervical spine highlighted',
  },
  {
    label: 'Knee',
    detail: 'Knee joint',
    position: 'right',
    alt: 'South Asian man holding his knee with the knee joint highlighted',
  },
];

function PainCard({ point, featured = false }: { point: (typeof painPoints)[number]; featured?: boolean }) {
  const position = point.position === 'left' ? '0% center' : point.position === 'center' ? '50% center' : '100% center';
  return (
    <article className={`group relative isolate overflow-hidden rounded-[1.5rem] border border-[#d9e2ed] bg-white shadow-[0_18px_50px_rgba(25,48,76,.13)] ${featured ? 'min-h-[28rem] md:min-h-[35rem]' : 'min-h-[14rem] md:min-h-[16.5rem]'}`}>
      <div
        role="img"
        aria-label={point.alt}
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
        style={{
          backgroundImage: "url('/pain-zones-triptych.png')",
          backgroundSize: '300% 100%',
          backgroundPosition: position,
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#142c4a]/90 via-[#142c4a]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
        <span className="inline-flex rounded-full bg-[#e95c83] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">Pain area</span>
        <h3 className={`${featured ? 'mt-3 text-3xl sm:text-4xl' : 'mt-2 text-2xl'} font-black`}>{point.label}</h3>
        <p className="mt-1 text-sm font-medium text-white/85">{point.detail}</p>
      </div>
    </article>
  );
}

export function PainPointsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7faff] py-16 text-[#173451] sm:py-24">
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#f3cbd8]/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="max-w-xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d94d78]">Pain should not be your normal</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.06] tracking-tight text-[#173451] sm:text-5xl">Your body is telling you where it needs care.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#50657b]">Back, neck and knee pain can change how you work, sleep and move. Understand the area of discomfort and take the next step towards professional advice.</p>
            <div className="mt-7 flex items-center gap-3 text-sm font-bold text-[#294866]"><span className="h-3 w-3 rounded-full bg-[#e95c83]" /> Anatomical highlights indicate common pain areas</div>
            <p className="mt-5 text-xs leading-relaxed text-[#718198]">Illustrative medical imagery; highlighted areas do not diagnose a condition.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PainCard point={painPoints[0]} featured />
            <div className="grid gap-4">
              <PainCard point={painPoints[1]} />
              <PainCard point={painPoints[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
