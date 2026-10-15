import { img } from '@/lib/site-data';

export function AboutPhotoGallery() {
  return (
    <div className="relative">
      <figure className="about-photo-main relative z-0 m-0 aspect-[5/4] w-full overflow-hidden rounded-3xl border-4 border-plum">
        <img
          src={img('page-2-image-3.webp')}
          alt="Kirukans mural volunteers together"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </figure>
      <figure className="about-photo-detail absolute -bottom-8 -right-3 z-10 m-0 aspect-square w-2/5 overflow-hidden rounded-2xl border-4 border-sun bg-white rotate-3">
        <img
          src={img('page-2-image-2.webp')}
          alt="An artist painting the Kalam mural"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </figure>
    </div>
  );
}
