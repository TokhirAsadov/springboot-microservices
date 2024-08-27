import Product from "./Product";
import { useNavigate } from "react-router-dom";

const Products = ({products}) => {
    const navigate = useNavigate();
    return (
        <div className={'h-[calc(100vh - 64px)] bg-cyan-50 flex flex-col gap-8 px-16 py-4'}>
            <div className="flex justify-between items-center">
                <h1 className={'text-3xl'}>Products({products?.length}):</h1>
                <button onClick={()=>{navigate("/add-product")}} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">+ Create Product</button>
            </div>
            {products?.length === 0 && <h1 className={'text-lg text-red-600'}>Not found products..</h1>}
            <hr/>
            <div className={'flex flex-wrap gap-2'}>
                {
                    products?.map((product, index) => (
                        <Product product={product} index={index+1} key={product.id}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Products;