// Import custom CSS styles
import '../scss/styles.scss';

// Import Bootstrap's JavaScript components
import * as bootstrap from 'bootstrap';

// Import Sentry for error tracking
import * as Sentry from "@sentry/browser";

// Initialize Sentry with configuration options
Sentry.init({
  dsn: "https://f7b9cd23b08549d496928e95863a508f@o4504770759229440.ingest.sentry.io/4504990691491840",
  // Set session and error replay sample rates to 100%
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  // Configure integrations, including replay and browser tracing
  integrations: [
    new Sentry.Replay({
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false
    }),
    new Sentry.BrowserTracing()
  ],
  // Set the sample rate for tracing to 100%
  tracesSampleRate: 1.0,
});

// Import Bootstrap Icons CSS
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import application-specific code
import './app.js'; // Import other application modules as needed
import './ko-fi.js'; // Import Ko-fi integration
