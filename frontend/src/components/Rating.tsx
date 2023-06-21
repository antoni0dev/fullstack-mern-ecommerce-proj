import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ProductType } from '../lib/@types';
import { FC } from 'react';

interface Props {
  value: ProductType['rating'];
  text: string;
}

const Rating: FC<Props> = ({ value, text }) => {
  return (
    <div className="rating">
      <span>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span>{value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span className="rating-text">{text}</span>
    </div>
  );
};

export default Rating;
