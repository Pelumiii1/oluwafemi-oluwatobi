import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col">
      {/* Grid background */}
      <img
        src="/Background pattern decorative.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover mix-blend-multiply top-[-150px]"
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center space-x-50 px-8 md:px-16 py-6 font-serif text-[11px] text-black lg:text-[14px]">
        <div className="flex items-center gap-2 tracking-[0.18em] uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          Portfolio / In Progress
        </div>
        <div className="tracking-[0.14em] uppercase">
          Oluwafemi&nbsp;|&nbsp;Product Designer
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Subtitle */}
        <p className="font-serif text-sm lg:text-[20px] tracking-wide text-[#1E1812] mb-6">
          Estimated launch — coming soon
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-[65px] md:text-6xl font-serif font-normal leading-tight tracking-tight text-foreground max-w-2xl mb-5">
          My portfolio is still
          <br />
          <span className="italic text-accent font-normal">
            being designed.
          </span>
        </h1>

        {/* Description */}
        <p
          className="max-w-lg text-base lg:text-[20px] text-[#1E1812] leading-relaxed mb-30 font-rounded"
        >
          I&apos;m putting the finishing touches on a new space to share my
          work, case studies, experiments, and everything in between.
        </p>

        {/* Card */}
        <div className="w-full max-w-xl mx-auto">
          <Image
            src="/card.gif"
            alt="Portfolio builder in progress"
            className="w-full rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            width={100}
            height={100}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center">
        <p className="text-sm lg:text-[16px] font-medium text-black font-serif tracking-wide">
          Come back soon
        </p>
      </footer>
    </div>
  );
}
