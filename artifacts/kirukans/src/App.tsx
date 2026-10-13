import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About, Approach, Stories } from '@/components/story-sections';
import { Impact, Join, Footer } from '@/components/closing-sections';
import { ProjectDialog } from '@/components/dialogs';
import StoriesPage from '@/pages/stories';
import GalleryPage from '@/pages/gallery';
import type { Project } from '@/lib/site-data';

function Home() {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const t = window.setTimeout(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else if (!id) window.scrollTo(0, 0);
    }, 60);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className="grain">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:bg-sun focus:text-plum focus:p-3">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Stories onOpen={setProject} />
        <Impact />
        <Join />
      </main>
      <Footer />
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stories" component={StoriesPage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;
