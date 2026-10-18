import { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About, Approach, Stories } from '@/components/story-sections';
import { Impact, Footer } from '@/components/closing-sections';
import { Join } from '@/components/join-section';
import { AppProviders } from '@/components/app-providers';
import { TeamSection } from '@/components/team-section';

const StoriesPage = lazy(() => import('@/pages/stories'));
const StoryPage = lazy(() => import('@/pages/story'));
const GalleryPage = lazy(() => import('@/pages/gallery'));
const InboxPage = lazy(() => import('@/pages/inbox'));
const SignInPage = lazy(() => import('@/pages/auth').then((page) => ({ default: page.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/auth').then((page) => ({ default: page.SignUpPage })));
const TeamPage = lazy(() => import('@/pages/team'));
const AboutPage = lazy(() => import('@/pages/about'));
const VolunteerPage = lazy(() => import('@/pages/volunteer'));

function Home() {
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
        <Stories />
        <Approach />
        <Impact />
        <Join />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ErrorBoundary>
        <AppProviders>
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center bg-cream px-5 text-plum" role="status" aria-live="polite">Loading page…</div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/stories" component={StoriesPage} />
            <Route path="/stories/:id" component={StoryPage} />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/volunteer" component={VolunteerPage} />
            <Route path="/admin/inbox" component={InboxPage} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        </AppProviders>
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;
