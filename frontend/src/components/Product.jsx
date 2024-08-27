import {useEffect, useState} from "react";

const Product = ({product, index}) => {
    const [order,setOrder]=useState({...product,quantity: null});
    useEffect(() => {
        console.log(order)
    }, [order]);
    return (
        <div className='w-64 flex flex-col gap-1 px-4 py-2 rounded-lg bg-white' key={product.id}>
            <div className="text-lg font-medium">Product: #{index}</div>
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
            <hr className={' mt-6 mb-1'}/>
            <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Quantity:</span>
                    <input type="number" name={"quantity"}
                           onChange={e=> setOrder(prevState => ({...prevState,quantity:e.target.value}))}
                           className={"focus:outline-0 w-16 placeholder-cyan-500"} placeholder={0}/>
                </div>
                <button className="text-xs bg-green-600 rounded-lg text-white font-medium px-4 py-2 hover:bg-green-500">Order</button>
            </div>
        </div>

    )
}

export default Product;