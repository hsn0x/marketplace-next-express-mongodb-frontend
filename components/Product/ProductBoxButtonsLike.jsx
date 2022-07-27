import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { getError } from "../../utils/error";
import { axiosServer } from "../../db/axios";
import { useSelector } from "react-redux";

const ProductBoxButtonsLike = ({ product }) => {
    const [like, setLike] = useState(null);

    const { user } = useSelector(({ auth }) => auth);

    const handleProductButtonLike = async (ProductId) => {
        try {
            const { data } = await axiosServer.post("/likes", { ProductId });

            setLike(data.createdLike);
        } catch (error) {
            getError(error);
        }
    };
    const handleProductButtonUnLike = async (likeId) => {
        try {
            await axiosServer.delete(`/likes/${parseInt(likeId)}`);
            setLike(null);
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        const isProductLiked = () => {
            return product.likes.find((like) => like.UserId === user?.id);
        };

        if (isProductLiked()) {
            setLike(isProductLiked());
        } else {
            setLike(0);
        }
    }, [product.likes, setLike, user?.id]);

    return (
        <div>
            <Button
                color={"gray"}
                pill={true}
                outline={like ? false : true}
                onClick={() =>
                    like
                        ? handleProductButtonUnLike(like.id)
                        : handleProductButtonLike(product.id)
                }
            >
                <div>
                    <FaThumbsUp />
                </div>
            </Button>
            <div className="text-center text-xl font-bold">
                {like ? product.likes.length + 1 : product.likes?.length}
            </div>
        </div>
    );
};

export default ProductBoxButtonsLike;
