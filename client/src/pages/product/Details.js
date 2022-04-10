import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Details = () => {
    let { id } = useParams();
    const [product, setProduct] = useState()

    const fetchUser = async () => {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        const response = await res.json();
        setProduct(response);
        console.log(response)
    };

    useEffect(() => {
        fetchUser();
        return () => {
            console.log(`unmounting`)
        }
    }, [])



    return (
        <div>
            details - {id}
            {product && product.map((product) => (
                <div key={product._id}>
                    <h1>{product.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default Details
