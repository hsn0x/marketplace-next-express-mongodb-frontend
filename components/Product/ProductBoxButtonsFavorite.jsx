import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { getError } from "../../utils/error";
import { axiosServer } from "../../db/axios";
import { useSelector } from "react-redux";

const ProductBoxButtonsFavorite = ({ product }) => {
    const [favorite, setFavorite] = useState(null);

    const { user } = useSelector(({ auth }) => auth);

    const handleProductButtonFavorite = async (ProductId) => {
        try {
            const { data } = await axiosServer.post("/favorites", {
                ProductId,
            });

            setFavorite(data.createdFavorite);
        } catch (error) {
            getError(error);
        }
    };
    const handleProductButtonUnFavorite = async (favoriteId) => {
        try {
            await axiosServer.delete(`/favorites/${parseInt(favoriteId)}`);
            setFavorite(null);
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        const isProductFavorited = () => {
            return product.favorites.find(
                (favorite) => favorite.UserId === user?.id
            );
        };

        if (isProductFavorited()) {
            setFavorite(isProductFavorited());
        } else {
            setFavorite(0);
        }
    }, [product.favorites, setFavorite, user?.id]);

    return (
        <div>
            <Button
                color={"gray"}
                pill={true}
                outline={favorite ? false : true}
                onClick={() =>
                    favorite
                        ? handleProductButtonUnFavorite(favorite.id)
                        : handleProductButtonFavorite(product.id)
                }
            >
                <div>
                    <FaHeart />
                </div>
            </Button>
            <div className="text-center text-xl font-bold">
                {" "}
                {favorite
                    ? product.favorites.length + 1
                    : product.favorites.length}
            </div>
        </div>
    );
};

export default ProductBoxButtonsFavorite;
