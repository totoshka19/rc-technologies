import styled from 'styled-components';

type CatImageProps = {
  src: string;
  alt?: string;
};

const CatImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: none;
`;

const CatImg = styled.img`
  max-width: 350px;
  max-height: 300px;
  object-fit: contain;
  display: block;
`;

const Placeholder = styled.div`
  width: 350px;
  height: 300px;
  background: #eee;
  border-radius: 8px;
`;

const CatImage: React.FC<CatImageProps> = ({ src, alt = 'Cat' }) => (
  <CatImageWrapper>
    {src ? <CatImg src={src} alt={alt} /> : <Placeholder />}
  </CatImageWrapper>
);

export default CatImage;
