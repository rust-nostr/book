import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.logoSection}>
                        <Heading as="h1" className={styles.heroTitle}>
                            <code className={styles.brandName}>rust-nostr</code>
                        </Heading>
                        <p className={styles.heroSubtitle}>
                            The nostr development kit to build stable and high-performance apps with your favourite language.
                        </p>
                    </div>

                    <div className={styles.heroLinks}>
                        <Link
                            href="https://github.com/rust-nostr"
                            className={styles.heroLink}
                        >
                            Project Homepage
                        </Link>
                        <span className={styles.separator}>|</span>
                        <Link
                            href="https://github.com/rust-nostr/nostr"
                            className={styles.heroLink}
                        >
                            Repository
                        </Link>
                        <span className={styles.separator}>|</span>
                        <Link
                            to="/donate"
                            className={styles.heroLink}
                        >
                            Become a supporter
                        </Link>
                    </div>

                    <div className={styles.buttons}>
                        <Link
                            className="button button--primary button--lg"
                            to="/docs/intro">
                            Get Started 🚀
                        </Link>
                        <Link
                            className="button button--secondary button--lg"
                            href="https://github.com/rust-nostr/nostr">
                            View on GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

function WhyRustNostr() {
    return (
        <section className={styles.whySection}>
            <div className="container">
                <Heading as="h2" className={styles.sectionTitle}>
                    Why rust-nostr?
                </Heading>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🌐</div>
                        <h3>Multi-Language Support</h3>
                        <p>
                            Native APIs for <strong>Rust</strong>, <strong>Python</strong>, <strong>C#</strong>,
                            <strong>Kotlin</strong>, <strong>Swift</strong>, <strong>JavaScript</strong> and <strong>Flutter</strong>.
                            Build nostr apps in your preferred programming language.
                        </p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📱</div>
                        <h3>Multi-Platform Support</h3>
                        <p>
                            Write nostr apps for <strong>desktop</strong>, <strong>server</strong>,
                            <strong>mobile</strong>, <strong>web</strong> and <strong>embedded</strong> devices!
                        </p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚡</div>
                        <h3>High Performance</h3>
                        <p>
                            Powered by Rust's unparalleled <strong>performance</strong> and <strong>memory safety</strong>.
                            Our libraries offer speed, stability and reliability.
                        </p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🕸️</div>
                        <h3>WASM Compatibility</h3>
                        <p>
                            Most libraries compile to <strong>WebAssembly</strong> for seamless integration
                            into web applications.
                        </p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🔧</div>
                        <h3>Broad NIP Support</h3>
                        <p>
                            Support for most relevant <strong>NIPs</strong> (Nostr Implementation Possibilities)
                            with continuous updates.
                        </p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🧩</div>
                        <h3>Customizable</h3>
                        <p>
                            Built in a <strong>modular way</strong>, allowing you to build customized nostr apps
                            tailored to your specific needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatusAlert() {
    return (
        <section className={styles.alertSection}>
            <div className="container">
                <div className={styles.alertBox}>
                    <div className={styles.alertIcon}>⚠️</div>
                    <div className={styles.alertContent}>
                        <h3>Alpha State</h3>
                        <p>
                            These libraries are in <strong>ALPHA state</strong>. Things that are implemented
                            generally work but the <strong>API will change in breaking ways</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CommunitySection() {
    return (
        <section className={styles.communitySection}>
            <div className="container">
                <Heading as="h2" className={styles.sectionTitle}>
                    Join the Community
                </Heading>
                <div className={styles.communityGrid}>
                    <div className={styles.communityCard}>
                        <h3>💬 Nostr Community</h3>
                        <p>Join our Nostr community channel</p>
                    </div>
                    <div className={styles.communityCard}>
                        <h3>📢 Public Channel</h3>
                        <p>Follow updates in our public channel</p>
                    </div>
                    <div className={styles.communityCard}>
                        <h3>🏠 Matrix Space</h3>
                        <p>
                            Connect with us on <Link href="https://matrix.to/#/#rustnostr:matrix.org">Matrix</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title="rust-nostr - The nostr development kit"
            description="Build stable and high-performance nostr apps with your favourite language using rust-nostr development kit">
            <HomepageHeader />
            <main>
                <WhyRustNostr />
                <StatusAlert />
                <CommunitySection />
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
