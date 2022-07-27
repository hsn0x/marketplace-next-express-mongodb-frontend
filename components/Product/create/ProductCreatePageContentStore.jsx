import { Card, Label, Select } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productCreateActions } from "../../../redux/actions";
import { fetchProfile } from "../../../redux/reducers/auth";

const ProductCreatePageContentStore = () => {
    const dispatch = useDispatch();
    const profile = useSelector(({ auth }) => auth.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, []);

    const { productCreateUpdateStore } = bindActionCreators(
        productCreateActions,
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
                                productCreateUpdateStore(
                                    parseInt(e.target.value)
                                )
                            }
                        >
                            {profile &&
                                profile.Markets.map((store) => (
                                    <option key={store._id} value={store.id}>
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

export default ProductCreatePageContentStore;
