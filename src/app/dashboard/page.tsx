'use client';

import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import QuickActionCard from "@/components/cards/quick-action-cards";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchBar } from "@/components/ui/searchbar";
import Container from "@/layout/container";
import { useGetProfileQuery } from "@/modules/auth/queries";
import { useGetSaloons } from "@/modules/public";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const ITEMS_PER_PAGE = 6;

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

    const { user, isLoading: isUserLoading } = useGetProfileQuery();

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    const { data: saloonsData, isLoading: isSaloonsLoading } = useGetSaloons({
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        search: debouncedSearch,
    });

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    // Check if saloons data is available
    const saloons = saloonsData?.data?.saloons || [];
    console.log("saloons: ", saloons)
    const totalSaloons = saloonsData?.data?.total || 0;
    const totalPages = Math.ceil(totalSaloons / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 'ellipsis', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages);
            }
        }

        return pages;
    };

    return (
        <Container className="py-4 md:py-8 flex flex-col space-y-4">
            <section className="flex justify-between">
                <h5 className="font-bold">HOME</h5>
                <BellRing />
            </section>
            <div className="my-4">
                <h1 className="mt-4 text-3xl font-bold">Hi, {user?.fullName} 👋</h1>
            </div>
            <DynamicServiceCard
                label="Upcoming Appointment"
                title="Haircut & Style"
                description="Tue, Jul 23 · 10:00 AM"
                badgeText="20% Paid"
                image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                href="/booking-summary"
            />
            <div className="flex justify-between gap-8 my-6 items-center">
                <h2 className="">Saloon</h2>
                <SearchBar
                    placeholder="Search for saloon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isSaloonsLoading ? (
                <div className="flex justify-center my-10">Loading saloons...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {saloons.map((saloon) => (
                        <QuickActionCard
                            key={saloon.id}
                            title={saloon.name}
                            image={saloon.images.find(img => img.isThumbnail)?.imageUrl || saloon.images[0]?.imageUrl || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"}
                            slug={`/saloon/${saloon.id}`}
                        />
                    ))}
                    {saloons.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No saloons found.
                        </div>
                    )}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {renderPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page as number);
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
            <div></div>
        </Container>
    );
}
