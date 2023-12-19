import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: FC<Props> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Proshop',
  description: 'We sell the best products for cheap',
  keywords: 'Electronics, buy electronics, cheap electronics',
};

export default Meta;
