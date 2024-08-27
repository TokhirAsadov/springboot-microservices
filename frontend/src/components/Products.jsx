import Product from "./Product";

const Products = ({products}) => {
    return (
        <div className={'h-[calc(100vh - 64px)] bg-cyan-50 flex flex-col gap-8 px-16 py-4'}>
            <h1 className={'text-3xl'}>Products({products?.length}):</h1>
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