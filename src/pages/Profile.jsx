export default function About() {
  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#2e0003]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#8a4b42]">
              Our Story
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Real spices.
              <br />
              <span className="text-[#8a4b42]">Real taste.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Desi Zaika brings the authentic taste of Indian spices to your
              kitchen — carefully sourced, thoughtfully packed, and made to
              bring every meal closer to home.
            </p>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#d8c9b5] md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[#d8c9b5]" />
      </section>

      {/* Main Story */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Story Card */}
          <div className="rounded-[2rem] bg-[#2e0003] p-8 text-white md:p-12">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-[#d9b8a9]">
              Who We Are
            </p>

            <h2 className="max-w-lg text-3xl font-semibold leading-tight md:text-5xl">
              Bringing the heart of Indian kitchens to your home.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              At Desi Zaika, we believe that great food begins with great
              ingredients. Our focus is simple — authentic Indian spices,
              premium quality, freshness, and the familiar flavours that make
              every meal special.
            </p>
          </div>

          {/* Quality Card */}
          <div className="rounded-[2rem] border border-[#dfd5c8] bg-white p-8 md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e7da] text-2xl">
              ✦
            </div>

            <h2 className="mt-8 text-3xl font-semibold leading-tight md:text-4xl">
              Quality you can taste.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
              Every spice is carefully sourced and packaged to help maintain
              its freshness, aroma, and natural character. From everyday
              cooking to special recipes, Desi Zaika is made to add authentic
              flavour to your food.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-[#dfd5c8] bg-[#efe8dc] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4b42]">
              What Matters To Us
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Simple values. Authentic flavour.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7">
              <span className="text-4xl font-semibold text-[#2e0003]">
                01
              </span>
              <h3 className="mt-8 text-xl font-semibold">Authenticity</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Traditional Indian flavours that feel familiar from the very
                first bite.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7">
              <span className="text-4xl font-semibold text-[#2e0003]">
                02
              </span>
              <h3 className="mt-8 text-xl font-semibold">Freshness</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Carefully packed spices designed to retain their aroma and
                flavour.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7">
              <span className="text-4xl font-semibold text-[#2e0003]">
                03
              </span>
              <h3 className="mt-8 text-xl font-semibold">Quality</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                A commitment to bringing premium ingredients to your everyday
                kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8a4b42]">
            Desi Zaika
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Taste the tradition.
            <br />
            <span className="text-[#8a4b42]">Bring it home.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Discover authentic Indian spices and bring a little more flavour
            to every meal.
          </p>
        </div>
      </section>
    </div>
  );
}