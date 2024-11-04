import React, { useState } from 'react';
import { Todo } from './types/Todo';

interface Props {
  onAddTodo: (newTodo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      userId: 0,
      title: title,
      completed: false,
    };

    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
};
