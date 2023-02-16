import Head from "next/head";
import { Inter } from "@next/font/google";
import Login from "@/components/Login";
import { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tokenStateAtom } from "@/atoms/tokenStateAtom";
import Dashboard from "@/components/Dashboard";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [token, setToken] = useRecoilState(tokenStateAtom);

  useEffect(() => {
    console.log("token", token);
  }, []);
  return (
    <>
      <Toaster />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {token.access_token != null ? <Dashboard /> : <Login />}
      <div className="flex justify-center items-center ">
        <img src="/assets/github-mark.png" alt="github" className="h-6 w-6 " />
        <a href="https://github.com/dineshtiwari69/pathao-stats" className="ml-2 ">
          Codebase Available on Github
        </a>
      </div>
    </>
  );
}
