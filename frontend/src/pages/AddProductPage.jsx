import {useNavigate} from "react-router-dom";
import {BASE_URL, getHeadersPost, PRODUCT} from "../utills/ServiceUrls";
import {kc} from "../Keycloak";
import axios from "axios";
import {useEffect, useState} from "react";

const AddProductPage = () => {
    const navigate = useNavigate();
    const {headers} = getHeadersPost(kc.token);
    const [product,setProduct] = useState({
        name: null,
        skuCode: null,
        description: null,
        price: null
    });

    const [checking,setChecking] = useState({
        name: false,
        skuCode: false,
        description: false,
        price: false
    });

    const handleInputChange= (event)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));

        setChecking(prevState => {
            if (value) {
                if (name!=='price') return ({
                    ...prevState,
                    [name]: true
                })
                else {
                    if (value>0)return ({
                        ...prevState,
                        [name]: true
                    })
                    else return ({
                        ...prevState,
                        [name]: false
                    })
                }
            }
            else return ({
                ...prevState,
                [name]: false
            })
        });
    }

    useEffect(()=>{
        console.log(product,"create ppp")
    },[product])

    const createProduct = async (data) => {
        if (data?.name!==null && data?.name!==""){
            if (data?.skuCode!==null && data?.skuCode!==""){
                if (data?.description!==null && data?.description!==""){
                    if (data?.price!==null &&  data?.price!=="" && data?.price>0){
                        await axios.post(BASE_URL + PRODUCT.CREATE_PRODUCT, data,{headers})
                            .then(res => {
                                console.log(res)
                                setProduct({
                                    name: null,
                                    skuCode: null,
                                    description: null,
                                    price: null
                                })
                                setChecking({
                                    name: false,
                                    skuCode: false,
                                    description: false,
                                    price: false
                                })
                                alert("Product is created successfully!.")

                            })
                            .catch(err => {
                                console.log(err, "product creating error")
                            })
                    }
                    else {
                        setChecking(prevState => ({...prevState,price: false}))
                    }
                }
                else {
                    setChecking(prevState => ({...prevState,description: false}))
                }
            }
            else {
                setChecking(prevState => ({...prevState,skuCode: false}))
            }
        }
        else {
            setChecking(prevState => ({...prevState,name: false}))
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
                    <div className="flex flex-col gap-1">
                        <input onChange={(e)=>handleInputChange(e)} type="text" name={"name"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'name..'}/>
                        {!checking?.name && <span className={'text-red-500 text-sm'}>Name is required</span>}
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Sku Code: </span>
                    <div className="flex flex-col gap-1">
                        <input onChange={(e)=>handleInputChange(e)} type="text" name={"skuCode"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'sku_code..'}/>
                        {!checking?.skuCode && <span className={'text-red-500 text-sm'}>SKU CODE is required</span>}
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Description: </span>
                    <div className="flex flex-col gap-1">
                        <textarea onChange={(e)=>handleInputChange(e)} name="description" id="" cols="30" rows="5" className={'w-80 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'description..'}></textarea>
                        {!checking?.description && <span className={'text-red-500 text-sm'}>Description is required</span>}
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-lg">Price: </span>
                    <div className="flex flex-col gap-1">
                        <input onChange={(e)=>handleInputChange(e)} type="number" name={"price"} className={'w-64 px-2 py-1 rounded-lg bg-cyan-50 outline-cyan-400 placeholder-cyan-600'} placeholder={'price($)..'}/>
                        {!checking?.price && <span className={'text-red-500 text-sm'}>Price is required</span>}
                    </div>
                </div>
                <button onClick={()=>createProduct(product)} className={'font-medium text-lg bg-cyan-400 rounded-lg py-3 text-white hover:bg-cyan-500'}>Create Product</button>
            </div>
        </div>
    )
}

export default AddProductPage;