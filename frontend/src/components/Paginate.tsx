import { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  pages: number;
  page: number;
  keyword?: string;
}

const Paginate: FC<Props> = ({ pages, page, keyword = '' }) => {
  return (
    <Pagination>
      {[...Array(pages).keys()].map((pageNumber) => {
        let url = `/page/${pageNumber + 1}`;

        if (keyword) {
          url = `/search/${keyword}` + url;
        }

        return (
          <LinkContainer key={pageNumber} to={url}>
            <Pagination.Item active={pageNumber + 1 === page}>
              {pageNumber + 1}
            </Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  );
};

export default Paginate;
