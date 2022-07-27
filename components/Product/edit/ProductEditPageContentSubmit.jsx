import { Button, Card, Checkbox, Label } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import { productEditActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const ProductEditPageContentSubmit = () => {
    const dispatch = useDispatch();
    const { edit: productEdit } = useSelector(({ productEdit }) => productEdit);
    const { product } = useSelector(({ product }) => product);

    const {
        productEditUpdateTitle,
        productEditUpdateDescription,
        productEditUpdatePrice,
        productEditUpdateQuantity,
    } = bindActionCreators(productEditActions, dispatch);

    const handleEditProduct = async () => {
        try {
            const productEditData = {
                ...productEdit,
                price: Number(productEdit.price),
                quantity: Number(productEdit.quantity),
                MarketId: Number(productEdit.MarketId),
                CategoriesIds: productEdit.CategoriesIds.filter(
                    (p) => !isNaN(p)
                ),
            };
            await axiosServer.put(`/products/${product.id}`, productEditData);
        } catch (error) {
            getError(error);
        }
    };

    return (
        <div>
            {" "}
            <div className="">
                <Card>
                    <div className="flex flex-col gap-4" id="checkbox">
                        <h2 className="text-lg font-bold underline">Submit</h2>
                        <div className="flex items-center gap-2">
                            <Checkbox id="accept" defaultChecked={true} />
                            <Label htmlFor="accept">
                                I agree to the
                                <a
                                    href="/forms"
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    terms and conditions
                                </a>
                            </Label>
                        </div>
                    </div>

                    <Button
                        gradientMonochrome="info"
                        onClick={() => handleEditProduct()}
                    >
                        Update Product
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ProductEditPageContentSubmit;
