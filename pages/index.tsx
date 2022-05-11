import axios from "axios";
import type { NextPage } from "next";

import { useRouter } from "next/router";

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-400">
            <div className="flex flex-col items-center justify-center bg-white py-10 px-6">
                <h1 className="text-3xl text-black">
                    Welcome to <span className="font-semibold">Quick60</span>
                </h1>
                <button
                    onClick={() =>
                        axios
                            .post("/api/authMe")

                            .then(() => router.push("/protected"))
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                    Auth ME
                </button>
            </div>
        </div>
    );
};

export default Home;
