export default function About() {
  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#8a4b42]">
            About Us
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#2e0003] md:text-6xl">
            About Desi Zaika
          </h1>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#2e0003]" />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-[1.4fr_0.6fr]">

          {/* Original Content */}
          <div className="rounded-[2rem] bg-white p-7 shadow-sm md:p-10">

            <p className="mb-5 text-xl font-medium leading-8 text-[#2e0003] md:text-2xl">
              Welcome to Desi Zaika - your premium Indian spices destination
            </p>

            <p className="mb-5 text-base leading-7 text-gray-600 md:text-lg">
              We bring authentic, premium quality Indian spices directly to
              your door. Our mission is to preserve the traditional flavors of
              Indian cuisine while ensuring the highest quality standards.
            </p>

            <p className="text-base leading-7 text-gray-600 md:text-lg">
              Each spice is carefully sourced and packaged to maintain its
              freshness and potency. Experience the real taste of India with
              Desi Zaika!
            </p>

          </div>

          {/* Modern Highlight */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#2e0003] p-8 text-white md:p-10">

            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10" />

            <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative">
              <div className="mb-8 text-4xl">
                ✦
              </div>

              <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
                Authentic taste,
                <br />
                made for home.
              </h2>

              <p className="mt-5 text-sm leading-6 text-white/65">
                Quality spices, traditional flavours and the taste of India in
                every meal.
              </p>
            </div>

          </div>
        </div>

        {/* Values */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-3xl border border-[#ded4c5] bg-white/70 p-6 backdrop-blur">
            <span className="text-sm font-semibold text-[#8a4b42]">
              01
            </span>

            <h3 className="mt-4 text-lg font-semibold text-[#2e0003]">
              Authentic
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Traditional Indian flavours
            </p>
          </div>

          <div className="rounded-3xl border border-[#ded4c5] bg-white/70 p-6 backdrop-blur">
            <span className="text-sm font-semibold text-[#8a4b42]">
              02
            </span>

            <h3 className="mt-4 text-lg font-semibold text-[#2e0003]">
              Premium
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Carefully sourced spices
            </p>
          </div>

          <div className="rounded-3xl border border-[#ded4c5] bg-white/70 p-6 backdrop-blur">
            <span className="text-sm font-semibold text-[#8a4b42]">
              03
            </span>

            <h3 className="mt-4 text-lg font-semibold text-[#2e0003]">
              Fresh
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Packed to preserve quality
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}