import HeroBanner from "@/components/hero/HeroBanner";

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  updated: string;
  sections: Section[];
}

export default function LegalPage({ title, description, updated, sections }: LegalPageProps) {
  return (
    <>
      <HeroBanner
        eyebrow="Legal"
        title={title}
        description={description}
        breadcrumbs={[{ label: title }]}
        compact
      />

      <section className="py-16 lg:py-20 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 mb-10">Last updated {updated}</p>
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-gray-600 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
