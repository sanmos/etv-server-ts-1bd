import { IsString } from 'class-validator';

interface ProductDTO {
  //@IsString()
  name: String;
  //@IsString()
  price: BigInteger;

  //constructor(private content: string, title: string) { }

}

export default ProductDTO;
