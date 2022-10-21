import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSolana } from "../hook/useSolana";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { createAssociateAccount } = useSolana();

  return (
    <div className={styles.container}>
      <WalletMultiButton />

      <button onClick={() => createAssociateAccount()}>
        Create Associate Account
      </button>
    </div>
  );
};

export default Home;
