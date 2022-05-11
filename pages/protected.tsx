import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { User } from "@Interfaces/users";
import checkAuth from "@Utilities/checkAuth";

import TabButton from "@Components/TabButton";
import { NextTabbedPage } from "@Interfaces/next";

import Books from "@TabbedPages/books";
import Reports from "@TabbedPages/reports";

const tabs: NextTabbedPage[] = [Books, Reports];

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
    const [activeTab, setActiveTab] = React.useState<{
        [Key: number]: Boolean;
    }>({
        0: true,
        1: false,
    });

    return (
        <div>
            <div className="inline-flex h-auto w-full flex-col items-start justify-start bg-white bg-opacity-90 px-5 pt-6 ">
                <div className=" grid w-full grid-cols-2 grid-rows-2  lg:grid-cols-3 lg:grid-rows-1 ">
                    <h1 className="col-start-1 row-start-1 self-center text-3xl text-black">
                        Books
                    </h1>

                    <div className="col-start-2 row-start-1 h-12 w-12 justify-self-end rounded-full bg-gray-200 lg:col-start-3"></div>

                    <div className="col-span-full row-start-2 flex w-full space-x-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
                        {tabs.map((tab, index) => (
                            <TabButton
                                key={index}
                                isActive={activeTab[index]}
                                onClick={() =>
                                    setActiveTab({
                                        [index]: true,
                                    })
                                }
                            >
                                {tab.name} {activeTab[index] ? "✓" : ""}
                            </TabButton>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-full w-full">
                {tabs
                    .filter((tab, index) => activeTab[index])
                    .map(({ Page }, index) => (
                        <Page key={index} />
                    ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkAuth(context.req.cookies.auth);

    if (!user) {
        console.log("Blocked access to protected page");
        return { redirect: { destination: "/" }, props: {} };
    }

    return {
        props: {
            user,
        },
    };
};

export default ProtectedPage;
