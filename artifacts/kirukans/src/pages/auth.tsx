import { SignIn, SignUp } from '@clerk/react';
import { img } from '@/lib/site-data';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

const appearance = {
  variables: {
    colorPrimary: '#1c1846',
    colorForeground: '#1c1846',
    colorMutedForeground: '#4b4570',
    colorBackground: '#fdf9ee',
    colorInput: '#ffffff',
    colorInputForeground: '#1c1846',
    colorDanger: '#b3261e',
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    borderRadius: '0.9rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'rounded-3xl border-4 border-[#1c1846] w-[440px] max-w-full overflow-hidden',
    headerTitle: { fontWeight: 800, color: '#1c1846' },
    formButtonPrimary: { backgroundColor: '#1c1846', color: '#ffc928', fontWeight: 700 },
    footerActionLink: { color: '#1c1846', fontWeight: 700 },
  },
};

function Shell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="min-h-[100dvh] bg-sun text-plum flex flex-col items-center justify-center px-4 py-10 gap-5">
      <a href={`${basePath}/`} aria-label="Kirukans home">
        <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-20 w-auto" />
      </a>
      <p className="font-hand text-3xl">{title}</p>
      {children}
      <a href={`${basePath}/`} className="font-semibold underline">Back to home</a>
    </div>
  );
}

export function SignInPage() {
  return (
    <Shell title="Team sign in">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} forceRedirectUrl={`${basePath}/admin/inbox`} appearance={appearance} />
    </Shell>
  );
}

export function SignUpPage() {
  return (
    <Shell title="Create an account">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} forceRedirectUrl={`${basePath}/admin/inbox`} appearance={appearance} />
    </Shell>
  );
}
