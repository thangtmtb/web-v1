import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiSearch, FiTrendingUp } from 'react-icons/fi';
import { jokeService } from '../services/jokeService';
import { categoryService } from '../services/categoryService';
import JokeListItem from '../components/JokeListItem';
import CategoryFilter from '../components/CategoryFilter';
import './HomePage.css';

const JOKES_PER_PAGE = 10;

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const searchQuery = searchParams.get('q') || '';
    const [page, setPage] = useState(1);

    const jokesListRef = useRef<HTMLElement>(null);
    const isFirstRender = useRef(true);

    // Scroll to jokes list when page changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (jokesListRef.current) {
            // Scroll to the jokes section, with a small offset for header if needed
            // But scrollIntoView is usually sufficient
            jokesListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [page]);

    // Reset page when search query changes
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.getCategories(),
    });

    const { data: jokesData, isLoading } = useQuery({
        queryKey: ['jokes', selectedCategory, searchQuery, page],
        queryFn: () => jokeService.getJokes({
            categoryId: selectedCategory,
            search: searchQuery || undefined,
        }, page, JOKES_PER_PAGE),
    });



    const handleCategoryChange = (categoryId?: string) => {
        setSelectedCategory(categoryId);
        setPage(1);
    };

    const totalPages = jokesData ? Math.ceil(jokesData.total / JOKES_PER_PAGE) : 0;

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                </div>
                <div className="hero-content container">
                    <h1 className="hero-title animate-fade-in">
                        <span className="hero-emoji">😂</span>
                        Kho Truyện Cười Việt Nam
                    </h1>
                    <p className="hero-subtitle animate-fade-in">
                        Hàng ngàn câu chuyện cười hay nhất, cập nhật mỗi ngày
                    </p>


                </div>
            </section>

            {/* Category Filter */}
            <section className="container">
                <CategoryFilter
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />
            </section>

            {/* Jokes List Section */}
            <section ref={jokesListRef} className="container section">

                {isLoading ? (
                    <div className="jokes-list">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="joke-list-skeleton">
                                <div className="skeleton skeleton-title"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-footer"></div>
                            </div>
                        ))}
                    </div>
                ) : jokesData?.jokes && jokesData.jokes.length > 0 ? (
                    <>
                        <div className="jokes-list">
                            {jokesData.jokes.map((joke, index) => (
                                <JokeListItem
                                    key={joke.id}
                                    joke={joke}
                                    index={(page - 1) * JOKES_PER_PAGE + index + 1}
                                    showCategory={!selectedCategory}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="btn btn-secondary"
                                >
                                    ← Trang trước
                                </button>

                                <div className="pagination-pages">
                                    {[...Array(totalPages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        if (
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            (pageNum >= page - 1 && pageNum <= page + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`pagination-page ${page === pageNum ? 'active' : ''}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        } else if (pageNum === page - 2 || pageNum === page + 2) {
                                            return <span key={pageNum} className="pagination-ellipsis">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page >= totalPages}
                                    className="btn btn-secondary"
                                >
                                    Trang sau →
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <h3>Không tìm thấy truyện nào</h3>
                        <p>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
                    </div>
                )}
            </section>
        </div>
    );
}
