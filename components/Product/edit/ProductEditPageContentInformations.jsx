import { Card, Label, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productEditActions } from "../../../redux/actions";

const ProductEditPageContentInformations = () => {
    const dispatch = useDispatch();
    const { edit } = useSelector(({ productEdit }) => productEdit);

    const {
        productEditUpdateTitle,
        productEditUpdateDescription,
        productEditUpdatePrice,
        productEditUpdateQuantity,
    } = bindActionCreators(productEditActions, dispatch);
    return (
        <div>
            <div>
                <Card>
                    <h2 className="text-lg font-bold underline">
                        Product Informations
                    </h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title" />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            placeholder="Product Title"
                            required={true}
                            value={edit?.title || ""}
                            onChange={(e) =>
                                productEditUpdateTitle(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput
                            id="description"
                            type="text"
                            placeholder="Product Description"
                            required={true}
                            value={edit?.description || ""}
                            onChange={(e) =>
                                productEditUpdateDescription(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Product Price" />
                        </div>
                        <TextInput
                            id="price"
                            type="number"
                            placeholder="Product Price"
                            required={true}
                            value={edit?.price || ""}
                            onChange={(e) =>
                                productEditUpdatePrice(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="quantity"
                                value="Product Quantity"
                            />
                        </div>
                        <TextInput
                            id="quantity"
                            type="number"
                            placeholder="Product Quantity"
                            required={true}
                            value={edit?.quantity || ""}
                            onChange={(e) =>
                                productEditUpdateQuantity(e.target.value)
                            }
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductEditPageContentInformations;
