import type { ReactNode } from "react";
//
import type { NextPage } from "next"
//
import Head from "next/head"
// components
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";






type PageContainerProps = {
    children: ReactNode;
    title?: string;
    description?: string;
}

const PageContainer: NextPage<PageContainerProps> = ({
    children,
    title = 'Вопросы и ответы на школьные задачки онлайн - YouQ.org',
    description = 'Решаем домашнее задание вместе'
}) => {
    return (
        <div className="relative h-full">
            <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Navbar />
            <div className="py-[70px] px-[10px] h-full max-w-[1200px] m-auto sm:pt-[80px] sm:px-0">
                {children}
            </div>
            <NavbarMobile />
        </div>
    )
}

export default PageContainer