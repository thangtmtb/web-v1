import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiBookmark, FiEye } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Joke } from '../lib/supabase';
import './JokeCard.css';

interface JokeCardProps {
    joke: Joke;
}

export default function JokeCard({ joke }: JokeCardProps) {
    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <Link to={`/joke/${joke.id}`} className="joke-card card-interactive">
            <div className="joke-card-header">
                {joke.category && (
                    <span className="joke-category badge badge-primary">
                        {joke.category.icon} {joke.category.name}
                    </span>
                )}
                {joke.is_featured && (
                    <span className="joke-featured badge badge-warning">
                        ⭐ Nổi bật
                    </span>
                )}
            </div>

            <h3 className="joke-title">{joke.title}</h3>

            <p className="joke-content">{truncateContent(joke.content)}</p>

            <div className="joke-footer">
                <div className="joke-author">
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
                    <span className="author-name">
                        {joke.author?.full_name || joke.author?.username || 'Ẩn danh'}
                    </span>
                </div>

                <div className="joke-meta">
                    <span className="meta-item" title="Lượt xem">
                        <FiEye size={16} />
                        {joke.view_count}
                    </span>
                    <span className="meta-item" title="Lượt thích">
                        <FiHeart size={16} />
                        {joke.like_count}
                    </span>
                    <span className="meta-item" title="Bình luận">
                        <FiMessageCircle size={16} />
                        {joke.comment_count}
                    </span>
                </div>
            </div>

            <div className="joke-timestamp">
                {formatDistanceToNow(new Date(joke.created_at), {
                    addSuffix: true,
                    locale: vi
                })}
            </div>
        </Link>
    );
}
