import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Easy</>,
    imageUrl: 'img/undraw_setup_wizard_r6mr.svg',
    description: (
      <>
        Log in to the dashboard using your GitHub account. Use our command
        line client or just plain HTTPS requests to use teleprompt.io in any
        headless environment.
      </>
    ),
  },
  {
    title: <>Interactive</>,
    imageUrl: 'img/undraw_authentication_fsn5.svg',
    description: (
      <>
        Prompt for passwords, two-factor authentication codes, files and more.
        Make headless services interactive, get notified via email
        or desktop notification.
      </>
    ),
  },
  {
    title: <>Secure</>,
    imageUrl: 'img/undraw_security_o890.svg',
    description: (
      <>
        We use asymmetric cryptography (X25519) to encrypt your data end-to-end.
        Key pairs are generated locally in your service. Data in the dashboard
        is encrypted in the browser.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/create-project')}
            >
              Get Started
            </Link>
            <Link
              className={classnames(
                'button button--lg',
                styles.openDashboard,
              )}
              target="_blank"
              to="https://teleprompt.io/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
