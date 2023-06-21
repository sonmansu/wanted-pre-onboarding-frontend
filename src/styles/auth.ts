import styled, { css } from "styled-components/macro";
import { COLOR, FONT_SIZE } from "./constants";
import { Link } from "react-router-dom";

export const Wrap = styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthTitle = styled.h1`
    font-weight: 700;
    font-size: ${FONT_SIZE.l2};
    margin-bottom: 50px;
`;

export const FormWrap = styled.form`
    padding: 50px;
    border: 1px solid gray;
    border-radius: 8px;

    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
`;
export const AuthInput = styled.input<{ error?: boolean }>`
    padding: 0 16px;
    width: 100%;
    height: 50px;

    border: 1px solid ${(props) => (props.error ? "red" : "#a9abb6")};
    border-radius: 8px;

    font-weight: 600;
    font-size: ${FONT_SIZE.m1};

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

export const ErrorMessage = styled.div`
    padding: 7px 0 10px 0;
    width: 100%;

    font-weight: 400;
    font-size: 16px;
    font-size: ${FONT_SIZE.s3};
    color: ${COLOR.error};
`;
export const BottomRow = styled.div`
    padding-top: 1.6rem;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Description = styled.span`
    font-weight: 500;
    font-size: ${FONT_SIZE.m1};
    line-height: 1.9rem;
    color: ${COLOR.grey[500]};
`;

export const StyledLink = styled(Link)`
    margin-left: 2.1rem;

    font-weight: 600;
    font-size: ${FONT_SIZE.m2};
    line-height: 2.1rem;
    color: ${COLOR.primary};
`;

export const BottomWrap = styled.div`
    margin-top: 6.8rem;
    margin-bottom: 9.8rem;
`;
