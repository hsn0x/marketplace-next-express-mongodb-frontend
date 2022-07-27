import React, { useState } from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions, loginActions } from "../../redux/actions";
import { fetchProfile } from "../../redux/reducers/auth";
import { useRouter } from "next/router";
import { axiosServer } from "../../db/axios";
import Cookies from "js-cookie";
import { signIn } from "../../redux/reducers/login";

const LoginScreen = () => {
    const router = useRouter();
    const auth = useSelector(({ auth }) => auth);

    const dispatch = useDispatch();

    const { updateLoginEmail, updateLoginPassword } = bindActionCreators(
        loginActions,
        dispatch
    );

    const handleSignIn = async (event) => {
        event.preventDefault();
        const signInData = await dispatch(signIn());
        if (signInData.isAuthenticated) {
            const authUser = await dispatch(fetchProfile());
            authUser;
            router.push("/");
        } else {
        }
    };

    return (
        <Card>
            <div>
                <h5 className="font-underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Login Screen
                </h5>
                <div>
                    <form
                        onSubmit={(event) => handleSignIn(event)}
                        className="flex flex-col gap-4 w-full"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateLoginEmail(event.target.value)
                                }
                                id="email"
                                type="text"
                                placeholder="Email"
                                // required={true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateLoginPassword(event.target.value)
                                }
                                id="password1"
                                type="password"
                                // required={true}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                //  required={true}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button gradientMonochrome="info" type="submit">
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default LoginScreen;
