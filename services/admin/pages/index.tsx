//Types
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: true,
            destination: "/login"
        }
    };
};

const HomePage = () => {
    return null;
};

export default HomePage;