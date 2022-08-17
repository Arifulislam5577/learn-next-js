import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import products from "../../data/products.json";
const SingleProduct = (props) => {
  const { title, image, description, rating, price } = props;
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <h1 className="text-3xl font-bold text-slate-900">Loading...</h1>;
  }

  const handleAddToCart = () => {
    console.log("Add to Cart is working");
  };

  return (
    <section className="product py-10">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container mb-10">
        <Link href="/">
          <a className="bg-black p-2 px-6 rounded-md text-white ">Go Back</a>
        </Link>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 justify-center">
          <div className="col-span-1 text-center flex justify-center ">
            <Image
              src={image}
              height="384"
              width="500"
              alt={title}
              className=" object-contain "
            />
          </div>
          <div className="col-span-1">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-gray-500 my-5">{description}</p>
            <h3 className="text-slate-700 font-bold mb-5">
              Rating - {rating?.rate} from {rating?.count}&nbsp;reviews
            </h3>
            <h3 className="text-slate-700 font-bold mb-5">Price - ${price}</h3>
            <button
              className="p-3 w-2/3 bg-slate-900 text-gray-50 hover:bg-slate-800 uppercase transition-all"
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

export function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  return {
    props: products.find((product) => product.id.toString() === params.id),
  };
}
