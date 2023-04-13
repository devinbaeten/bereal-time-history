// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Sentry
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://f7b9cd23b08549d496928e95863a508f@o4504770759229440.ingest.sentry.io/4504990691491840",
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Sentry.Replay({maskAllText: false, maskAllInputs: false, blockAllMedia: false}), new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import code
import './app.js';
import './ko-fi.js';