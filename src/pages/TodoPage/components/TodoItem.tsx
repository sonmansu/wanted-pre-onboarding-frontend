import { useRef, useState } from "react";
import { Todo } from "../utils/types";
import { deleteTodo, updateTodo } from "api/lib/todo";
import styled from "styled-components";

interface TodoItemProps extends Todo {
    // userId: number;
    // status: TodoStatus; //추가
    onUpdate: () => void;
}

/**
 * 컴포넌트
 */
export const TodoItem: React.FC<TodoItemProps> = ({
    id,
    todo,
    isCompleted,
    onUpdate,
}) => {
    const [isInModify, setIsInModify] = useState(false);
    const [modifiedInput, setModifiedInput] = useState(todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickModify = () => {
        setIsInModify((prevState) => !prevState);
        inputRef.current?.focus(); // TODO focus가 안됨
    };

    const handleSave = async () => {
        // const inputValue = inputRef?.current;
        // console.dir("inputValue :>> ", inputRef.current);
        console.log("modifiedInput :>> ", modifiedInput);
        const response = await updateTodo(id, modifiedInput, isCompleted);
        console.log("response(updatetodo) :>> ", response);
        setIsInModify(false); // 안해도 될듯..?아니군..
        onUpdate();
    };

    const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setModifiedInput(e.currentTarget.value);
    };

    const handleCheck: React.MouseEventHandler<HTMLInputElement> = async (
        e
    ) => {
        console.log("e.currentTarget.checked :>> ", e.currentTarget.checked);
        console.log("modifiedInput :>> ", modifiedInput);
        const isChecked = e.currentTarget.checked;
        const response = await updateTodo(id, todo, isChecked);
        console.log("response(check) :>> ", response);
        // onUpdate(); // 삭선 처리 위함인데 너무너무 느려서 css로 삭선 넣어줘야할듯
    };

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsInModify(false);
        setModifiedInput(todo); // 원래 값으로 복구
    };

    const handleDelete: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        const response = await deleteTodo(id);
        console.log("response(delete):>> ", response);
        onUpdate();
    };
    return isInModify ? (
        <ListItem key={id}>
            <Label>
                <CheckBox
                    type="checkbox"
                    defaultChecked={isCompleted}
                    onClick={handleCheck}
                />
                <input
                    ref={inputRef}
                    data-testid="modify-input"
                    value={modifiedInput}
                    onChange={(e) => handleChangeInput(e)}
                />
            </Label>
            <Button data-testid="submit-button" onClick={handleSave}>
                제출
            </Button>
            <Button data-testid="cancel-button" onClick={handleCancel}>
                취소
            </Button>
        </ListItem>
    ) : (
        <ListItem key={id}>
            <Label>
                <CheckBox
                    type="checkbox"
                    defaultChecked={isCompleted}
                    onClick={handleCheck}
                />
                <Text>{todo}</Text>
            </Label>

            <Button
                data-testid="modify-button"
                onClick={() => handleClickModify()}
            >
                수정
            </Button>
            <Button data-testid="delete-button" onClick={handleDelete}>
                삭제
            </Button>
        </ListItem>
    );
};

const ListItem = styled.li`
    list-style: none;
    /* list-style-type: none; */

    display: flex;
    align-items: center;

    /* background-color: yellow; */
    font-size: 20px;

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
    accent-color: orange;

    margin-right: 10px;

    &:checked + span {
        text-decoration: line-through;
    }
`;

const Text = styled.span`
    flex: 1;
`;

const Button = styled.button`
    padding: 5px 7px;
    border: 1px solid #ff8d4e;
    border-radius: 5px;

    color: orange;

    & + & {
        margin-left: 10px;
    }

    &:hover {
        filter: brightness(90%);
    }
`;