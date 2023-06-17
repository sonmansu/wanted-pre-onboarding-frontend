import styled, { css } from "styled-components/macro";

export const Wrap = styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;
export const AuthTitle = styled.h1`
    font-weight: 700;
    font-size: 35px;
    margin-bottom: 50px;
`;

export const FormWrap = styled.div`
    padding: 50px;
    border: 1px solid gray;
    border-radius: 8px;

    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
`;
export const AuthInput = styled.input`
    padding: 0 16px;
    width: 100%;
    height: 50px;

    border: 1px solid #a9abb6;
    border-radius: 8px;

    font-weight: 600;
    font-size: 16px;

    & + & {
        margin-top: 30px;
    }
`;

export const AuthBtn = styled.button<{ disabled: boolean }>`
    margin-top: 50px;

    width: 100%;
    height: 56px;

    background-color: orange;
    border-radius: 8px;

    font-weight: 500;
    font-size: 20px;
    color: white;

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;
            background-color: #eff0f5;
        `}
`;
