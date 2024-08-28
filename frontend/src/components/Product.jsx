import {useEffect, useState} from "react";
import trash from './../icon/trash.svg'
import axios from "axios";
import {BASE_URL, getHeaders, getHeadersPost, ORDER, PRODUCT} from "../utills/ServiceUrls";
import {kc} from "../Keycloak";

const Product = ({product, index}) => {
    const [order,setOrder]=useState({
        skuCode: product.skuCode,
        price:product.price,
        quantity: null
    });
    useEffect(() => {
        console.log(order)
    }, [order]);
    const {headers} = getHeaders(kc.token);
    const {headers: headersPost} = getHeadersPost(kc.token);

    const deleteProduct = async (id) => {
        if (window.confirm(`Delete the ${product.name} product?`)) {
            await axios.delete(BASE_URL + PRODUCT.DELETE + id, {headers})
                .then(res => {
                    console.log(res)
                    alert("Product is deleted successfully!.")
                })
                .catch(err => {
                    console.log(err, "deleting error")
                })
        }
    }

    const createOrder = async (data) => {
        if (data?.quantity!==null && data?.quantity>0){
            await axios.post(BASE_URL + ORDER.CREATE_ORDER, data,{headers:headersPost})
                .then(res => {
                    console.log(res)
                    alert("Order is placed successfully!.")
                })
                .catch(err => {
                    console.log(err, "order placing error")
                })

        }
        else {
            alert("Quantity should be > 0.")
        }
    }

    return (
        <div className='w-64 flex flex-col gap-1 px-4 py-2 rounded-lg bg-white' key={product.id}>
            <div className="flex justify-between">
                <div className="text-lg font-medium">Product: #{index}</div>
                <button onClick={()=> deleteProduct(product.id)} className={'flex items-center justify-center border-red-900 text-white rounded-lg px-1 hover:border hover:bg-red-500'}>
                    <img src={trash} alt="trash" width={20} height={20}/>
                </button>
            </div>
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
                <button onClick={()=>createOrder(order)} className="text-xs bg-green-600 rounded-lg text-white font-medium px-4 py-2 hover:bg-green-500">Order</button>
            </div>
        </div>

    )
}

export default Product;