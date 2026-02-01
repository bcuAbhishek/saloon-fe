'use client'

import { useState } from "react";
import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";
import { Button } from "@/components/ui/button";
import Container from "@/layout/container";
import { BellRing } from "lucide-react";
import QuickActionCard from "@/components/cards/quick-action-cards";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import { SearchBar } from "@/components/ui/searchbar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const { user , isLoading } = useGetProfileQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    // Sample quick action data
    const quickActions = [
        {
            title: "Saloon Name",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
            slug: `/saloon/sample-saloon`,
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
            slug: "manage-staff",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
    ];

    const totalPages = Math.ceil(quickActions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentActions = quickActions.slice(startIndex, endIndex);

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
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {currentActions.map((action, index) => (
                    <QuickActionCard
                        key={`${action.slug}-${startIndex + index}`}
                        title={action.title}
                        image={action.image}
                        slug={action.slug}
                    />
                ))}
            </div>
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
                                            handlePageChange(page);
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
