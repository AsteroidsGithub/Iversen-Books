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
            <div className="inline-flex h-auto w-full flex-col items-start justify-start bg-white bg-opacity-90 px-5 pt-10 ">
                <div className="flex w-full flex-col items-start justify-start space-y-3">
                    <div className="flex w-full items-stretch space-x-4 px-6">
                        <p className="flex-grow font-serif text-4xl font-normal">
                            Iverson Publishing App
                        </p>

                        <img
                            className=" h-full w-auto rounded-full"
                            src="https://via.placeholder.com/43x43"
                        />
                    </div>
                    <div className="flex w-full">
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
            {tabs
                .filter((tab, index) => activeTab[index])
                .map(({ Page }, index) => (
                    <Page key={index} />
                ))}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkAuth(context.req.cookies.auth);

    if (!user) return { redirect: { destination: "/" }, props: {} };

    return {
        props: {
            user,
        },
    };
};

export default ProtectedPage;
