import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://sh.anksus.me/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl }),
    })
      .then((res) => {
        res.json().then((d) => {
          console.log(d.data);
          setShortUrl(d.data);
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Shortly</title>
        <meta
          name="description"
          content="Get rid of long URL's, get a short one!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Shortly</a>
        </h1>

        <p className={styles.description}>Create short URL for free! </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <form method="POST" onChange={handleChange} onSubmit={handleSubmit}>
              <input
                required
                type="url"
                name="url"
                id="url"
                placeholder="type url..."
              />
              <button>Create link</button>
            </form>
          </div>
        </div>
        {shortUrl && <div>{shortUrl}</div>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Anksus/shortly"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code is open source @Anksus/shortly.
        </a>
      </footer>
    </div>
  );
}
