import { FiClock } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Joke } from '../lib/supabase';
import './JokeListItem.css';

interface JokeListItemProps {
    joke: Joke;
    index: number;
    showCategory?: boolean;
}

export default function JokeListItem({ joke, index, showCategory = true }: JokeListItemProps) {
    return (
        <article className="joke-list-item card">
            <div className="joke-number">{index}</div>

            <div className="joke-header">
                <div className="joke-header-left">
                    <h2 className="joke-title">{joke.title}</h2>
                    <div className="joke-meta-top">
                        {showCategory && joke.category && (
                            <span className="joke-category badge badge-primary">
                                {joke.category.icon} {joke.category.name}
                            </span>
                        )}
                    </div>
                </div>

                <div className="joke-author-info">
                    {joke.author?.avatar_url ? (
                        <img
                            src={joke.author.avatar_url}
                            alt={joke.author.full_name || 'Author'}
                            className="author-avatar"
                        />
                    ) : (
                        <div className="author-avatar-placeholder">
                            {(joke.author?.full_name || joke.author?.username || 'A')[0].toUpperCase()}
                        </div>
                    )}
                    <div className="author-details">
                        <span className="author-name">
                            {joke.author?.full_name || joke.author?.username || 'Ẩn danh'}
                        </span>
                        <span className="joke-time">
                            <FiClock size={12} />
                            {formatDistanceToNow(new Date(joke.created_at), {
                                addSuffix: true,
                                locale: vi
                            })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="joke-content">
                {joke.content}
            </div>

            <div className="joke-footer">
                {/* Stats (views, likes, comments) hidden temporarily */}
            </div>
        </article>
    );
}
