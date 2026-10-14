import { useEffect } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About, Approach, Stories } from '@/components/story-sections';
import { Impact, Footer } from '@/components/closing-sections';
import { Join } from '@/components/join-section';
import StoriesPage from '@/pages/stories';
import StoryPage from '@/pages/story';
import GalleryPage from '@/pages/gallery';
import { AppProviders } from '@/components/app-providers';
import InboxPage from '@/pages/inbox';
import { SignInPage, SignUpPage } from '@/pages/auth';
import DonationResultPage from '@/pages/donation-result';
import TeamPage from '@/pages/team';
import { TeamSection } from '@/components/team-section';
import AboutPage from '@/pages/about';
import OurWorkPage from '@/pages/our-work';
import VolunteerPage from '@/pages/volunteer';

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
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stories" component={StoriesPage} />
          <Route path="/stories/:id" component={StoryPage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/our-work" component={OurWorkPage} />
          <Route path="/volunteer" component={VolunteerPage} />
          <Route path="/donate/result" component={DonationResultPage} />
          <Route path="/admin/inbox" component={InboxPage} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route component={NotFound} />
        </Switch>
        </AppProviders>
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;
