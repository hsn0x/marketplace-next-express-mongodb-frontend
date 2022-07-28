import { Card, Label, Select } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productEditActions } from "../../../redux/actions";
import { fetchProfile } from "../../../redux/reducers/auth";

const ProductEditPageContentStore = () => {
    const dispatch = useDispatch();
    const profile = useSelector(({ auth }) => auth.profile);
    const { edit } = useSelector(({ productEdit }) => productEdit);

    useEffect(() => {
        dispatch(fetchProfile());
    }, []);

    const { productEditUpdateStore } = bindActionCreators(
        productEditActions,
        dispatch
    );
    return (
        <div>
            <div className="">
                <Card>
                    <div>
                        <h2 className="text-lg font-bold underline">Store</h2>
                        <div className="mb-2 block">
                            <Label htmlFor="store" value="Select Store" />
                        </div>
                        <Select
                            id="store"
                            required={true}
                            onChange={(e) =>
                                productEditUpdateStore(parseInt(e.target.value))
                            }
                            value={edit?.MarketId || ""}
                        >
                            {profile &&
                                profile.Markets.map((store) => (
                                    <option key={store._id} value={store._id}>
                                        {store.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductEditPageContentStore;
