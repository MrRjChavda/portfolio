import CinematicPortrait from "@/components/CinematicPortrait";
import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata = {
  title: "Thumbnails | Raj H Chavda",
  description: "Classic poster and AI thumbnail showcase for Raj H Chavda.",
};

export default function ThumbnailsPage() {
  return (
    <main className="relative z-10 flex-grow px-6 pb-28 pt-40 md:px-12 lg:px-16 paper-texture">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 max-w-4xl">
            <p className="editorial-eyebrow">
              Thumbnail archive
            </p>
            <h1 className="mt-8 editorial-header beat-text">
              Thumbnail <span className="text-gold italic glow-accent-gold">Showcase</span>
            </h1>
            <p className="editorial-copy mt-10 italic border-l-2 border-gold/20 pl-8">
              A curated selection of classic poster designs and experimental AI thumbnails, 
              engineered for high engagement and cinematic visual impact.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <CinematicPortrait />
          </div>
        </div>
        <PortfolioGallery />
      </div>
    </main>
  );
}
