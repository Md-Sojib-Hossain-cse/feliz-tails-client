import { Helmet } from "react-helmet-async";
import PetListingCard from "../PetListingCard/PetListingCard";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { InView } from 'react-intersection-observer';
import { useQuery } from "@tanstack/react-query";

const PetListing = () => {
    const [category, setCategory] = useState("");
    const [searchBy, setSearchBy] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const axiosPublic = useAxiosPublic();

    const {
        data,
        status,
        isLoading,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['pets-data'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pet-listing?page=${page}&limit=${itemsPerPage}&category=${category}&name=${searchBy}`)
            return res.data;
        },
    })


    const handleCategorySearch = e => {
        if(e.target.value === "all"){
            setCategory("");
            setSearchBy("");
            setPage(1);
            return;
        }
        setCategory(e.target.value);
        setSearchBy("");
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearchBy(e.target.search.value);
        setPage(1);
    }

    useEffect(() => {
        refetch();
    } , [refetch , category , searchBy , page])


    if (status === 'loading' || isLoading || isPending) return <p>Loading...</p>;
    if (status === 'error') return <p>Error fetching data</p>;

    return (
        <section className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <Helmet>
                <title>Feliz Tails - Pet Listing</title>
            </Helmet>
            <div>
                <div className="flex flex-col-reverse md:flex-row gap-4 justify-end items-end md:justify-between md:items-center mb-6 md:mb-8">
                    <div className="flex space-x-3 justify-end md:justify-center items-center">
                        <h3 className="md:text-lg font-medium">Category:</h3>
                        <select onChange={handleCategorySearch} name="category" id="category">
                            <option value="all" selected>All</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Rat">Rat</option>
                            <option value="Bunny">Bunny</option>
                            <option value="Bear">Bear</option>
                            <option value="Fish">Fish</option>
                        </select>
                    </div>
                    <form onSubmit={handleSearch} className="flex w-full max-w-sm justify-end items-center space-x-2">
                        <input type="text" name="search" placeholder="Search here" />
                        <Button type="submit" variant="destructive">Search</Button>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    data.map(pet => <PetListingCard key={pet._id} pets={pet}></PetListingCard>)
                }
                <InView as="div" onChange={(inView, entry) => {
                    if (inView) {
                        setPage(page + 1);
                        refetch();
                    }
                }}>
                </InView>
            </div>
        </section>
    );
};

export default PetListing;