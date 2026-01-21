import type { Category } from '../lib/supabase';
import './CategoryFilter.css';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory?: string;
    onSelectCategory: (categoryId?: string) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory
}: CategoryFilterProps) {
    return (
        <div className="category-filter">
            <button
                onClick={() => onSelectCategory(undefined)}
                className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            >
                <span className="category-icon">🎯</span>
                <span className="category-name">Tất cả</span>
            </button>

            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                </button>
            ))}
        </div>
    );
}
