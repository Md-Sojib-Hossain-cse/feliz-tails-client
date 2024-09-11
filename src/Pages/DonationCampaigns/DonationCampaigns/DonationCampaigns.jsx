import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { InView } from "react-intersection-observer";
import "./DonationCampaign.css";
import DonationCampaignCard from "../DonationCampaignCard.jsx/DonationCampaignCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DonationCampaigns = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const axiosPublic = useAxiosPublic();
    const [showData, setShowData] = useState([]);

    const {
        // data = [],
        status,
        isLoading,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['pets-data'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-campaign?page=${page}&limit=${itemsPerPage}`)
            setShowData([...showData, ...res.data])
            return res.data;
        },
    })

    useEffect(() => {
        refetch();
    }, [refetch, page])


    return (
        <section className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <Helmet>
                <title>Feliz Tails - Pet Listing</title>
            </Helmet>
            <div className="donation-campaign-bg py-6 lg:py-8 mb-6 md:mb-8 lg:mb-12">
                <SectionTitle
                    heading="Discover Your Future Companion"
                    subHeading="Browse through our adorable pets ready to find their forever home."
                ></SectionTitle>
            </div>
            <div>
                {
                    status === 'loading' || isLoading || isPending ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-2 rounded-lg">
                                <Skeleton count={1} height={200} className="mb-2" />
                                <Skeleton count={1} height={30} width={100} />
                                <Skeleton count={1} height={30} width={220} />
                                <Skeleton count={1} height={30} />
                                <Skeleton count={1} height={30} className="mb-4" />
                                <Skeleton count={1} height={30} width={120} />
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg">
                                <Skeleton count={1} height={200} className="mb-2" />
                                <Skeleton count={1} height={30} width={100} />
                                <Skeleton count={1} height={30} width={220} />
                                <Skeleton count={1} height={30} />
                                <Skeleton count={1} height={30} className="mb-4" />
                                <Skeleton count={1} height={30} width={120} />
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg">
                                <Skeleton count={1} height={200} className="mb-2" />
                                <Skeleton count={1} height={30} width={100} />
                                <Skeleton count={1} height={30} width={220} />
                                <Skeleton count={1} height={30} />
                                <Skeleton count={1} height={30} className="mb-4" />
                                <Skeleton count={1} height={30} width={120} />
                            </div>
                        </div>
                        : status === 'error'
                            ? <p className="text-red-600">Something wrong . Cannot load data at this moment.</p>
                            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    showData.map(pet => <DonationCampaignCard key={pet._id} pets={pet}></DonationCampaignCard>)
                                }
                                <InView as="div" onChange={(inView) => {
                                    if (inView) {
                                        setPage(page + 1);
                                        refetch();
                                    }
                                }}>
                                </InView>
                            </div>
                }
            </div>
        </section>
    );
};

export default DonationCampaigns;