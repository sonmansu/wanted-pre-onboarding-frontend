import { createTodo, getTodos } from "api/lib/todo";
import { useEffect, useState } from "react";
import { Todo } from "./utils/types";
import { TodoItem } from "./components/TodoItem";
import { AuthInput, AuthTitle } from "styles/auth";
import styled, { css } from "styled-components";
import { PATH, TOKEN } from "common/utils/constants";
import { useNavigate } from "react-router-dom";

export const TodoPage: React.FC = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoInput, setNewTodoInput] = useState("");
    const [todoUpdated, setTodoUpdated] = useState(false);

    const handleUpdate = () => {
        setTodoUpdated(!todoUpdated);
    };

    const handleAddTodo = async () => {
        const response = await createTodo(newTodoInput);
        setNewTodoInput("");
        console.log("response(addTodo) :>> ", response);
        const addedTodo = response.data;
        console.log("addedTodo :>> ", addedTodo);
        setTodos([...todos, addedTodo]);
    };

    const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewTodoInput(e.currentTarget.value);
    };

    useEffect(() => {
        (async function () {
            const response = await getTodos();
            console.log("response(getTodo):>> ", response);
            setTodos(response.data);
        })();
    }, [todoUpdated]);

    useEffect(() => {
        if (!localStorage.getItem(TOKEN)) {
            navigate(`/${PATH.signIn}`);
        }
    }, [navigate]);

    return (
        <Wrap>
            <ContentWrap>
                <AuthTitle>📝 TodoList</AuthTitle>
                <NewTodoWrap>
                    <NewTodoInput
                        data-testid="new-todo-input"
                        onChange={handleChangeInput}
                        value={newTodoInput}
                    />
                    <AddBtn
                        disabled={newTodoInput.length === 0}
                        data-testid="new-todo-add-button"
                        onClick={handleAddTodo}
                    >
                        추가
                    </AddBtn>
                </NewTodoWrap>
                <TodoListWrap>
                    {todos
                        .slice(0)
                        .reverse()
                        .map((todo) => {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    id={todo.id}
                                    todo={todo.todo}
                                    isCompleted={todo.isCompleted}
                                    onUpdate={handleUpdate}
                                />
                            );
                        })}
                </TodoListWrap>
            </ContentWrap>
        </Wrap>
    );
};

const Wrap = styled.div`
    /* background-color: yellow; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentWrap = styled.div`
    /* background-color: aqua; */
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;

    padding: 50px;
    border-radius: 8px;
    border: 1px solid gray;
`;

const NewTodoWrap = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 50px;

    width: 100%;
`;

const NewTodoInput = styled(AuthInput)`
    flex: 1;
    /* flex-grow: 1; */
`;
const TodoListWrap = styled.div`
    /* background-color: aliceblue; */
    width: 100%;
    height: 300px;
    overflow: auto;
    /* width: 500px;

    border: 1px solid gray;
    border-radius: 8px; */
`;

const AddBtn = styled.button`
    width: 56px;
    height: 50px;

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
