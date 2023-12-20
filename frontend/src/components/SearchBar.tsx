import { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../lib/constants';

const SearchBar = () => {
  const { keyword: urlKeyword = '' } = useParams();
  const [searchText, setSearchText] = useState(urlKeyword);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
      setSearchText('');
    } else {
      navigate(PATHS.products);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline border" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
