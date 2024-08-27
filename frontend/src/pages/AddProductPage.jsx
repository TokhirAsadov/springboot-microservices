import {useNavigate} from "react-router-dom";
import {BASE_URL, getHeaders, PRODUCT} from "../utills/ServiceUrls";
import {kc} from "../Keycloak";
import axios from "axios";
import {useEffect, useState} from "react";

const AddProductPage = () => {
    const navigate = useNavigate();
    const {headers} = getHeaders(kc.token);
    const [product,setProduct] = useState({
        name: null,
        skuCode: null,
        description: null,
        price: null
    });

    const handleInputChange= (event)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(()=>{
        console.log(product,"create ppp")
    },[product])

    const deleteProduct = async (id) => {
        if (window.confirm(`Delete the ${product.name} product?`)) {
            await axios.post(BASE_URL + PRODUCT.DELETE + id, {headers})
                .then(res => {
                    console.log(res)
                    alert("Product is deleted successfully!.")
                })
                .catch(err => {
                    console.log(err, "deleting error")
                })
        }
    }
    return (
        <div className={'h-[calc(100vh - 64px)] bg-cyan-50 flex flex-col gap-8 px-16 py-4'}>
            <div className="flex justify-between items-center">
                <h1 className={'text-3xl'}>Add New Product:</h1>
                <button onClick={() => {
                    navigate("/")
                }} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
                    {"<"} Back To Home</button>
            </div>
            <hr/>
            <div className="w-[40%] flex flex-col gap-8 p-8 rounded-lg bg-white mb-2">
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Name: </span>
                    <input onChange={(e)=>handleInputChange(e)} type="text" name={"name"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'name..'}/>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Sku Code: </span>
                    <input onChange={(e)=>handleInputChange(e)} type="text" name={"skuCode"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'sku code..'}/>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Description: </span>
                    <textarea onChange={(e)=>handleInputChange(e)} name="description" id="" cols="30" rows="5" className={'w-80 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'description..'}></textarea>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Price: </span>
                    <input onChange={(e)=>handleInputChange(e)} type="number" name={"price"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'price($)..'}/>
                </div>
                <button className={'font-medium text-lg bg-cyan-400 rounded-lg py-3 text-white hover:bg-cyan-500'}>Create Product</button>
            </div>
        </div>
    )
}

export default AddProductPage;