import { useState } from "react";
import { signUp } from "../../api/lib/auth";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../common/utils/constants";
import { AxiosError } from "axios";
import { AuthBtn, AuthInput, AuthTitle, FormWrap, Wrap } from "styles/auth";

/**
 * 회원가입 페이지
 */
export const SignUpPage: React.FC = () => {
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

    const handleSignUp = async () => {
        try {
            const response = await signUp(form.email, form.password);
            console.log("response :>> ", response);

            if (response.status === 201) {
                // created
                navigate(`/${PATH.signIn}`);
            }
        } catch (error) {
            console.log("error :>> ", error);
            if (error instanceof AxiosError) {
                // 400: 동일한 이메일이 존재
                alert(error.response?.data.message);
            }
        }
    };

    return (
        <Wrap>
            <FormWrap>
                <AuthTitle>회원가입</AuthTitle>
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
                    data-testid="signup-button"
                    disabled={!isValidEmail || !isValidPassword}
                    onClick={handleSignUp}
                >
                    회원가입
                </AuthBtn>
            </FormWrap>
        </Wrap>
    );
};
