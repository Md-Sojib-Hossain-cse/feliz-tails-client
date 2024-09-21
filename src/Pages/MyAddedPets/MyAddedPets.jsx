import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { usePagination, useSortBy, useTable } from "react-table";
import "./MyAddedPets.css";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";




const MyAddedPets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);

    const handleDelete = useCallback((id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/my-added-pets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setData(previousData => previousData.filter(pet => pet._id !== id));
                }
            }
        });
    }, [axiosSecure]);


    const handleAdopted = useCallback((id) => {
        Swal.fire({
            title: "Mark as Adopted?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/my-added-pets/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Adopted!",
                        text: "Your pet has been adopted.",
                        icon: "success"
                    });
                    setData(previousData => previousData.filter(pet => pet._id !== id));
                }
            }
        });
    }, [axiosSecure]);

    const columns = useMemo(() => [
        {
            Header: "Serial Number",
            accessor: "id",
            Cell: (value) => (
                <span>{parseInt(value.cell.row.id) + 1}</span>
            )
        },
        {
            Header: "Pet Name",
            accessor: "name",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Pet Image",
            accessor: "image",
            Cell: ({ value }) => (
                <div>
                    <img src={value} alt="" className="w-12 h-12 rounded-lg" />
                </div>
            ),
        },
        {
            Header: "Adoption Status",
            accessor: "adopted",
            Cell: ({ value }) => (value ? <p className="text-green-600 bg-green-200 border-green-600 text-center py-2 rounded-md">Adopted</p> : <p className="text-orange-600 bg-orange-200 border-orange-600 text-center py-2 rounded-md">Not Adopted</p>),
        },
        {
            Header: "Actions",
            accessor: "_id",
            Cell: (value) => (
                <div className="flex gap-2">
                    <Link to={`/dashboard/PetUpdate/${value.cell.value}`} className="bg-orange-400 text-white px-3 py-2 hover:bg-orange-300 rounded-lg">Update</Link>
                    <button onClick={() => handleDelete(value.cell.value)} className="bg-red-600 text-white px-3 py-2 hover:bg-red-300 rounded-lg">Delete</button>
                    <button onClick={() => handleAdopted(value.cell.value)} className="bg-green-400 text-white px-3 py-2 hover:bg-green-300 rounded-lg">Adopt</button>
                </div>
            ),
        },
    ], [handleAdopted, handleDelete]);



    useEffect(() => {
        axiosSecure.get(`/my-added-pets/${user?.email}`)
            .then(res => {
                setData(res.data)
            })
    }, [axiosSecure, user?.email])

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canPreviousPage, canNextPage, state: { pageIndex }, pageCount, gotoPage } = useTable({
        columns, data, initialState: { pageSize: 10, pageIndex: 0 }
    },
        useSortBy,
        usePagination)


    return (
        <div>
            <Helmet>
                <title>Feliz Tails - My Added Pets</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="My Added Pets"
                subHeading="Review, update, and manage all the pets you have listed for adoption. Keep track of their statuses and ensure their profiles are up-to-date for potential adopters."
            ></SectionTitleWithBGPhoto>
            <div className="px-2 md:px-4 lg:px-6">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {
                                headerGroups.map((hg, index) => {
                                    return <tr key={index} {...hg.getHeaderGroupProps()}>
                                        {
                                            hg.headers.map((header, index) => {
                                                return <th key={index} {...header.getHeaderProps(header.getSortByToggleProps())}>
                                                    {header.render("Header")}
                                                    {
                                                        header.isSortedDesc ? <span><FaSortDown></FaSortDown></span> : <span><FaSortUp></FaSortUp></span>
                                                    }
                                                </th>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {
                                page.map((row, i) => {
                                    prepareRow(row);
                                    return <tr key={i} {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell, i) => {
                                                return <td key={i} {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {
                        pageCount > 1 ? <div className="flex gap-4 py-4 justify-center items-center">
                            <Button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>First Page</Button>
                            <Button disabled={!canPreviousPage} onClick={previousPage}>Prev</Button>
                            <span>{pageIndex + 1} of {pageCount}</span>
                            <Button disabled={!canNextPage} onClick={nextPage}>Next</Button>
                            <Button disabled={pageIndex === pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>Last Page</Button>
                        </div> : ""
                    }
                </div>
            </div>
        </div>
    );
};

MyAddedPets.propTypes = {
    value : PropTypes.object,
}

export default MyAddedPets;