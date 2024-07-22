import React from 'react';
import { Figure } from 'react-bootstrap';
import './Book.css'; 

const AnimatedBook = ({ bookData }) => {
    return (
                <li>
                    <Figure className='book'>
                        {/* Front */}
                        <ul className='hardcover_front'>
                            <li>
                                <img width="100%" height="100%" src={bookData.attributes.cover} alt='book cover' />
                            </li>
                            <li></li>
                        </ul>

                        {/* Pages */}
                        <ul className='page'>
                            <li></li>
                            <li>
                                <a className="btn" href={bookData.attributes.wiki}>Read</a>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        {/* Back */}
                        <ul className='hardcover_back'>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className='book_spine'>
                            <li></li>
                            <li></li>
                        </ul>
                        <Figure.Caption>
                            <h1>{bookData.attributes.title}</h1>
                            <span>By {bookData.attributes.author}</span>
                            <p>{bookData.attributes.summary}</p>
                        </Figure.Caption>
                    </Figure>
                </li>
    );
}

export default AnimatedBook;
