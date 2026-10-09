import { lazy, Suspense } from "react";
import "@/page-routes.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/site/SiteLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const Contact = lazy(() => import("./pages/Contact"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

function LoadingPage({ children }: { children: string }) {
  return <div className="route-loading" role="status">{children}</div>;
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/">
        <SiteLayout><Home /></SiteLayout>
      </Route>
      <Route path="/about">
        <Suspense fallback={<LoadingPage>Opening About CoreFixIT…</LoadingPage>}><SiteLayout><About /></SiteLayout></Suspense>
      </Route>
      <Route path="/services">
        <Suspense fallback={<LoadingPage>Opening the services directory…</LoadingPage>}><SiteLayout><Services /></SiteLayout></Suspense>
      </Route>
      <Route path="/services/:slug">
        <Suspense fallback={<LoadingPage>Opening service details…</LoadingPage>}><SiteLayout><ServiceDetail /></SiteLayout></Suspense>
      </Route>
      <Route path="/faq">
        <Suspense fallback={<LoadingPage>Opening frequently asked questions…</LoadingPage>}><SiteLayout><FAQPage /></SiteLayout></Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<LoadingPage>Opening the Contact page…</LoadingPage>}><SiteLayout><Contact /></SiteLayout></Suspense>
      </Route>
      <Route><NotFound /></Route>
    </Switch>
  );
}

export default function App() {
  return <ErrorBoundary><TooltipProvider><Toaster /><AppRouter /></TooltipProvider></ErrorBoundary>;
}
