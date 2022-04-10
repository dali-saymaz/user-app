import React from 'react'
import style from './ProductCard.module.css'
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom'
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product }) => {
    let navigate = useNavigate()
    return (
        <div className={style.container}>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src={product.image ? product.image : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                    />
                }
                actions={[
                    <div onClick={() => navigate(`/product/${product._id}`)}>
                        Details
                    </div>
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={product.title}
                    description={product.description}
                />
            </Card>
        </div>
    )
}

export default ProductCard
