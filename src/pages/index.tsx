import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  const { data: sessionData } = useSession();
  useEffect(() => {
    console.log(sessionData);
    if (!sessionData) {
      // signIn().then(() => {
      //   console.log("logged in!");
      // });
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">{secretMessage}</div>
        {/* <button className="btn-secondary btn" onClick={() => signOut()}>
          Sign out
        </button> */}
      </main>
    </>
  );
};

export default Home;
