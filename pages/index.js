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
        <title>Pathao Stats | Check Your Pathao Expenses</title>
        <meta name="description" content="Minimal Web Application to check your lifetime pathao spends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Minimal Web Application to check your lifetime pathao spends." />
        <meta name="keywords" content="pathao, pathao stats, pathao expenses, pathao dashboard, pathao analytics" />
       
        
        <meta property="og:title" content="Pathao Stats | Check Your Pathao Expenses" />
        <meta property="og:description" content="Minimal Web Application to check your lifetime pathao spends." />
        <meta property="og:image" content="https://pathao-stats.vercel.app/assets/og.png" />
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
