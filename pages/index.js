import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Home() {
  const [session, loading] = useSession();
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const router = useRouter();

  // on click handler
  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };
  
  // Dashboard function
  const goToDashboard = () => {
    router.push("/dashboard");
  };
  const email = session ? session.user.email : "";
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://sh.anksus.me/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl, email: email }),
    })
      .then((res) => {
        res.json().then((d) => {
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
              <Button type="primary" onClick={handleSubmit}>
                Create Link
              </Button>
              {/* <button>Create link</button> */}
            </form>
          </div>
        </div>
        {shortUrl && <div>{shortUrl}</div>}
        <div style={{ marginTop: "30px" }}>
          <Tooltip title="Sign in to manage all the created URL's" color="red">
            {!session && (
              <Button
                onClick={() =>
                  signIn("google", { callbackUrl: "http://localhost:3000/" })
                }
              >
                sign in
              </Button>
            )}
          </Tooltip>
        </div>
        {session && (
          <Button onClick={goToDashboard} style={{ marginTop: "10px" }}>
            Dashboard
          </Button>
        )}
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
