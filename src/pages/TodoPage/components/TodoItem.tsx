import { useEffect, useRef, useState } from "react";
import { Todo } from "../utils/types";
import {
    deleteTodo as deleteTodoApi,
    updateTodo as updateTodoApi,
} from "api/lib/todo";
import styled from "styled-components";
import { COLOR, FONT_SIZE } from "styles/constants";

interface TodoItemProps extends Todo {
    updateTodo: (updatedTodo: Todo) => void;
    deleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    id,
    todo,
    isCompleted,
    updateTodo,
    deleteTodo,
}) => {
    const [isInModify, setIsInModify] = useState(false);
    const [modifiedInput, setModifiedInput] = useState(todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickModify = () => {
        setIsInModify((prevState) => !prevState);
    };

    const handleSave = async () => {
        if (modifiedInput.length === 0) {
            alert("내용물을 입력해주세요");
            inputRef.current?.focus();
            return;
        }
        try {
            await updateTodoApi(id, modifiedInput, isCompleted);
            setIsInModify(false);
            updateTodo({ id, isCompleted, todo: modifiedInput });
        } catch (error) {
            alert(error);
        }
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedInput(e.currentTarget.value);
    };

    const handleCheck = async (e: React.MouseEvent<HTMLInputElement>) => {
        const isChecked = e.currentTarget.checked;
        updateTodoApi(id, todo, isChecked);
    };

    const handleCancel = () => {
        setIsInModify(false);
        setModifiedInput(todo); // 원래 값으로 복구
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteTodoApi(id);
            deleteTodo(id);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        if (isInModify) {
            inputRef.current?.focus();
        }
    }, [isInModify]);

    return (
        <ListItem key={id}>
            <Label>
                <CheckBox
                    type="checkbox"
                    defaultChecked={isCompleted}
                    onClick={handleCheck}
                />
                <Text>
                    {isInModify ? (
                        <ModifyInput
                            type="text"
                            ref={inputRef}
                            data-testid="modify-input"
                            value={modifiedInput}
                            onChange={(e) => handleChangeInput(e)}
                        />
                    ) : (
                        todo
                    )}
                </Text>
            </Label>
            {isInModify ? (
                <>
                    <Button data-testid="submit-button" onClick={handleSave}>
                        제출
                    </Button>
                    <Button data-testid="cancel-button" onClick={handleCancel}>
                        취소
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        data-testid="modify-button"
                        onClick={() => handleClickModify()}
                    >
                        수정
                    </Button>
                    <Button data-testid="delete-button" onClick={handleDelete}>
                        삭제
                    </Button>
                </>
            )}
        </ListItem>
    );
};

const ListItem = styled.li`
    display: flex;
    align-items: center;

    font-size: 20px;
    list-style: none;

    & + & {
        margin-top: 10px;
    }
`;

const Label = styled.label`
    flex: 1;

    display: flex;
    align-items: center;
`;

const CheckBox = styled.input`
    width: 20px;
    height: 20px;

    margin-right: 10px;

    &:checked + span {
        text-decoration: line-through;
        color: ${COLOR.grey[300]};
    }
`;

const Text = styled.span`
    flex: 0.9;
    font-size: ${FONT_SIZE.m2};
`;

const ModifyInput = styled.input`
    width: 100%;
`;

const Button = styled.button`
    padding: 5px 7px;
    border-radius: 5px;

    background-color: ${COLOR.grey[200]};

    font-size: ${FONT_SIZE.s3};

    & + & {
        margin-left: 10px;
    }

    &:hover {
        filter: brightness(80%);
    }
`;
