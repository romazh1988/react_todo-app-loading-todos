/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Error } from './ErrorNotification';
import { TodoForm } from './TodoForm';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!USER_ID) {
      setErrorMessage('USER_ID is not set');

      return;
    }

    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    if (!newTodo.title) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setTodos([...todos, newTodo]);
    setErrorMessage('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

      <div className="todo__content">
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoList todos={todos} />
        {todos.length > 0 && <Footer todos={todos} />}
      </div>
      {!USER_ID && <UserWarning />}
    </div>
  );
};
