import { hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import { TRPCClientError } from "@trpc/client";
import { AppProviders, queryClient } from "./Providers";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;
  if (error.message === UNAUTHED_ERR_MSG) startLogin();
};

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const root = document.getElementById("root");
if (root) {
  // The same route and provider tree is rendered by entry-server.tsx before this hydrates.
  hydrateRoot(root, <Router><AppProviders><App /></AppProviders></Router>);
}

// Preserve the starter’s named-cookie forwarding compatibility with embedded Preview.
void COOKIE_NAME;
