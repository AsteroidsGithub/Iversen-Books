import { Prisma } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { User } from "../interfaces/users";
import prisma from "../prisma/database";
import checkAuth from "../utilities/checkAuth";

const TabButton: React.FC = ({ children, ...props }) => (
    <button
        className={`mx-10 flex h-full w-full flex-grow rounded py-2.5 active:border-b-4 active:border-blue-500 ${props}`}
    >
        <p className="h-full w-full text-center text-lg font-medium">
            {children}
        </p>
    </button>
);

const PageHeader: React.FC = () => (
    <div className="inline-flex h-auto w-full flex-col items-start justify-start bg-white bg-opacity-90 px-5 pt-10 pb-8">
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
                <TabButton>Books</TabButton>
                <TabButton>Student Progress</TabButton>
            </div>
        </div>
    </div>
);

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
    return <PageHeader />;
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
