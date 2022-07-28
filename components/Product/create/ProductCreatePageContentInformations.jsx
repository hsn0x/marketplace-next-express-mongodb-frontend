import { Card, Label, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { productCreateActions } from "../../../redux/actions";

const ProductCreatePageContentInformations = () => {
    const dispatch = useDispatch();

    const {
        productCreateUpdateTitle,
        productCreateUpdateDescription,
        productCreateUpdatePrice,
        productCreateUpdateQuantity,
    } = bindActionCreators(productCreateActions, dispatch);
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
                            onChange={(e) =>
                                productCreateUpdateTitle(e.target.value)
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
                            onChange={(e) =>
                                productCreateUpdateDescription(e.target.value)
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
                            onChange={(e) =>
                                productCreateUpdatePrice(e.target.value)
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
                            onChange={(e) =>
                                productCreateUpdateQuantity(e.target.value)
                            }
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductCreatePageContentInformations;
