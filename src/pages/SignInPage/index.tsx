import { useState } from "react";
import { signIn } from "../../api/lib/auth";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../common/utils/constants";
import { AxiosError } from "axios";
import { AuthBtn, AuthInput, AuthTitle, FormWrap, Wrap } from "styles/auth";

/**
 * 로그인 페이지
 */
export const SignInPage: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    let isValidEmail = form.email.includes("@");
    let isValidPassword = form.password.length >= 8;

    const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        const value = e.currentTarget.value;
        const key = e.currentTarget.dataset.testid?.split("-")[0] ?? "";
        setForm((prevState) => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    };

    const handleSignIn = async () => {
        try {
            const response = await signIn(form.email, form.password);
            console.log("response (try):>> ", response);

            if (response.status === 200) {
                // ok
                const accessToken = response.data.access_token;
                localStorage.setItem("accessToken", accessToken);
                navigate(`/${PATH.todo}`);
            }
        } catch (error: any) {
            console.log("error :>> ", error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    // 해당 사용자가 존재하지 않음
                    alert(error.response.data.message);
                } else if (error.response?.status === 401) {
                    // Unauthorized
                    alert(error.response.data.message);
                }
            }
        }
    };

    return (
        <Wrap>
            <FormWrap>
                <AuthTitle>로그인</AuthTitle>
                <AuthInput
                    data-testid="email-input"
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChangeInput}
                />
                <AuthInput
                    data-testid="password-input"
                    placeholder="비밀번호를 입력해주세요"
                    onChange={handleChangeInput}
                />
                <AuthBtn
                    data-testid="signin-button"
                    disabled={!isValidEmail || !isValidPassword}
                    onClick={handleSignIn}
                >
                    로그인
                </AuthBtn>
            </FormWrap>
        </Wrap>
    );
};
