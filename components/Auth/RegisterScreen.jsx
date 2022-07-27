import React from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    authActions,
    loginActions,
    registerActions,
} from "../../redux/actions";
import { updateRegisterPasswordConfirmed } from "../../redux/actions/register";
import { signUp } from "../../redux/reducers/register";
import { fetchProfile } from "../../redux/reducers/auth";
import { signIn } from "../../redux/reducers/login";

const RegisterScreen = () => {
    const router = useRouter();
    const auth = useSelector(({ auth }) => auth);
    const register = useSelector(({ register }) => register);

    const dispatch = useDispatch();

    const { updateLoginEmail, updateLoginPassword } = bindActionCreators(
        loginActions,
        dispatch
    );

    const {
        updateRegisterFirstName,
        updateRegisterLastName,
        updateRegisterUsername,
        updateRegisterEmail,
        updateRegisterPassword,
        updateRegisterPasswordConfirmed,
    } = bindActionCreators(registerActions, dispatch);

    const handleSignUp = async (event) => {
        event.preventDefault();
        await dispatch(signUp());
        updateLoginEmail(register.email);
        updateLoginPassword(register.password);
        handleSignIn(event);
    };

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
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Register Screen
                </h5>
                <div>
                    <form
                        onSubmit={(event) => handleSignUp(event)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex justify-between">
                            <div className="w-full mr-2">
                                <div className="mb-2">
                                    <Label
                                        htmlFor="firstName"
                                        value="First name"
                                    />
                                </div>
                                <TextInput
                                    onChange={(event) =>
                                        updateRegisterFirstName(
                                            event.target.value
                                        )
                                    }
                                    id="firstName"
                                    type="text"
                                    placeholder="First name"
                                    required={true}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full">
                                <div className="mb-2">
                                    <Label
                                        htmlFor="lastName"
                                        value="Last name"
                                    />
                                </div>
                                <TextInput
                                    onChange={(event) =>
                                        updateRegisterLastName(
                                            event.target.value
                                        )
                                    }
                                    id="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    required={true}
                                    className="block"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Username" />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateRegisterUsername(event.target.value)
                                }
                                id="username"
                                type="text"
                                placeholder="Username"
                                required={true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateRegisterEmail(event.target.value)
                                }
                                id="email"
                                type="email"
                                placeholder="Email"
                                required={true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateRegisterPassword(event.target.value)
                                }
                                id="password"
                                type="password"
                                placeholder="Password"
                                required={true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="confirmPassword"
                                    value="Confirm password"
                                />
                            </div>
                            <TextInput
                                onChange={(event) =>
                                    updateRegisterPasswordConfirmed(
                                        event.target.value
                                    )
                                }
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                required={true}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button gradientMonochrome="info" type="submit">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default RegisterScreen;
