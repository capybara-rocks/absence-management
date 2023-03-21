import { Link } from 'react-router-dom'


export interface NavBrandProps {
  image: string;
  alt: string;
}

export function NavBrand({ image, alt }: NavBrandProps) {
  return (
    <Link to='/' className='lg:px-2'>
      <img src={image} alt={alt} className='w-[50px] h-[50px]' />
    </Link>
  );
}

export default NavBrand;
