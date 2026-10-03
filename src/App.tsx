import arTranslations from "./i18n/ar.json";
import enTranslations from "./i18n/en.json";
import "./App.css";

type TranslationValue = string | { [key: string]: TranslationValue };

function TranslationTree({
  value,
  path = "",
}: {
  value: TranslationValue;
  path?: string;
}) {
  if (typeof value === "string") {
    return <span className="translation-value">{value}</span>;
  }

  return (
    <div className="translation-tree">
      {Object.entries(value).map(([key, child]) => {
        const childPath = path ? `${path}.${key}` : key;

        return (
          <div className="translation-entry" key={childPath}>
            <div className="translation-key">{key}</div>
            <TranslationTree value={child} path={childPath} />
          </div>
        );
      })}
    </div>
  );
}

function TranslationCard({
  code,
  label,
  value,
  direction,
}: {
  code: string;
  label: string;
  value: TranslationValue;
  direction: "rtl" | "ltr";
}) {
  return (
    <article className="translation-card" dir={direction}>
      <header className="translation-card-header">
        <div>
          <span className="language-code">{code}</span>
          <h2>{label}</h2>
        </div>
        <span className="status-dot" aria-label="Translation loaded" />
      </header>
      <TranslationTree value={value} />
    </article>
  );
}

function App() {
  return (
    <main className="translation-app">
      <header className="app-header">
        <div>
          <p className="eyebrow">LOCALIZATION / DUMMY DATA</p>
          <h1>Translation library</h1>
          <p className="intro">
            A quick view of the Arabic and English content used by the app.
          </p>
        </div>
        <div className="entry-count">
          <strong>50</strong>
          <span>translation entries</span>
        </div>
      </header>

      <section className="translation-grid" aria-label="Translation files">
        <TranslationCard
          code="EN"
          label="English"
          value={enTranslations}
          direction="ltr"
        />
        <TranslationCard
          code="AR"
          label="العربية"
          value={arTranslations}
          direction="rtl"
        />
      </section>
    </main>
  );
}

export default App;
