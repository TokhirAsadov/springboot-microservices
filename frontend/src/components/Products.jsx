const Products = ({products}) => {
    return (
        <div className={'h-[calc(100vh - 64px)] bg-cyan-50 flex flex-col gap-8 px-16 py-4'}>
            <h1 className={'text-3xl'}>Products({products?.length}):</h1>
            {products?.length === 0 && <h1 className={'text-lg text-red-600'}>Not found products..</h1>}
            <hr/>
            <div className={'flex flex-wrap gap-2'}>
                {
                    products?.map((product, index) => (
                        <div className='w-64 flex flex-col gap-1 px-4 py-2 rounded-lg bg-white' key={product.id}>
                            <div className="text-lg font-medium">Product: #{index + 1}</div>
                            <hr/>
                            {product?.name && <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Name:</span>
                                <span className="text-sm">{product?.name}</span>
                            </div>}
                            {product?.skuCode && <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Sku Code:</span>
                                <span className="text-sm">{product?.skuCode}</span>
                            </div>}
                            {product?.description && <div className="flex justify-between gap-2">
                                <span className="text-sm font-medium">Description:</span>
                                <span className="text-xs font-thin">{product?.description}</span>
                            </div>}
                            {product?.price && <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Price:</span>
                                <span className="text-sm"><span className={'text-2xl'}>{product?.price}</span>$</span>
                            </div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products;