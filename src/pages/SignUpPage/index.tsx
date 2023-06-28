import { useEffect, useState } from "react";
import { signUp } from "../../apis/lib/auth";
import { useNavigate } from "react-router-dom";
import { PATH, TOKEN } from "../../common/utils/constants";
import { AxiosError } from "axios";
import {
    AuthBtn,
    AuthInput,
    AuthTitle,
    Description,
    FormWrap,
    BottomRow,
    Wrap,
    StyledLink,
    ErrorMessage,
} from "styles/auth";
import { AuthForm } from "common/utils/types";

/**
 * 회원가입 페이지
 */
export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<AuthForm>({
        email: "",
        password: "",
    });

    let isValidEmail = form.email.includes("@");
    let isValidPassword = form.password.length >= 8;

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const key = e.currentTarget.dataset.testid?.split("-")[0] ?? "";
        setForm((prevState) => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signUp(form.email, form.password);
            navigate(`/${PATH.signIn}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            navigate(`/${PATH.todo}`);
        }
    }, [navigate]);

    return (
        <Wrap>
            <FormWrap onSubmit={handleSubmit}>
                <AuthTitle>회원가입</AuthTitle>
                <AuthInput
                    data-testid="email-input"
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChangeInput}
                    error={form.email.length > 0 && !isValidEmail}
                />
                {form.email.length > 0 && !isValidEmail && (
                    <ErrorMessage>
                        @가 포함된 유효한 이메일을 입력해주세요
                    </ErrorMessage>
                )}
                <AuthInput
                    type="password"
                    data-testid="password-input"
                    placeholder="비밀번호를 입력해주세요"
                    onChange={handleChangeInput}
                    error={form.password.length > 0 && !isValidPassword}
                />
                {form.password.length > 0 && !isValidPassword && (
                    <ErrorMessage>
                        비밀번호는 8자 이상이어야 합니다
                    </ErrorMessage>
                )}
                <AuthBtn
                    data-testid="signup-button"
                    disabled={!isValidEmail || !isValidPassword}
                >
                    회원가입
                </AuthBtn>
                <BottomRow>
                    <Description>이미 계정이 있나요?</Description>
                    <StyledLink to={`/${PATH.signIn}`}>로그인하기</StyledLink>
                </BottomRow>
            </FormWrap>
        </Wrap>
    );
};
